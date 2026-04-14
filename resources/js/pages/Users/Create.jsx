import { Head, useForm } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import FormCard from '../../components/FormCard';
import { MARITAL_OPTIONS, RANK_OPTIONS, ROLE_LABELS } from '../../lib/constants';
import { getRoutePrefix } from '../../lib/routes';

export default function Create({ establishments, availableRoles }) {
    const prefix = getRoutePrefix('users', { drrg: 'users', drcx: 'users', drpd: 'users' });
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        first_name: '',
        last_name: '',
        cin: '',
        marital_status: '',
        children: '',
        email: '',
        phone: '',
        address: '',
        date_of_birth: '',
        date_of_recruitment: '',
        diploma: '',
        rank: '',
        role: '',
        establishment_id: '',
        password: '',
        password_confirmation: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(`/${prefix}`);
    }

    return (
        <Dashboard title="Ajouter un membre">
            <Head title="Ajouter un membre — OFPPT" />

            <FormCard
                title="Nouveau membre"
                subtitle="Remplissez les informations du membre du personnel"
                cancelHref={`/${prefix}`}
                onSubmit={handleSubmit}
                processing={processing}
                fields={[
                    { name: 'code', label: 'Code', value: data.code, error: errors.code, onChange: setData },
                    { name: 'first_name', label: 'Prénom', value: data.first_name, error: errors.first_name, onChange: setData },
                    { name: 'last_name', label: 'Nom', value: data.last_name, error: errors.last_name, onChange: setData },
                    { name: 'cin', label: 'CIN', value: data.cin, error: errors.cin, onChange: setData },
                    { name: 'marital_status', label: 'État civil', value: data.marital_status, error: errors.marital_status, onChange: setData, options: MARITAL_OPTIONS },
                    { name: 'children', label: 'Nombre d\'enfants', type: 'number', value: data.children, error: errors.children, onChange: setData },
                    { name: 'date_of_birth', label: 'Date de naissance', type: 'date', value: data.date_of_birth, error: errors.date_of_birth, onChange: setData },
                    { name: 'date_of_recruitment', label: 'Date de recrutement', type: 'date', value: data.date_of_recruitment, error: errors.date_of_recruitment, onChange: setData },
                    { name: 'diploma', label: 'Diplôme', value: data.diploma, error: errors.diploma, onChange: setData },
                    { name: 'rank', label: 'Grade', value: data.rank, error: errors.rank, onChange: setData, options: RANK_OPTIONS },
                    {
                        name: 'role',
                        label: 'Rôle',
                        value: data.role,
                        error: errors.role,
                        onChange: setData,
                        options: availableRoles.map(r => ({ value: r, label: ROLE_LABELS[r] || r })),
                    },
                    {
                        name: 'establishment_id',
                        label: 'Établissement',
                        value: data.establishment_id,
                        error: errors.establishment_id,
                        onChange: setData,
                        options: establishments.map(e => ({ value: e.id, label: e.name })),
                    },
                    { name: 'email', label: 'Email', type: 'email', value: data.email, error: errors.email, onChange: setData },
                    { name: 'phone', label: 'Téléphone', value: data.phone, error: errors.phone, onChange: setData },
                    { name: 'address', label: 'Adresse', value: data.address, error: errors.address, onChange: setData, fullWidth: true, textarea: true },
                    { name: 'password', label: 'Mot de passe', type: 'password', value: data.password, error: errors.password, onChange: setData },
                    { name: 'password_confirmation', label: 'Confirmer le mot de passe', type: 'password', value: data.password_confirmation, error: errors.password_confirmation, onChange: setData },
                ]}
            />
        </Dashboard>
    );
}
