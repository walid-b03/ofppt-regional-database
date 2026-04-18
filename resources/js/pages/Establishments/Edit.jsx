import { Head, useForm, router, usePage } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import EntityFormCard from '../../components/EntityFormCard';
import { SECTOR_OPTIONS, ESTABLISHMENT_TYPE_OPTIONS } from '../../lib/constants';

export default function Edit({ establishment, availableComplexes, availableHeads }) {
    const { user } = usePage().props.auth;

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
        put(`/establishments/${establishment.id}`);
    }

    function handleDelete() {
        router.delete(`/establishments/${establishment.id}`, {
            onSuccess: () => router.visit('/establishments'),
        });
    }

    return (
        <Dashboard title={`Modifier — ${establishment.name}`}>
            <Head title={`Modifier ${establishment.name} — OFPPT`} />

            <EntityFormCard
                title="Modifier l'établissement"
                cancelHref="/establishments"
                onSubmit={handleSubmit}
                processing={saving}
                isCreate={false}
                entity={establishment}
                entityLabel="Établissement"
                onDelete={user.role === 'admin' ? handleDelete : undefined}
                showDelete={user.role === 'admin'}
                fields={[
                    { name: 'code', label: 'Code', value: data.code, error: errors.code, onChange: setData },
                    { name: 'name', label: 'Nom', value: data.name, error: errors.name, onChange: setData },
                    {
                        name: 'complex_id',
                        label: 'Complexe',
                        value: data.complex_id,
                        error: errors.complex_id,
                        onChange: setData,
                        options: availableComplexes.map(c => ({ value: c.id, label: c.name })),
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
        </Dashboard>
    );
}