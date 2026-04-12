import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

export default function Dashboard({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth } = usePage().props;
    const user = auth?.user ?? {};
    const name = `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim();

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Sidebar */}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main content */}
            <div className="lg:pl-72">
                {/* Top bar */}
                <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-stone-200 bg-white/80 px-4 shadow-sm backdrop-blur-lg sm:gap-x-6 sm:px-6 lg:px-8">
                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-stone-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Ouvrir le menu</span>
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Separator */}
                    <div className="h-6 w-px bg-stone-200 lg:hidden" />

                    {/* Page title */}
                    <h1 className="flex-1 text-base font-semibold leading-6 text-stone-900">
                        {title}
                    </h1>

                    {/* User mini info */}
                    <div className="flex items-center gap-x-2.5">
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm font-medium text-stone-700">{name || 'Utilisateur'}</p>
                            <p className="text-[11px] text-stone-400">{user.role_description ?? user.role ?? ''} — {user.code}</p>
                        </div>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white shadow-sm">
                            {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'}
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="py-8">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
