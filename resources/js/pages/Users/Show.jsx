import { Head, Link } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import UserInfoCard, { formatDate } from '../../components/UserInfoCard';
import { Building2, School, Map } from 'lucide-react';
import { MARITAL_OPTIONS, ROLE_LABELS } from '../../lib/constants';
import { getRoutePrefix } from '../../lib/routes';

export default function Show({ user }) {
    const prefix = getRoutePrefix('users', { drrg: 'users', drcx: 'users', drpd: 'users' });

    return (
        <Dashboard title={`${user.first_name} ${user.last_name}`}>
            <Head title={`${user.first_name} ${user.last_name} — OFPPT`} />

            <div className="mx-auto max-w-5xl space-y-6">
                <Link href={`/${prefix}`} className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-indigo-600">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L4.414 10H19a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Retour
                </Link>

                {/* Hero */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 shadow-lg">
                    <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="relative px-6 py-10 sm:px-10 sm:py-14">
                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold text-white ring-1 ring-white/20 backdrop-blur-sm">
                                {`${user.first_name ?? ''} ${user.last_name ?? ''}`.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-white">{user.first_name} {user.last_name}</h2>
                                <p className="text-sm text-indigo-200">{ROLE_LABELS[user.role]} — {user.code}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <UserInfoCard
                        title="Informations personnelles"
                        icon="user"
                        items={[
                            ['CIN', user.cin],
                            ['État civil', user.marital_status && MARITAL_OPTIONS.find(o => o.value === user.marital_status)?.label],
                            ['Nombre d\'enfants', user.children],
                            ['Date de naissance', formatDate(user.date_of_birth)],
                        ]}
                    />
                    <UserInfoCard
                        title="Coordonnées"
                        icon="mail"
                        items={[
                            ['Email', user.email],
                            ['Téléphone', user.phone],
                            ['Adresse', user.address],
                        ]}
                    />
                    <UserInfoCard
                        title="Informations professionnelles"
                        icon="briefcase"
                        items={[
                            ['Diplôme', user.diploma],
                            ['Grade', user.rank],
                            ['Date de recrutement', formatDate(user.date_of_recruitment)],
                        ]}
                    />
                </div>

                {/* Hierarchy */}
                {(user.headed_region || user.headed_complex || user.headed_establishment || user.establishment) && (
                    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                        <div className="flex items-center gap-3 border-b border-stone-100 px-5 py-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                <School className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-semibold text-stone-900">Affectation hiérarchique</h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 px-5 py-5">
                            {user.headed_region && (
                                <>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-4 py-2 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-100">
                                        <Map className="h-3 w-3" /> {user.headed_region.name}
                                    </span>
                                    <svg className="h-4 w-4 text-stone-300" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </>
                            )}
                            {user.headed_complex && (
                                <>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-4 py-2 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-100">
                                        <School className="h-3 w-3" /> {user.headed_complex.name}
                                    </span>
                                    <svg className="h-4 w-4 text-stone-300" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </>
                            )}
                            {user.headed_establishment && (
                                <>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-4 py-2 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-100">
                                        <Building2 className="h-3 w-3" /> {user.headed_establishment.name}
                                    </span>
                                </>
                            )}
                            {user.establishment && !user.headed_establishment && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-4 py-2 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-100">
                                    <Building2 className="h-3 w-3" /> {user.establishment.name}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Dashboard>
    );
}
