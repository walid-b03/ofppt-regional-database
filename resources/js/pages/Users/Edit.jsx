import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import FormCard from '../../components/FormCard';
import PasswordModal from '../../components/PasswordModal';
import { useState } from 'react';
import Modal from '../../components/Modal';
import { Lock, Trash2 } from 'lucide-react';
import { ROLE_LABELS } from '../../lib/constants';
import { getRoutePrefix } from '../../lib/routes';

export default function Edit({ user: serverUser, establishments, availableRoles }) {
    const prefix = getRoutePrefix('users', { drrg: 'users', drcx: 'users', drpd: 'users' });
    const { auth } = usePage().props;
    const [showDelete, setShowDelete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [pwOpen, setPwOpen] = useState(false);

    const { data, setData, put, processing: saving, errors } = useForm({
        code: serverUser.code ?? '',
        first_name: serverUser.first_name ?? '',
        last_name: serverUser.last_name ?? '',
        cin: serverUser.cin ?? '',
        email: serverUser.email ?? '',
        phone: serverUser.phone ?? '',
        role: serverUser.role ?? '',
        establishment_id: serverUser.establishment_id ?? '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(`/${prefix}/${serverUser.id}`);
    }

    function handleDelete() {
        setProcessing(true);
        router.delete(`/${prefix}/${serverUser.id}`, {
            onSuccess: () => router.visit(`/${prefix}`),
            onFinish: () => setProcessing(false),
        });
    }

    return (
        <Dashboard title={`Modifier — ${serverUser.first_name} ${serverUser.last_name}`}>
            <Head title={`Modifier ${serverUser.first_name} — OFPPT`} />

            <div className="mx-auto max-w-3xl space-y-6">
                <Link href={`/${prefix}`} className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-indigo-600">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L4.414 10H19a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Retour
                </Link>

                <FormCard
                    title="Modifier le membre du personnel"
                    subtitle={`${serverUser.code} — ${ROLE_LABELS[serverUser.role]}`}
                    cancelHref={`/${prefix}`}
                    onSubmit={handleSubmit}
                    processing={saving}
                    fields={[
                        { name: 'code', label: 'Code', value: data.code, error: errors.code, onChange: setData },
                        { name: 'first_name', label: 'Prénom', value: data.first_name, error: errors.first_name, onChange: setData },
                        { name: 'last_name', label: 'Nom', value: data.last_name, error: errors.last_name, onChange: setData },
                        { name: 'cin', label: 'CIN', value: data.cin, error: errors.cin, onChange: setData },
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
                    ]}
                    extra={
                        <button
                            type="button"
                            onClick={() => setPwOpen(true)}
                            className="group/btn inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-all duration-200 hover:bg-stone-50 hover:text-stone-900"
                        >
                            <Lock className="h-4 w-4 text-stone-400 transition-colors group-hover/btn:text-indigo-500" />
                            Changer le mot de passe
                        </button>
                    }
                />

                {serverUser.id !== auth?.user?.id && (
                    <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
                        <h3 className="text-sm font-semibold text-red-800">Zone dangereuse</h3>
                        <p className="mt-1 text-xs text-red-600">La suppression de ce membre du personnel est irréversible.</p>
                        <button onClick={() => setShowDelete(true)} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                            Supprimer le membre
                        </button>
                    </div>
                )}
            </div>

            {/* Password modal */}
            <PasswordModal open={pwOpen} onClose={() => setPwOpen(false)} user={serverUser} />

            {/* Delete modal */}
            <Modal
                open={showDelete}
                onClose={() => !processing && setShowDelete(false)}
                title="Confirmer la suppression"
                description={`Êtes-vous sûr de vouloir supprimer "${serverUser.first_name} ${serverUser.last_name}" ?`}
                footer={
                    <>
                        <button onClick={() => !processing && setShowDelete(false)} disabled={processing} className="rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 shadow-sm hover:bg-stone-50 disabled:opacity-60">Annuler</button>
                        <button onClick={handleDelete} disabled={processing} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700 disabled:pointer-events-none disabled:opacity-60">{processing ? 'Suppression...' : 'Supprimer'}</button>
                    </>
                }
            />
        </Dashboard>
    );
}
