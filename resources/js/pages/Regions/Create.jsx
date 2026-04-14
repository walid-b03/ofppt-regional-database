import { Head, useForm } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import FormCard from '../../components/FormCard';
import { REGION_OPTIONS } from '../../lib/constants';
import { getRoutePrefix } from '../../lib/routes';

export default function Create({ availableHeads }) {
    const prefix = getRoutePrefix('regions', { drrg: 'region' });
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
        email: '',
        phone: '',
        head_id: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(`/${prefix}`);
    }

    return (
        <Dashboard title="Ajouter une région">
            <Head title="Ajouter une région — OFPPT" />

            <FormCard
                title="Nouvelle région"
                subtitle="Remplissez les informations de la région"
                cancelHref={`/${prefix}`}
                onSubmit={handleSubmit}
                processing={processing}
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
                            .filter(u => !u.headed_region)
                            .map(u => ({ value: u.id, label: `${u.first_name} ${u.last_name} (${u.code})` })),
                    },
                    { name: 'email', label: 'Email', type: 'email', value: data.email, error: errors.email, onChange: setData },
                    { name: 'phone', label: 'Téléphone', value: data.phone, error: errors.phone, onChange: setData },
                ]}
            />
        </Dashboard>
    );
}
