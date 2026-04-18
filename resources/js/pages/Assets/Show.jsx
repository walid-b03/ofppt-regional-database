import { Head, Link } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import UserInfoCard from '../../components/UserInfoCard';
import { Pencil, Package, MapPin } from 'lucide-react';

const STATE_COLORS = {
    'Actif': 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    'Inactif': 'bg-stone-100 text-stone-600 ring-stone-200',
    'Endommagé': 'bg-red-50 text-red-700 ring-red-100',
    'Perdu': 'bg-amber-50 text-amber-700 ring-amber-100',
};

export default function Show({ asset }) {
    const data = asset ?? {};

    return (
        <Dashboard title={`${data.name} — Détails`}>
            <Head title={`${data.name} — OFPPT`} />

            <div className="mx-auto max-w-5xl space-y-6">

                {/* ── Hero Card ── */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 shadow-lg">
                    <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
                    <div className="pointer-events-none absolute top-1/2 left-1/3 h-40 w-40 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />

                    <div className="relative px-6 py-10 sm:px-10 sm:py-14">
                        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-3xl font-bold text-white ring-1 ring-white/20 backdrop-blur-sm">
                                {data.name?.slice(0, 2).toUpperCase() || '?'}
                            </div>

                            <div className="flex-1 space-y-2">
                                <h2 className="text-2xl font-bold tracking-tight text-white">
                                    {data.name || 'Actif'}
                                </h2>
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-sky-100 backdrop-blur-sm">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                        {data.code}
                                    </span>
                                    {data.type && (
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-sky-100 backdrop-blur-sm">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                            {data.type}
                                        </span>
                                    )}
                                    {data.state && (
                                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${STATE_COLORS[data.state] || 'bg-stone-100 text-stone-600'}`}>
                                            {data.state}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <Link
                                href={`/assets/${data.id}/edit`}
                                className="group/btn inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-2.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                                <Pencil className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                                Modifier
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── Info Cards ── */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <UserInfoCard
                        title="Détails"
                        icon="hash"
                        items={[
                            ['Code', data.code],
                            ['Nom', data.name],
                            ['Type', data.type],
                            ['État', data.state],
                        ]}
                    />
                    <UserInfoCard
                        title="Description"
                        icon="briefcase"
                        items={[
                            ['Description', data.description],
                            ['Notes', data.notes],
                        ]}
                    />
                </div>

                {/* ── Establishment ── */}
                {data.establishment && (
                    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                        <div className="flex items-center gap-3 border-b border-stone-100 px-5 py-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                                <MapPin className="h-4 w-4" />
                            </div>
                            <h3 className="text-sm font-semibold text-stone-900">Établissement</h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 px-5 py-5 text-xs font-medium">
                            <Link
                                href={`/establishments/${data.establishment.id}`}
                                className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-4 py-2 text-amber-700 ring-1 ring-inset ring-amber-100 hover:bg-amber-100"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                {data.establishment.name}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </Dashboard>
    );
}