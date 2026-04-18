import { Head, useForm, router, usePage } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import EntityFormCard from '../../components/EntityFormCard';
import { REGION_OPTIONS } from '../../lib/constants';

export default function Edit({ region, availableHeads }) {
    const { user } = usePage().props.auth;

    const { data, setData, put, processing: saving, errors } = useForm({
        code: region.code ?? '',
        name: region.name ?? '',
        email: region.email ?? '',
        phone: region.phone ?? '',
        head_id: region.head_id ?? '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(`/regions/${region.id}`);
    }

    function handleDelete() {
        router.delete(`/regions/${region.id}`, {
            onSuccess: () => router.visit('/regions'),
        });
    }

    return (
        <Dashboard title={`Modifier — ${region.name}`}>
            <Head title={`Modifier ${region.name} — OFPPT`} />

            <EntityFormCard
                title="Modifier la région"
                cancelHref="/regions"
                onSubmit={handleSubmit}
                processing={saving}
                isCreate={false}
                entity={region}
                entityLabel="Région"
                onDelete={user.role === 'admin' ? handleDelete : undefined}
                showDelete={user.role === 'admin'}
                deleteZoneTitle="Zone dangereuse"
                deleteZoneDescription="La suppression de cette région entrâinera la suppression de tous les complexes et établissements associés."
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
        </Dashboard>
    );
}