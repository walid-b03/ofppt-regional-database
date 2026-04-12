import { Link, usePage, router } from '@inertiajs/react';
import { getNavItems, isActive } from '../lib/navigation';
import { useState } from 'react';

export default function Sidebar({ open, onClose }) {
    const { auth } = usePage().props;
    const user = auth?.user ?? {};
    const role = user.role ?? 'FRMT';
    const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';

    const navItems = getNavItems(role);
    const name = `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim();

    const roleLabels = {
        admin: 'Administrateur',
        DRRG: 'Directeur Régional',
        DRCX: 'Directeur de Complexe',
        DRPD: 'Directeur d\'Établissement',
        AGAD: 'Agent Administratif',
        FRMT: 'Formateur',
    };

    return (
        <>
            {/* Mobile overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-stone-900 text-stone-300
                    transform transition-transform duration-300 ease-in-out
                    lg:translate-x-0
                    ${open ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Logo */}
                <div className="flex h-16 shrink-0 items-center justify-center border-b border-white/10 px-6">
                    <img
                        src="/ofppt.svg"
                        alt="OFPPT"
                        className="h-10 w-auto brightness-0 invert"
                    />
                </div>

                {/* Role badge */}
                <div className="px-5 pt-4 pb-3">
                    <div className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2.5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                            {name.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white">{name || 'Utilisateur'}</p>
                            <p className="truncate text-xs text-stone-400">{roleLabels[role] ?? role}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2">
                    {navItems.map((item) => {
                        const active = isActive(currentUrl, item.pattern);
                        return (
                            <Link
                                key={item.route}
                                href={route(item.route)}
                                onClick={() => onClose?.()}
                                className={`
                                    flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                                    ${active
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-stone-300 hover:bg-white/10 hover:text-white'
                                    }
                                `}
                            >
                                <svg
                                    className="h-5 w-5 shrink-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                </svg>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="shrink-0 border-t border-white/10 px-3 py-4">
                    <button
                        onClick={() => {
                            onClose?.();
                            router.post(route('logout'));
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-300 transition-colors hover:bg-red-500/10 hover:text-red-400"
                    >
                        <svg
                            className="h-5 w-5 shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 1 18 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 12 21h6a2.25 2.25 0 0 0 2.25-2.25V15m-3 0-3-3m0 0-3 3m3-3H6" />
                        </svg>
                        Déconnexion
                    </button>
                </div>
            </aside>
        </>
    );
}
