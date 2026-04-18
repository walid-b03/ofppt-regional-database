import { Head, useForm, router, usePage } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import EntityFormCard from '../../components/EntityFormCard';

export default function Edit({ room, availableEstablishments }) {
    const { user } = usePage().props.auth;
    const { data, setData, put, processing: saving, errors } = useForm({
        code: room.code ?? '',
        name: room.name ?? '',
        type: room.type ?? '',
        establishment_id: room.establishment_id ?? '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(`/rooms/${room.id}`);
    }

    function handleDelete() {
        router.delete(`/rooms/${room.id}`, {
            onSuccess: () => router.visit('/rooms'),
        });
    }

    return (
        <Dashboard title={`Modifier — ${room.name}`}>
            <Head title={`Modifier ${room.name} — OFPPT`} />

            <EntityFormCard
                title="Modifier la salle"
                cancelHref="/rooms"
                onSubmit={handleSubmit}
                processing={saving}
                isCreate={false}
                entity={room}
                entityLabel="Salle"
                onDelete={user.role === 'admin' ? handleDelete : undefined}
                showDelete={user.role === 'admin'}
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
                ]}
            />
        </Dashboard>
    );
}