import { Head, useForm } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import FormCard from '../../components/FormCard';
import { getRoutePrefix } from '../../lib/routes';

export default function Create({ establishments }) {
    const prefix = getRoutePrefix('rooms');
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
        type: '',
        establishment_id: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(`/${prefix}`);
    }

    return (
        <Dashboard title="Ajouter une salle">
            <Head title="Ajouter une salle — OFPPT" />

            <FormCard
                title="Nouvelle salle"
                subtitle="Remplissez les informations de la salle"
                cancelHref={`/${prefix}`}
                onSubmit={handleSubmit}
                processing={processing}
                fields={[
                    { name: 'code', label: 'Code', value: data.code, error: errors.code, onChange: setData },
                    { name: 'name', label: 'Nom', value: data.name, error: errors.name, onChange: setData },
                    {
                        name: 'establishment_id',
                        label: 'Établissement',
                        value: data.establishment_id,
                        error: errors.establishment_id,
                        onChange: setData,
                        options: establishments.map(e => ({ value: e.id, label: e.name })),
                    },
                    { name: 'type', label: 'Type', value: data.type, error: errors.type, onChange: setData },
                ]}
            />
        </Dashboard>
    );
}
