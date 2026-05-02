import { Head, useForm } from '@inertiajs/react';
import Dashboard from '../../layouts/Dashboard';
import EntityFormCard from '../../components/EntityFormCard';

export default function Create({ availableRegions, availableHeads }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        name: '',
        email: '',
        phone: '',
        city: '',
        region_id: '',
        head_id: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/complexes');
    }

    return (
        <Dashboard title="Ajouter un complexe">
            <Head title="Ajouter un complexe — OFPPT" />

            <EntityFormCard
                title="Nouveau complexe"
                cancelHref="/complexes"
                onSubmit={handleSubmit}
                processing={processing}
                isCreate={true}
                showDelete={false}
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
                            .filter(u => !u.headedComplex)
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