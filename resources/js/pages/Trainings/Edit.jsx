import { Head, Link, useForm, router } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import FormCard from '../../components/FormCard';
import { useState } from 'react';
import Modal from '../../components/Modal';
import { TRAINING_TYPE_OPTIONS, TRAINING_LEVEL_OPTIONS } from '../../lib/constants';
import { getRoutePrefix } from '../../lib/routes';

export default function Edit({ training, establishments }) {
    const prefix = getRoutePrefix('trainings');
    const [showDelete, setShowDelete] = useState(false);
    const [processing, setProcessing] = useState(false);

    const { data, setData, put, processing: saving, errors } = useForm({
        code: training.code ?? '',
        name: training.name ?? '',
        type: training.type ?? '',
        level: training.level ?? '',
        is_trunk: training.is_trunk ?? false,
        duration: training.duration ?? '',
        description: training.description ?? '',
        establishment_id: training.establishment_id ?? '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(`/${prefix}/${training.id}`);
    }

    function handleDelete() {
        setProcessing(true);
        router.delete(`/${prefix}/${training.id}`, {
            onSuccess: () => router.visit(`/${prefix}`),
            onFinish: () => setProcessing(false),
        });
    }

    return (
        <Dashboard title={`Modifier — ${training.name}`}>
            <Head title={`Modifier ${training.name} — OFPPT`} />

            <div className="mx-auto max-w-3xl space-y-6">
                <Link href={`/${prefix}`} className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-indigo-600">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L4.414 10H19a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Retour
                </Link>

                <FormCard
                    title="Modifier la formation"
                    subtitle={`Code : ${training.code}`}
                    cancelHref={`/${prefix}`}
                    onSubmit={handleSubmit}
                    processing={saving}
                    fields={[
                        { name: 'code', label: 'Code', value: data.code, error: errors.code, onChange: setData },
                        { name: 'name', label: 'Nom', value: data.name, error: errors.name, onChange: setData },
                        {
                            name: 'establishment_id',
                            label: 'Établissement',
                            value: data.establishment_id,
                            error: errors.establishment_id,
                            onChange: setData,
                            options: establishments.map(e => ({ value: e.id, label: e.name })),
                        },
                        { name: 'type', label: 'Type', value: data.type, error: errors.type, onChange: setData, options: TRAINING_TYPE_OPTIONS },
                        { name: 'level', label: 'Niveau', value: data.level, error: errors.level, onChange: setData, options: TRAINING_LEVEL_OPTIONS },
                        { name: 'duration', label: 'Durée (mois)', type: 'number', value: data.duration, error: errors.duration, onChange: setData },
                        { name: 'is_trunk', label: 'Tronc commun', checkbox: true, value: data.is_trunk, error: errors.is_trunk, onChange: setData },
                        { name: 'description', label: 'Description', value: data.description, error: errors.description, onChange: setData, fullWidth: true, textarea: true },
                    ]}
                />

                <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
                    <h3 className="text-sm font-semibold text-red-800">Zone dangereuse</h3>
                    <p className="mt-1 text-xs text-red-600">La suppression de cette formation est irréversible.</p>
                    <button onClick={() => setShowDelete(true)} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50">
                        Supprimer la formation
                    </button>
                </div>
            </div>

            <Modal
                open={showDelete}
                onClose={() => !processing && setShowDelete(false)}
                title="Confirmer la suppression"
                description={`Êtes-vous sûr de vouloir supprimer "${training.name}" ?`}
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
