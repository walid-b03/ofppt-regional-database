import { Head, Link } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import UserInfoCard from '../../components/UserInfoCard';
import { Users } from 'lucide-react';
import { getRoutePrefix } from '../../lib/routes';

export default function Show({ establishment }) {
    const prefix = getRoutePrefix('establishments', { drrg: 'establishments', drcx: 'establishments', drpd: 'establishment' });

    return (
        <Dashboard title={`Établissement — ${establishment.name}`}>
            <Head title={`${establishment.name} — OFPPT`} />

            <div className="mx-auto max-w-5xl space-y-6">
                <Link href={`/${prefix}`} className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-indigo-600">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L4.414 10H19a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Retour
                </Link>

                {/* Hero */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 via-amber-500 to-orange-500 shadow-lg">
                    <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="relative px-6 py-10 sm:px-10 sm:py-14">
                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold text-white ring-1 ring-white/20 backdrop-blur-sm">
                                {establishment.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-white">{establishment.name}</h2>
                                <p className="text-sm text-amber-100">{establishment.code}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <UserInfoCard
                        title="Informations"
                        icon="user"
                        items={[
                            ['Code', establishment.code],
                            ['Nom', establishment.name],
                            ['Complexe', establishment.complex?.name],
                            ['Secteur', establishment.sector],
                            ['Type', establishment.type],
                            ['Responsable', establishment.head ? `${establishment.head.first_name} ${establishment.head.last_name}` : null],
                        ]}
                    />
                    <UserInfoCard
                        title="Coordonnées"
                        icon="mail"
                        items={[
                            ['Email', establishment.email],
                            ['Téléphone', establishment.phone],
                            ['Adresse', establishment.address],
                        ]}
                    />
                </div>

                {/* Users */}
                {establishment.users && establishment.users.length > 0 && (
                    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                        <div className="flex items-center gap-3 border-b border-stone-100 px-5 py-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                <Users className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-semibold text-stone-900">
                                Utilisateurs ({establishment.users.length})
                            </h3>
                        </div>
                        <div className="divide-y divide-stone-50">
                            {establishment.users.map(u => (
                                <div key={u.id} className="flex items-center justify-between px-5 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-stone-800">{u.first_name} {u.last_name}</p>
                                        <p className="text-xs text-stone-400">{u.code} — {u.role_label}</p>
                                    </div>
                                    <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500">
                                        {u.code}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Dashboard>
    );
}
