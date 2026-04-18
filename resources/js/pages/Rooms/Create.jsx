import { Head, useForm } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import EntityFormCard from '../../components/EntityFormCard';

export default function Create({ availableEstablishments }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
        type: '',
        establishment_id: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/rooms');
    }

    return (
        <Dashboard title="Ajouter une salle">
            <Head title="Ajouter une salle — OFPPT" />

            <EntityFormCard
                title="Nouvelle salle"
                cancelHref="/rooms"
                onSubmit={handleSubmit}
                processing={processing}
                isCreate={true}
                showDelete={false}
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