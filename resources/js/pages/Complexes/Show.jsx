import { Head, Link } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import UserInfoCard from '../../components/UserInfoCard';
import { Building2 } from 'lucide-react';
import { getRoutePrefix } from '../../lib/routes';

export default function Show({ complex }) {
    const prefix = getRoutePrefix('complexes', { drrg: 'complexes', drcx: 'complex' });

    return (
        <Dashboard title={`Complexe — ${complex.name}`}>
            <Head title={`${complex.name} — OFPPT`} />

            <div className="mx-auto max-w-5xl space-y-6">
                <Link
                    href={`/${prefix}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-indigo-600"
                >
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L4.414 10H19a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Retour
                </Link>

                {/* Hero */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-600 shadow-lg">
                    <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="relative px-6 py-10 sm:px-10 sm:py-14">
                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold text-white ring-1 ring-white/20 backdrop-blur-sm">
                                {complex.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-white">{complex.name}</h2>
                                <p className="text-sm text-violet-200">{complex.code}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <UserInfoCard
                        title="Informations"
                        icon="user"
                        items={[
                            ['Code', complex.code],
                            ['Nom', complex.name],
                            ['Région', complex.region?.name],
                            ['Responsable', complex.head ? `${complex.head.first_name} ${complex.head.last_name}` : null],
                        ]}
                    />
                    <UserInfoCard
                        title="Coordonnées"
                        icon="mail"
                        items={[
                            ['Email', complex.email],
                            ['Téléphone', complex.phone],
                            ['Ville', complex.location],
                        ]}
                    />
                </div>

                {/* Establishments */}
                {complex.establishments && complex.establishments.length > 0 && (
                    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                        <div className="flex items-center gap-3 border-b border-stone-100 px-5 py-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                <Building2 className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-semibold text-stone-900">
                                Établissements ({complex.establishments.length})
                            </h3>
                        </div>
                        <div className="divide-y divide-stone-50">
                            {complex.establishments.map(e => (
                                <div key={e.id} className="flex items-center justify-between px-5 py-3">
                                    <div>
                                        <p className="text-sm font-medium text-stone-800">{e.name}</p>
                                        <p className="text-xs text-stone-400">{e.code}</p>
                                    </div>
                                    <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500">
                                        {e.code}
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
