import { Head, Link, useForm } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import FormCard from '../../components/FormCard';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import Modal from '../../components/Modal';
import { SECTOR_OPTIONS, ESTABLISHMENT_TYPE_OPTIONS } from '../../lib/constants';
import { getRoutePrefix } from '../../lib/routes';

export default function Edit({ establishment, complexes, availableHeads }) {
    const prefix = getRoutePrefix('establishments', { drrg: 'establishments', drcx: 'establishments', drpd: 'establishment' });
    const [showDelete, setShowDelete] = useState(false);
    const [processing, setProcessing] = useState(false);

    const { data, setData, put, processing: saving, errors } = useForm({
        code: establishment.code ?? '',
        name: establishment.name ?? '',
        sector: establishment.sector ?? '',
        type: establishment.type ?? '',
        email: establishment.email ?? '',
        phone: establishment.phone ?? '',
        address: establishment.address ?? '',
        complex_id: establishment.complex_id ?? '',
        head_id: establishment.head_id ?? '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (prefix.endsWith('/establishment')) {
            put(`/${prefix}`);
        } else {
            put(`/${prefix}/${establishment.id}`);
        }
    }

    function handleDelete() {
        setProcessing(true);
        router.delete(`/${prefix}/${establishment.id}`, {
            onSuccess: () => router.visit(`/${prefix}`),
            onFinish: () => setProcessing(false),
        });
    }

    return (
        <Dashboard title={`Modifier — ${establishment.name}`}>
            <Head title={`Modifier ${establishment.name} — OFPPT`} />

            <div className="mx-auto max-w-3xl space-y-6">
                <Link href={`/${prefix}`} className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-indigo-600">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L4.414 10H19a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Retour
                </Link>

                <FormCard
                    title="Modifier l'établissement"
                    subtitle={`Code : ${establishment.code}`}
                    cancelHref={`/${prefix}`}
                    onSubmit={handleSubmit}
                    processing={saving}
                    fields={[
                        { name: 'code', label: 'Code', value: data.code, error: errors.code, onChange: setData },
                        { name: 'name', label: 'Nom', value: data.name, error: errors.name, onChange: setData },
                        {
                            name: 'complex_id',
                            label: 'Complexe',
                            value: data.complex_id,
                            error: errors.complex_id,
                            onChange: setData,
                            options: complexes.map(c => ({ value: c.id, label: c.name })),
                        },
                        {
                            name: 'head_id',
                            label: 'Responsable',
                            value: data.head_id,
                            error: errors.head_id,
                            onChange: setData,
                            options: availableHeads
                                .filter(u => !u.headed_establishment || u.id === establishment.head_id)
                                .map(u => ({ value: u.id, label: `${u.first_name} ${u.last_name} (${u.code})` })),
                        },
                        { name: 'sector', label: 'Secteur', value: data.sector, error: errors.sector, onChange: setData, options: SECTOR_OPTIONS },
                        { name: 'type', label: 'Type', value: data.type, error: errors.type, onChange: setData, options: ESTABLISHMENT_TYPE_OPTIONS },
                        { name: 'email', label: 'Email', type: 'email', value: data.email, error: errors.email, onChange: setData },
                        { name: 'phone', label: 'Téléphone', value: data.phone, error: errors.phone, onChange: setData },
                        { name: 'address', label: 'Adresse', value: data.address, error: errors.address, onChange: setData, fullWidth: true, textarea: true },
                    ]}
                />

                {prefix.startsWith('admin') && (
                    <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
                        <h3 className="text-sm font-semibold text-red-800">Zone dangereuse</h3>
                        <p className="mt-1 text-xs text-red-600">La suppression de cet établissement est irréversible.</p>
                        <button onClick={() => setShowDelete(true)} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50">
                            Supprimer l'établissement
                        </button>
                    </div>
                )}
            </div>

            <Modal
                open={showDelete}
                onClose={() => !processing && setShowDelete(false)}
                title="Confirmer la suppression"
                description={`Êtes-vous sûr de vouloir supprimer "${establishment.name}" ?`}
                footer={
                    <>
                        <button onClick={() => !processing && setShowDelete(false)} disabled={processing} className="rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 shadow-sm hover:bg-stone-50 disabled:opacity-60">Annuler</button>
                        <button onClick={handleDelete} disabled={processing} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700 disabled:pointer-events-none disabled:opacity-60">{processing ? 'Suppression...' : 'Supprimer'}</button>
                    </>
                }
            />
        </Dashboard>
    );
}
