import { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import Sidebar from '../components/Sidebar';
import { Menu, ChevronRight } from 'lucide-react';

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
                <header className="sticky top-0 z-30 flex h-20 shrink-0 items-center gap-x-4 border-b border-stone-200 bg-white/80 px-4 shadow-sm backdrop-blur-lg sm:gap-x-6 sm:px-6 lg:px-8">
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

                    {/* User banner */}
                    <Link
                        href="/profile"
                        className="group flex items-center gap-x-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-stone-100"
                    >
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm font-medium text-stone-700 group-hover:text-stone-900">{name || 'Utilisateur'}</p>
                            <p className="text-[11px] text-stone-400">{user.role_label ?? user.role ?? ''} — {user.code}</p>
                        </div>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white shadow-sm transition-transform group-hover:scale-105">
                            {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'}
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 text-stone-400 transition-colors group-hover:text-stone-600" />
                    </Link>
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
