import { Head, useForm } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import FormCard from '../../components/FormCard';
import { getRoutePrefix } from '../../lib/routes';

export default function Create({ regions, availableHeads }) {
    const prefix = getRoutePrefix('complexes', { drrg: 'complexes', drcx: 'complex' });
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
        email: '',
        phone: '',
        location: '',
        region_id: '',
        head_id: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(`/${prefix}`);
    }

    return (
        <Dashboard title="Ajouter un complexe">
            <Head title="Ajouter un complexe — OFPPT" />

            <FormCard
                title="Nouveau complexe"
                subtitle="Remplissez les informations du complexe"
                cancelHref={`/${prefix}`}
                onSubmit={handleSubmit}
                processing={processing}
                fields={[
                    { name: 'code', label: 'Code', value: data.code, error: errors.code, onChange: setData },
                    { name: 'name', label: 'Nom', value: data.name, error: errors.name, onChange: setData },
                    {
                        name: 'region_id',
                        label: 'Région',
                        value: data.region_id,
                        error: errors.region_id,
                        onChange: setData,
                        options: regions.map(r => ({ value: r.id, label: r.name })),
                    },
                    {
                        name: 'head_id',
                        label: 'Responsable',
                        value: data.head_id,
                        error: errors.head_id,
                        onChange: setData,
                        options: availableHeads
                            .filter(u => !u.headed_complex)
                            .map(u => ({ value: u.id, label: `${u.first_name} ${u.last_name} (${u.code})` })),
                    },
                    { name: 'email', label: 'Email', type: 'email', value: data.email, error: errors.email, onChange: setData },
                    { name: 'phone', label: 'Téléphone', value: data.phone, error: errors.phone, onChange: setData },
                    { name: 'location', label: 'Ville', value: data.location, error: errors.location, onChange: setData },
                ]}
            />
        </Dashboard>
    );
}
