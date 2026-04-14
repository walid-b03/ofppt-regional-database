import { Head, Link, useForm } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import FormCard from '../../components/FormCard';
import { Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '../../components/Modal';
import { REGION_OPTIONS } from '../../lib/constants';
import { getRoutePrefix } from '../../lib/routes';

export default function Edit({ region, availableHeads }) {
    const prefix = getRoutePrefix('regions', { drrg: 'region' });
    const [showDelete, setShowDelete] = useState(false);
    const [processing, setProcessing] = useState(false);

    const { data, setData, put, processing: saving, errors } = useForm({
        code: region.code ?? '',
        name: region.name ?? '',
        email: region.email ?? '',
        phone: region.phone ?? '',
        head_id: region.head_id ?? '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (prefix.includes('region/') && !prefix.includes('regions')) {
            // singular route (drrg/region)
            put(`/${prefix}`);
        } else {
            put(`/${prefix}/${region.id}`);
        }
    }

    function handleDelete() {
        setProcessing(true);
        router.delete(`/${prefix}/${region.id}`, {
            onSuccess: () => router.visit(`/${prefix}`),
            onFinish: () => setProcessing(false),
        });
    }

    return (
        <Dashboard title={`Modifier — ${region.name}`}>
            <Head title={`Modifier ${region.name} — OFPPT`} />

            <div className="mx-auto max-w-3xl space-y-6">
                <Link
                    href={`/${prefix}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-indigo-600"
                >
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L4.414 10H19a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Retour
                </Link>

                <FormCard
                    title="Modifier la région"
                    subtitle={`Code : ${region.code}`}
                    cancelHref={`/${prefix}`}
                    onSubmit={handleSubmit}
                    processing={saving}
                    fields={[
                        { name: 'code', label: 'Code', value: data.code, error: errors.code, onChange: setData },
                        { name: 'name', label: 'Nom', value: data.name, error: errors.name, onChange: setData, options: REGION_OPTIONS },
                        {
                            name: 'head_id',
                            label: 'Responsable',
                            value: data.head_id,
                            error: errors.head_id,
                            onChange: setData,
                            options: availableHeads
                                .filter(u => !u.headed_region || u.id === region.head_id)
                                .map(u => ({ value: u.id, label: `${u.first_name} ${u.last_name} (${u.code})` })),
                        },
                        { name: 'email', label: 'Email', type: 'email', value: data.email, error: errors.email, onChange: setData },
                        { name: 'phone', label: 'Téléphone', value: data.phone, error: errors.phone, onChange: setData },
                    ]}
                />

                {/* Danger zone */}
                {prefix.startsWith('admin') && (
                    <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
                        <h3 className="text-sm font-semibold text-red-800">Zone dangereuse</h3>
                        <p className="mt-1 text-xs text-red-600">
                            La suppression de cette région entraînera la suppression de tous les complexes et établissements associés.
                        </p>
                        <button
                            onClick={() => setShowDelete(true)}
                            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm transition-all duration-200 hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4" />
                            Supprimer la région
                        </button>
                    </div>
                )}
            </div>

            {/* Delete modal */}
            <Modal
                open={showDelete}
                onClose={() => !processing && setShowDelete(false)}
                title="Confirmer la suppression"
                description={`Êtes-vous sûr de vouloir supprimer "${region.name}" ? Cette action est irréversible.`}
                footer={
                    <>
                        <button
                            onClick={() => !processing && setShowDelete(false)}
                            disabled={processing}
                            className="rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-all duration-200 hover:bg-stone-50 disabled:opacity-60"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition-all duration-200 hover:bg-red-700 disabled:pointer-events-none disabled:opacity-60"
                        >
                            {processing ? 'Suppression...' : 'Supprimer'}
                        </button>
                    </>
                }
            />
        </Dashboard>
    );
}
