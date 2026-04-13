import { Head, Link } from '@inertiajs/react';
import Dashboard from '../layout/Dashboard';
import UserInfoCard, { formatDate } from '../components/UserInfoCard';
import { Globe, Pencil } from 'lucide-react';

const MARITAL_OPTIONS = [
    { value: 'single', label: 'Célibataire' },
    { value: 'married', label: 'Marié(e)' },
    { value: 'divorced', label: 'Divorcé(e)' },
    { value: 'widowed', label: 'Veuf(ve)' },
];

const RANK_OPTIONS = [
    { value: 'A1', label: 'A1' },
    { value: 'A2', label: 'A2' },
    { value: 'A3', label: 'A3' },
];

export default function Profile({ user: serverUser }) {
    const user = serverUser ?? {};
    const name = `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim();
    const roleLabel = user.role_label ?? user.role ?? '';

    return (
        <Dashboard title="Mon Profil">
            <Head title="Mon Profil — OFPPT" />

            <div className="mx-auto max-w-5xl space-y-6">

                {/* ── Hero Card ── */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 shadow-lg">
                    {/* Decorative blobs */}
                    <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
                    <div className="pointer-events-none absolute top-1/2 left-1/3 h-40 w-40 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />

                    <div className="relative px-6 py-10 sm:px-10 sm:py-14">
                        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                            {/* Avatar */}
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-3xl font-bold text-white ring-1 ring-white/20 backdrop-blur-sm">
                                {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'}
                            </div>

                            {/* Name + role */}
                            <div className="flex-1 space-y-2">
                                <h2 className="text-2xl font-bold tracking-tight text-white">
                                    {name || 'Utilisateur'}
                                </h2>
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-indigo-100 backdrop-blur-sm">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                        {roleLabel}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-indigo-100 backdrop-blur-sm">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                        {user.code}
                                    </span>
                                </div>
                            </div>

                            {/* CTA — goes to edit page */}
                            <Link
                                href="/profile/edit"
                                className="group/btn inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-2.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                                <Pencil className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                                Modifier le profil
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── Info Cards ── */}
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
                            ['Grade', user.rank && RANK_OPTIONS.find(o => o.value === user.rank)?.label],
                            ['Date de recrutement', formatDate(user.date_of_recruitment)],
                            ['Fonction', user.role_label],
                        ]}
                    />
                </div>

                {/* ── Establishment Chain ── */}
                {user.establishment && (
                    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                        <div className="flex items-center gap-3 border-b border-stone-100 px-5 py-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                <Globe className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-semibold text-stone-900">Affectation hiérarchique</h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 px-5 py-5 text-xs font-medium">
                            {user.establishment.complex?.region && (
                                <>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-4 py-2 text-indigo-700 ring-1 ring-inset ring-indigo-100">
                                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                        {user.establishment.complex.region.name}
                                    </span>
                                    <svg className="h-4 w-4 text-stone-300" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </>
                            )}
                            {user.establishment.complex && (
                                <>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-4 py-2 text-violet-700 ring-1 ring-inset ring-violet-100">
                                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                                        {user.establishment.complex.name}
                                    </span>
                                    <svg className="h-4 w-4 text-stone-300" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </>
                            )}
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-4 py-2 text-amber-700 ring-1 ring-inset ring-amber-100">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                {user.establishment.name}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </Dashboard>
    );
}
