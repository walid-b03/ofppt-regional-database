import { Head, Link } from '@inertiajs/react';
import Dashboard from '../../layouts/Dashboard';
import UserInfoCard, { formatDate } from '../../components/UserInfoCard';
import { MARITAL_OPTIONS, RANK_OPTIONS, ROLE_LABELS } from '../../lib/constants';
import { Pencil } from 'lucide-react';

export default function Show({ user }) {
    const data = user ?? {};
    const name = `${data.first_name ?? ''} ${data.last_name ?? ''}`.trim();
    const roleLabel = data.role_label ?? data.role ?? '';

    return (
        <Dashboard title={`${name} — Détails`}>
            <Head title={`${name} — OFPPT`} />

            <div className="mx-auto max-w-5xl space-y-6">

                {/* ── Hero Card ── */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 shadow-lg">
                    <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
                    <div className="pointer-events-none absolute top-1/2 left-1/3 h-40 w-40 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />

                    <div className="relative px-6 py-10 sm:px-10 sm:py-14">
                        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-3xl font-bold text-white ring-1 ring-white/20 backdrop-blur-sm">
                                {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'}
                            </div>

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
                                        {data.code}
                                    </span>
                                </div>
                            </div>

                            <Link
                                href={`/users/${data.id}/edit`}
                                className="group/btn inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-2.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                                <Pencil className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                                Modifier
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
                            ['CIN', data.cin],
                            ['État civil', data.marital_status && MARITAL_OPTIONS.find(o => o.value === data.marital_status)?.label],
                            ["Nombre d'enfants", data.children],
                            ['Date de naissance', formatDate(data.date_of_birth)],
                        ]}
                    />
                    <UserInfoCard
                        title="Coordonnées"
                        icon="mail"
                        items={[
                            ['Email', data.email],
                            ['Téléphone', data.phone],
                            ['Adresse', data.address],
                        ]}
                    />
                    <UserInfoCard
                        title="Informations professionnelles"
                        icon="briefcase"
                        items={[
                            ['Diplôme', data.diploma],
                            ['Grade', data.rank && RANK_OPTIONS.find(o => o.value === data.rank)?.label],
                            ['Date de recrutement', formatDate(data.date_of_recruitment)],
                            ['Fonction', data.role_label],
                        ]}
                    />
                </div>
            </div>
        </Dashboard>
    );
}