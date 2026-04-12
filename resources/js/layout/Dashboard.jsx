import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Sidebar from '../components/Sidebar';

export default function Dashboard({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth } = usePage().props;
    const user = auth?.user ?? {};
    const name = `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim();

    return (
        <div className="min-h-screen bg-stone-100">
            {/* Sidebar */}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main content */}
            <div className="lg:pl-72">
                {/* Top bar */}
                <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-stone-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-stone-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>

                    {/* Separator */}
                    <div className="h-6 w-px bg-stone-200 lg:hidden" />

                    {/* Page title */}
                    <h1 className="flex-1 text-base font-semibold leading-6 text-stone-900">
                        {title}
                    </h1>

                    {/* User info */}
                    <div className="flex items-center gap-x-3">
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm font-medium text-stone-900">{name || 'Utilisateur'}</p>
                            <p className="text-xs text-stone-500">{user.role ?? ''}</p>
                        </div>
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                            {name.charAt(0).toUpperCase() || '?'}
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
