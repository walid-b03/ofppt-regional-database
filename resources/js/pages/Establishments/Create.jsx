import { Head, useForm } from '@inertiajs/react';
import Dashboard from '../../layouts/Dashboard';
import EntityFormCard from '../../components/EntityFormCard';
import { SECTOR_OPTIONS, ESTABLISHMENT_TYPE_OPTIONS } from '../../lib/constants';

export default function Create({ availableComplexes, availableHeads }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
        sector: '',
        type: '',
        email: '',
        phone: '',
        address: '',
        complex_id: '',
        head_id: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/establishments');
    }

    return (
        <Dashboard title="Ajouter un établissement">
            <Head title="Ajouter un établissement — OFPPT" />

            <EntityFormCard
                title="Nouvel établissement"
                cancelHref="/establishments"
                onSubmit={handleSubmit}
                processing={processing}
                isCreate={true}
                showDelete={false}
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
                            .filter(u => !u.headedEstablishment)
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