import { useState } from 'react';
import { Lock } from 'lucide-react';
import FormCard from './FormCard';
import PasswordModal from './PasswordModal';

function AvatarBanner({ user }) {
    if (!user) return null;
    const name = `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim();
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';
    const roleLabel = user.role_label || user.role || '';

    return (
        <div className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white px-5 py-4 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white shadow-sm">
                {initials}
            </div>
            <div>
                <p className="text-sm font-semibold text-stone-900">{name || 'Utilisateur'}</p>
                <p className="text-xs text-stone-500">{roleLabel} — {user.code}</p>
            </div>
        </div>
    );
}

function buildBanner(user) {
    if (!user) return undefined;
    return <AvatarBanner user={user} />;
}



export default function UserFormCard({
    title,
    cancelHref,
    onSubmit,
    processing,
    fields = [],
    extraFields = [],
    showPassword = false,
    user,
    showDelete = false,
    deleteUrl,
    deleteTitle,
    deleteZoneTitle = 'Zone dangereuse',
    deleteZoneDescription = 'Cette action est irréversible.',
    deleteModalDescription,
    isCreate = false,
}) {
    const [pwOpen, setPwOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    };

    const userName = user ? `${user.first_name} ${user.last_name}` : '';

    return (
        <>
            <div className="mx-auto max-w-5xl space-y-6">
            <FormCard
                title={title}
                cancelHref={cancelHref}
                onSubmit={handleSubmit}
                processing={processing}
                fields={fields}
                extraFields={extraFields}
                extra={
                    !isCreate && showPassword ? (
                        <button
                            type="button"
                            onClick={() => setPwOpen(true)}
                            className="group/btn inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-all duration-200 hover:bg-stone-50 hover:text-stone-900"
                        >
                            <Lock className="h-4 w-4 text-stone-400 transition-colors group-hover/btn:text-indigo-500" />
                            Changer le mot de passe
                        </button>
                    ) : null
                }
                isCreate={isCreate}
                banner={buildBanner(user)}
                showDelete={showDelete && !isCreate}
                deleteUrl={deleteUrl}
                deleteTitle={deleteTitle || 'Supprimer'}
                deleteZoneTitle={deleteZoneTitle}
                deleteZoneDescription={deleteZoneDescription}
                deleteModalDescription={deleteModalDescription || `Êtes-vous sûr de vouloir supprimer "${userName}" ? Cette action est irréversible.`}
            />
            </div>

            {/* Password modal */}
            {!isCreate && pwOpen && (
                <PasswordModal open={pwOpen} onClose={() => setPwOpen(false)} user={user} />
            )}
        </>
    );
}