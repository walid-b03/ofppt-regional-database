import { Head, useForm } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import EntityFormCard from '../../components/EntityFormCard';
import { ASSET_STATE_OPTIONS } from '../../lib/constants';

export default function Create({ availableEstablishments }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
        type: '',
        state: '',
        description: '',
        notes: '',
        establishment_id: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/assets');
    }

    return (
        <Dashboard title="Ajouter un actif">
            <Head title="Ajouter un actif — OFPPT" />

            <EntityFormCard
                title="Nouvel actif"
                cancelHref="/assets"
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
                    { name: 'state', label: 'État', value: data.state, error: errors.state, onChange: setData, options: ASSET_STATE_OPTIONS },
                    { name: 'description', label: 'Description', value: data.description, error: errors.description, onChange: setData, fullWidth: true, textarea: true },
                    { name: 'notes', label: 'Notes', value: data.notes, error: errors.notes, onChange: setData, fullWidth: true, textarea: true, rows: 2 },
                ]}
            />
        </Dashboard>
    );
}