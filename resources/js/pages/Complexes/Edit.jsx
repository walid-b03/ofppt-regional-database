import { Head, useForm, router, usePage } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import EntityFormCard from '../../components/EntityFormCard';

export default function Edit({ complex, availableRegions, availableHeads }) {
    const { user } = usePage().props.auth;

    const { data, setData, put, processing: saving, errors } = useForm({
        code: complex.code ?? '',
        name: complex.name ?? '',
        email: complex.email ?? '',
        phone: complex.phone ?? '',
        city: complex.city ?? '',
        region_id: complex.region_id ?? '',
        head_id: complex.head_id ?? '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(`/complexes/${complex.id}`);
    }

    function handleDelete() {
        router.delete(`/complexes/${complex.id}`, {
            onSuccess: () => router.visit('/complexes'),
        });
    }

    return (
        <Dashboard title={`Modifier — ${complex.name}`}>
            <Head title={`Modifier ${complex.name} — OFPPT`} />

            <EntityFormCard
                title="Modifier le complexe"
                cancelHref="/complexes"
                onSubmit={handleSubmit}
                processing={saving}
                isCreate={false}
                entity={complex}
                entityLabel="Complexe"
                onDelete={user.role === 'admin' ? handleDelete : undefined}
                showDelete={user.role === 'admin'}
                deleteZoneTitle="Zone dangereuse"
                deleteZoneDescription="La suppression de ce complexe entrâinera la suppression de tous les établissements associés."
                fields={[
                    { name: 'code', label: 'Code', value: data.code, error: errors.code, onChange: setData },
                    { name: 'name', label: 'Nom', value: data.name, error: errors.name, onChange: setData },
                    {
                        name: 'region_id',
                        label: 'Région',
                        value: data.region_id,
                        error: errors.region_id,
                        onChange: setData,
                        options: availableRegions.map(r => ({ value: r.id, label: r.name })),
                    },
                    {
                        name: 'head_id',
                        label: 'Responsable',
                        value: data.head_id,
                        error: errors.head_id,
                        onChange: setData,
                        options: availableHeads
                            .filter(u => !u.headed_complex || u.id === complex.head_id)
                            .map(u => ({ value: u.id, label: `${u.first_name} ${u.last_name} (${u.code})` })),
                    },
                    { name: 'email', label: 'Email', type: 'email', value: data.email, error: errors.email, onChange: setData },
                    { name: 'phone', label: 'Téléphone', value: data.phone, error: errors.phone, onChange: setData },
                    { name: 'city', label: 'Ville', value: data.city, error: errors.city, onChange: setData },
                ]}
            />
        </Dashboard>
    );
}