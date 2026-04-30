import { Head, useForm, usePage } from "@inertiajs/react";
import Dashboard from "../../layout/Dashboard";
import UserFormCard from "../../components/UserFormCard";
import { MARITAL_OPTIONS, RANK_OPTIONS, ROLE_LABELS } from "../../lib/constants";
import { LABEL_MAP } from "../../components/UserInfoCard";

export default function Edit({ user, availableEstablishments, availableRoles }) {
    const { auth } = usePage().props;
    const isAdmin = auth?.user?.role === "admin";
    const canDelete = isAdmin && user.id !== auth?.user?.id;

    const { data, setData, put, processing: saving, errors } = useForm({
        code: user.code ?? "",
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        cin: user.cin ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        role: user.role ?? "",
        establishment_id: user.establishment_id ?? "",
        marital_status: user.marital_status ?? "",
        children: user.children ?? "",
        address: user.address ?? "",
        date_of_birth: user.date_of_birth ?? "",
        date_of_recruitment: user.date_of_recruitment ?? "",
        site_of_recruitment: user.site_of_recruitment ?? "",
        diploma: user.diploma ?? "",
        rank: user.rank ?? "",
        role_label: user.role_label ?? "",
    });

    const establishmentOptions = availableEstablishments.map(e => ({ value: e.id, label: e.name }));
    const roleOptions = Object.entries(ROLE_LABELS).map(([v, l]) => ({ value: v, label: l }));

    const baseFields = isAdmin
        ? [
            { name: "code", label: LABEL_MAP.code || "Code", value: data.code, error: errors.code, onChange: setData },
            { name: "first_name", label: LABEL_MAP.first_name || "Prénom", value: data.first_name, error: errors.first_name, onChange: setData },
            { name: "last_name", label: LABEL_MAP.last_name || "Nom", value: data.last_name, error: errors.last_name, onChange: setData },
            { name: "cin", label: LABEL_MAP.cin || "CIN", value: data.cin, error: errors.cin, onChange: setData },
            { name: "marital_status", label: LABEL_MAP.marital_status || "État civil", value: data.marital_status, error: errors.marital_status, onChange: setData, options: MARITAL_OPTIONS },
            { name: "children", label: LABEL_MAP.children || "Nombre d'enfants", value: data.children, error: errors.children, onChange: setData, type: "number" },
            { name: "email", label: LABEL_MAP.email || "Email", value: data.email, error: errors.email, onChange: setData, type: "email" },
            { name: "phone", label: LABEL_MAP.phone || "Téléphone", value: data.phone, error: errors.phone, onChange: setData },
            { name: "date_of_birth", label: LABEL_MAP.date_of_birth || "Date de naissance", value: data.date_of_birth, error: errors.date_of_birth, onChange: setData, type: "date" },
            { name: "date_of_recruitment", label: LABEL_MAP.date_of_recruitment || "Date de recrutement", value: data.date_of_recruitment, error: errors.date_of_recruitment, onChange: setData, type: "date" },
            { name: "site_of_recruitment", label: LABEL_MAP.site_of_recruitment || "Site de recrutement", value: data.site_of_recruitment, error: errors.site_of_recruitment, onChange: setData },
            { name: "diploma", label: LABEL_MAP.diploma || "Diplôme", value: data.diploma, error: errors.diploma, onChange: setData },
            { name: "rank", label: LABEL_MAP.rank || "Grade", value: data.rank, error: errors.rank, onChange: setData, options: RANK_OPTIONS },
        ]
        : [
            { name: "first_name", label: LABEL_MAP.first_name || "Prénom", value: data.first_name, error: errors.first_name, onChange: setData },
            { name: "last_name", label: LABEL_MAP.last_name || "Nom", value: data.last_name, error: errors.last_name, onChange: setData },
            { name: "cin", label: LABEL_MAP.cin || "CIN", value: data.cin, error: errors.cin, onChange: setData },
            { name: "marital_status", label: LABEL_MAP.marital_status || "État civil", value: data.marital_status, error: errors.marital_status, onChange: setData, options: MARITAL_OPTIONS },
            { name: "children", label: LABEL_MAP.children || "Nombre d'enfants", value: data.children, error: errors.children, onChange: setData, type: "number" },
            { name: "email", label: LABEL_MAP.email || "Email", value: data.email, error: errors.email, onChange: setData, type: "email" },
            { name: "phone", label: LABEL_MAP.phone || "Téléphone", value: data.phone, error: errors.phone, onChange: setData },
            { name: "date_of_birth", label: LABEL_MAP.date_of_birth || "Date de naissance", value: data.date_of_birth, error: errors.date_of_birth, onChange: setData, type: "date" },
            { name: "date_of_recruitment", label: LABEL_MAP.date_of_recruitment || "Date de recrutement", value: data.date_of_recruitment, error: errors.date_of_recruitment, onChange: setData, type: "date" },
            { name: "site_of_recruitment", label: LABEL_MAP.site_of_recruitment || "Site de recrutement", value: data.site_of_recruitment, error: errors.site_of_recruitment, onChange: setData },
            { name: "diploma", label: LABEL_MAP.diploma || "Diplôme", value: data.diploma, error: errors.diploma, onChange: setData },
            { name: "rank", label: LABEL_MAP.rank || "Grade", value: data.rank, error: errors.rank, onChange: setData, options: RANK_OPTIONS },
        ];

    const extraFields = isAdmin
        ? [
            { name: "role", label: "Rôle", value: data.role, error: errors.role, onChange: setData, options: roleOptions },
            { name: "role_label", label: LABEL_MAP.role_label || "Fonction", value: data.role_label, error: errors.role_label, onChange: setData },
            { name: "establishment_id", label: "Établissement", value: data.establishment_id, error: errors.establishment_id, onChange: setData, options: establishmentOptions },
        ]
        : [];

    const addressField = { name: "address", label: LABEL_MAP.address || "Adresse", value: data.address, error: errors.address, onChange: setData, textarea: true };

    function handleSubmit(e) {
        e.preventDefault();
        put(`/users/${user.id}`, { preserveScroll: true });
    }

    return (
        <Dashboard title={`Modifier — ${user.first_name} ${user.last_name}`}>
            <Head title={`Modifier ${user.first_name} — OFPPT`} />

            <div className="mx-auto max-w-5xl space-y-6">
                <UserFormCard
                    title="Informations du membre"
                    cancelHref="/users"
                    onSubmit={handleSubmit}
                    processing={saving}
                    fields={[...baseFields, addressField]}
                    extraFields={extraFields}
                    showPassword={true}
                    user={user}
                    showDelete={canDelete}
                    deleteUrl={canDelete ? `/users/${user.id}` : undefined}
                    dangerZoneTitle="Zone dangereuse"
                    dangerZoneDescription="La suppression de ce membre du personnel est irréversible."
                />
            </div>
        </Dashboard>
    );
}