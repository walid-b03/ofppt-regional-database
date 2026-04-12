import { Link, usePage, router } from '@inertiajs/react';
import { getNavItems, isActive } from '../lib/navigation';
import { LogOut, ChevronRight } from 'lucide-react';

export default function Sidebar({ open, onClose }) {
    const { auth } = usePage().props;
    const user = auth?.user ?? {};
    const role = user.role ?? 'FRMT';
    const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';

    const navItems = getNavItems(role);
    const name = `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim();
    const roleLabel = user.role_description ?? role;

    return (
        <>
            {/* Mobile overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-stone-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-stone-50
                    transform transition-transform duration-300 ease-in-out
                    lg:translate-x-0 border-r border-stone-200
                    ${open ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* ── Header ── */}
                <div className="flex h-20 shrink-0 items-center gap-3 border-b border-stone-200 bg-white px-5">
                    <img
                        src="/ofppt.svg"
                        alt="OFPPT"
                        className="h-20 w-auto"
                    />
                    <div className="h-5 w-px bg-stone-200" />
                    <span className="text-xs font-semibold tracking-wider uppercase text-stone-500">Portail</span>
                </div>

                {/* ── User Card ── */}
                <div className="px-4 pt-4">
                    <Link
                        href="/profile"
                        onClick={() => onClose?.()}
                        className="group flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-3 shadow-sm transition-all duration-200 hover:border-stone-300 hover:shadow"
                    >
                        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                            {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-stone-900 group-hover:text-indigo-700 transition-colors">
                                {name || 'Utilisateur'}
                            </p>
                            <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <span className="truncate text-[11px] font-medium text-stone-500">{roleLabel} — {user.code}</span>
                            </div>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 text-stone-400 transition-colors group-hover:text-indigo-500" />
                    </Link>
                </div>

                {/* ── Navigation ── */}
                <nav className="flex-1 overflow-y-auto px-4 py-5">
                    {navItems.length > 0 && (
                        <>
                            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
                                Navigation
                            </p>
                            <div className="space-y-0.5">
                        {navItems.map((item) => {
                            const active = isActive(currentUrl, item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => onClose?.()}
                                    className={`
                                        group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
                                        ${active
                                            ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-inset ring-indigo-100'
                                            : 'text-stone-600 hover:bg-white hover:text-stone-900 hover:shadow-sm'
                                        }
                                    `}
                                >
                                    {/* Active indicator */}
                                    {active && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-indigo-600" />
                                    )}

                                    {/* Icon container */}
                                    <div className={`
                                        flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200
                                        ${active
                                            ? 'bg-indigo-100 text-indigo-600'
                                            : 'bg-stone-100 text-stone-400 group-hover:bg-stone-200 group-hover:text-stone-600'
                                        }
                                    `}>
                                        <item.icon className="h-4 w-4" />
                                    </div>

                                    <span className="transition-colors">
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                        </>
                    )}
                </nav>

                {/* ── Footer / Logout ── */}
                <div className="shrink-0 border-t border-stone-200 bg-white px-4 py-4">
                    <button
                        onClick={() => {
                            onClose?.();
                            router.post('/logout');
                        }}
                        className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
                    >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-400 transition-all duration-200 group-hover:bg-red-100 group-hover:text-red-500">
                            <LogOut className="h-4 w-4" />
                        </div>
                        Déconnexion
                    </button>
                </div>
            </aside>
        </>
    );
}
