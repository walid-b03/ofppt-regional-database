import { Head, useForm } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import UserFormCard from '../../components/UserFormCard';
import { MARITAL_OPTIONS, RANK_OPTIONS, ROLE_LABELS } from '../../lib/constants';
import { LABEL_MAP } from '../../components/UserInfoCard';

export default function Create({ availableEstablishments, availableRoles }) {
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

    const establishmentOptions = availableEstablishments.map(e => ({ value: e.id, label: e.name }));
    const roleOptions = availableRoles.map(r => ({ value: r, label: ROLE_LABELS[r] || r }));

    const fields = [
        { name: 'code', label: LABEL_MAP.code || 'Code', value: data.code, error: errors.code, onChange: setData },
        { name: 'first_name', label: LABEL_MAP.first_name || 'Prénom', value: data.first_name, error: errors.first_name, onChange: setData },
        { name: 'last_name', label: LABEL_MAP.last_name || 'Nom', value: data.last_name, error: errors.last_name, onChange: setData },
        { name: 'cin', label: LABEL_MAP.cin || 'CIN', value: data.cin, error: errors.cin, onChange: setData },
        { name: 'marital_status', label: LABEL_MAP.marital_status || 'État civil', value: data.marital_status, error: errors.marital_status, onChange: setData, options: MARITAL_OPTIONS },
        { name: 'children', label: LABEL_MAP.children || "Nombre d'enfants", type: 'number', value: data.children, error: errors.children, onChange: setData },
        { name: 'date_of_birth', label: LABEL_MAP.date_of_birth || 'Date de naissance', type: 'date', value: data.date_of_birth, error: errors.date_of_birth, onChange: setData },
        { name: 'date_of_recruitment', label: LABEL_MAP.date_of_recruitment || 'Date de recrutement', type: 'date', value: data.date_of_recruitment, error: errors.date_of_recruitment, onChange: setData },
        { name: 'diploma', label: LABEL_MAP.diploma || 'Diplôme', value: data.diploma, error: errors.diploma, onChange: setData },
        { name: 'rank', label: LABEL_MAP.rank || 'Grade', value: data.rank, error: errors.rank, onChange: setData, options: RANK_OPTIONS },
        { name: 'role', label: LABEL_MAP.role || 'Rôle', value: data.role, error: errors.role, onChange: setData, options: roleOptions },
        { name: 'establishment_id', label: 'Établissement', value: data.establishment_id, error: errors.establishment_id, onChange: setData, options: establishmentOptions },
        { name: 'email', label: LABEL_MAP.email || 'Email', type: 'email', value: data.email, error: errors.email, onChange: setData },
        { name: 'phone', label: LABEL_MAP.phone || 'Téléphone', value: data.phone, error: errors.phone, onChange: setData },
        { name: 'address', label: LABEL_MAP.address || 'Adresse', value: data.address, error: errors.address, onChange: setData, textarea: true },
        { name: 'password', label: 'Mot de passe', type: 'password', value: data.password, error: errors.password, onChange: setData },
        { name: 'password_confirmation', label: 'Confirmer le mot de passe', type: 'password', value: data.password_confirmation, error: errors.password_confirmation, onChange: setData },
    ];

    function handleSubmit(e) {
        e.preventDefault();
        post('/users');
    }

    return (
        <Dashboard title="Ajouter un membre">
            <Head title="Ajouter un membre — OFPPT" />

            <div className="mx-auto max-w-5xl space-y-6">
                <UserFormCard
                    title="Nouveau membre"
                    cancelHref="/users"
                    onSubmit={handleSubmit}
                    processing={processing}
                    fields={fields}
                    extraFields={[]}
                    showPassword={false}
                    showDelete={false}
                    isCreate={true}
                />
            </div>
        </Dashboard>
    );
}