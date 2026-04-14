import { Head, Link } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import UserInfoCard from '../../components/UserInfoCard';
import { getRoutePrefix } from '../../lib/routes';

const TYPE_LABELS = { Diplomante: 'Diplomante', Qualifiante: 'Qualifiante' };
const LEVEL_LABELS = { Qualification: 'Qualification', 'Spécialisation': 'Spécialisation', Technicien: 'Technicien', 'Technicien Spécialisé': 'Technicien Spécialisé' };

export default function Show({ training }) {
    const prefix = getRoutePrefix('trainings');

    return (
        <Dashboard title={`Formation — ${training.name}`}>
            <Head title={`${training.name} — OFPPT`} />

            <div className="mx-auto max-w-5xl space-y-6">
                <Link href={`/${prefix}`} className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-indigo-600">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L4.414 10H19a1 1 0 110 2H4.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Retour
                </Link>

                {/* Hero */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 shadow-lg">
                    <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="relative px-6 py-10 sm:px-10 sm:py-14">
                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold text-white ring-1 ring-white/20 backdrop-blur-sm">
                                {training.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-white">{training.name}</h2>
                                <p className="text-sm text-emerald-200">{training.code}</p>
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
                            ['Code', training.code],
                            ['Nom', training.name],
                            ['Type', training.type && TYPE_LABELS[training.type]],
                            ['Niveau', training.level && LEVEL_LABELS[training.level]],
                            ['Tronc commun', training.is_trunk ? 'Oui' : 'Non'],
                            ['Durée', training.duration ? `${training.duration} mois` : null],
                        ]}
                    />
                    <UserInfoCard
                        title="Établissement"
                        icon="briefcase"
                        items={[
                            ['Établissement', training.establishment?.name],
                        ]}
                    />
                    {training.description && (
                        <UserInfoCard
                            title="Description"
                            icon="mail"
                            items={[
                                ['Description', training.description],
                            ]}
                        />
                    )}
                </div>
            </div>
        </Dashboard>
    );
}
