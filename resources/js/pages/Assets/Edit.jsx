import { Head, useForm, usePage } from '@inertiajs/react';
import Dashboard from '../../layouts/Dashboard';
import EntityFormCard from '../../components/EntityFormCard';
import { ASSET_STATE_OPTIONS } from '../../lib/constants';

export default function Edit({ asset, availableEstablishments }) {
    const { user } = usePage().props.auth;
    const { data, setData, put, processing: saving, errors } = useForm({
        code: asset.code ?? '',
        name: asset.name ?? '',
        type: asset.type ?? '',
        state: asset.state ?? '',
        description: asset.description ?? '',
        notes: asset.notes ?? '',
        establishment_id: asset.establishment_id ?? '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(`/assets/${asset.id}`);
    }

    return (
        <Dashboard title={`Modifier — ${asset.name}`}>
            <Head title={`Modifier ${asset.name} — OFPPT`} />

            <EntityFormCard
                title="Modifier l'actif"
                cancelHref="/assets"
                onSubmit={handleSubmit}
                processing={saving}
                isCreate={false}
                entity={asset}
                entityLabel="Actif"
                deleteUrl={user.role === 'admin' ? `/assets/${asset.id}` : undefined}
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
                    { name: 'type', label: 'Type', value: data.type, error: errors.type, onChange: setData },
                    { name: 'state', label: 'État', value: data.state, error: errors.state, onChange: setData, options: ASSET_STATE_OPTIONS },
                    { name: 'description', label: 'Description', value: data.description, error: errors.description, onChange: setData, fullWidth: true, textarea: true },
                    { name: 'notes', label: 'Notes', value: data.notes, error: errors.notes, onChange: setData, fullWidth: true, textarea: true, rows: 2 },
                ]}
            />
        </Dashboard>
    );
}