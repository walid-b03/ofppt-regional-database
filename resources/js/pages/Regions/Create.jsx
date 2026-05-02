import { Head, useForm } from '@inertiajs/react';
import Dashboard from '../../layouts/Dashboard';
import EntityFormCard from '../../components/EntityFormCard';
import { REGION_OPTIONS } from '../../lib/constants';

export default function Create({ availableHeads }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
        email: '',
        phone: '',
        head_id: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/regions');
    }

    return (
        <Dashboard title="Ajouter une région">
            <Head title="Ajouter une région — OFPPT" />

            <EntityFormCard
                title="Nouvelle région"
                cancelHref="/regions"
                onSubmit={handleSubmit}
                processing={processing}
                isCreate={true}
                showDelete={false}
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
                            .filter(u => !u.headedRegion)
                            .map(u => ({ value: u.id, label: `${u.first_name} ${u.last_name} (${u.code})` })),
                    },
                    { name: 'email', label: 'Email', type: 'email', value: data.email, error: errors.email, onChange: setData },
                    { name: 'phone', label: 'Téléphone', value: data.phone, error: errors.phone, onChange: setData },
                ]}
            />
        </Dashboard>
    );
}