import { Head, useForm, usePage } from '@inertiajs/react';
import Dashboard from '../../layouts/Dashboard';
import EntityFormCard from '../../components/EntityFormCard';
import { TRAINING_TYPE_OPTIONS, TRAINING_LEVEL_OPTIONS } from '../../lib/constants';

export default function Edit({ training, availableEstablishments }) {
    const { user } = usePage().props.auth;
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
        put(`/trainings/${training.id}`);
    }

    return (
        <Dashboard title={`Modifier — ${training.name}`}>
            <Head title={`Modifier ${training.name} — OFPPT`} />

            <EntityFormCard
                title="Modifier la formation"
                cancelHref="/trainings"
                onSubmit={handleSubmit}
                processing={saving}
                isCreate={false}
                entity={training}
                entityLabel="Formation"
                deleteUrl={user.role === 'admin' ? `/trainings/${training.id}` : undefined}
                fields={[
                    { name: 'code', label: 'Code', value: data.code, error: errors.code, onChange: setData },
                    { name: 'name', label: 'Nom', value: data.name, error: errors.name, onChange: setData },
                    {
                        name: 'establishment_id',
                        label: 'Établissement',
                        value: data.establishment_id,
                        error: errors.establishment_id,
                        onChange: setData,
                        options: availableEstablishments.map(e => ({ value: e.id, label: e.name })),
                    },
                    { name: 'type', label: 'Type', value: data.type, error: errors.type, onChange: setData, options: TRAINING_TYPE_OPTIONS },
                    { name: 'level', label: 'Niveau', value: data.level, error: errors.level, onChange: setData, options: TRAINING_LEVEL_OPTIONS },
                    { name: 'duration', label: 'Durée (mois)', type: 'number', value: data.duration, error: errors.duration, onChange: setData },
                    { name: 'is_trunk', label: 'Tronc commun', checkbox: true, value: data.is_trunk, error: errors.is_trunk, onChange: setData },
                    { name: 'description', label: 'Description', value: data.description, error: errors.description, onChange: setData, fullWidth: true, textarea: true },
                ]}
            />
        </Dashboard>
    );
}