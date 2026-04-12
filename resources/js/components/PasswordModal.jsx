import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from './Modal';
import { Lock, Eye, EyeOff } from 'lucide-react';

/**
 * Password change modal — two modes:
 *
 * 1. **Self** (default): requires current password → `PUT /profile/password`
 * 2. **Reset** (superior resetting another user): no current password → `PUT /users/{user}/password-reset`
 *
 * @param {Object}   props
 * @param {boolean}  props.open
 * @param {Function} props.onClose
 * @param {Object}   [props.user]       — target user (omit for self)
 * @param {string}   [props.actionUrl]  — override the submit URL entirely
 */
export default function PasswordModal({ open, onClose, user, actionUrl }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: user ? '' : '',
        password: '',
        password_confirmation: '',
    });

    const [show, setShow] = useState({ current: false, new: false, confirm: false });

    const isReset = !!user;

    function handleSubmit(e) {
        e.preventDefault();
        const url = actionUrl ?? (isReset
            ? `/users/${user.id}/password-reset`
            : '/profile/password'
        );
        put(url, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    }

    const pwFields = isReset
        ? [
              { key: 'password', label: 'Nouveau mot de passe', show: show.new, toggle: () => setShow(s => ({ ...s, new: !s.new })) },
              { key: 'password_confirmation', label: 'Confirmer le mot de passe', show: show.confirm, toggle: () => setShow(s => ({ ...s, confirm: !s.confirm })) },
          ]
        : [
              { key: 'current_password', label: 'Mot de passe actuel', show: show.current, toggle: () => setShow(s => ({ ...s, current: !s.current })) },
              { key: 'password', label: 'Nouveau mot de passe', show: show.new, toggle: () => setShow(s => ({ ...s, new: !s.new })) },
              { key: 'password_confirmation', label: 'Confirmer le mot de passe', show: show.confirm, toggle: () => setShow(s => ({ ...s, confirm: !s.confirm })) },
          ];

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={isReset ? 'Réinitialiser le mot de passe' : 'Changer le mot de passe'}
            description={isReset
                ? `Définissez un nouveau mot de passe pour ${user.first_name} ${user.last_name}`
                : 'Entrez votre mot de passe actuel puis choisissez-en un nouveau'
            }
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                {pwFields.map(({ key, label, show, toggle }) => (
                    <div key={key} className="space-y-1.5">
                        <label htmlFor={key} className="block text-sm font-medium text-stone-700">
                            {label}
                        </label>
                        <div className="group/input relative">
                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400 transition group-focus-within/input:text-indigo-600">
                                <Lock className="h-4 w-4" />
                            </span>
                            <input
                                id={key}
                                type={show ? 'text' : 'password'}
                                value={data[key]}
                                onChange={(e) => setData(key, e.target.value)}
                                placeholder="••••••••"
                                className={`block w-full rounded-xl border bg-white py-2.5 pl-11 pr-12 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-stone-300 ${errors[key] ? 'border-red-400 bg-red-50' : 'border-stone-200 focus:border-indigo-500'}`}
                            />
                            <button
                                type="button"
                                onClick={toggle}
                                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-stone-400 transition-colors hover:text-indigo-600 focus:outline-none"
                            >
                                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {errors[key] && <p className="text-xs text-red-500">{errors[key]}</p>}
                    </div>
                ))}

                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-all duration-200 hover:bg-stone-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-700 hover:shadow-indigo-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
                    >
                        {processing ? (
                            <>
                                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Modification...
                            </>
                        ) : (isReset ? 'Réinitialiser' : 'Modifier le mot de passe')}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
