import { User, Mail, Phone, MapPin, Calendar, Hash, Heart, Users, Award, Briefcase, Pencil } from 'lucide-react';

const ICO = {
    user: User,
    mail: Mail,
    phone: Phone,
    mapPin: MapPin,
    calendar: Calendar,
    hash: Hash,
    heart: Heart,
    users: Users,
    award: Award,
    briefcase: Briefcase,
};

export const ICON_MAP = {
    first_name: User, last_name: User, cin: Hash,
    marital_status: Heart, children: Users, email: Mail,
    phone: Phone, address: MapPin, date_of_birth: Calendar,
    date_of_recruitment: Briefcase, site_of_recruitment: MapPin, diploma: Award, rank: Award,
    role_label: Briefcase,
};

export const LABEL_MAP = {
    first_name: 'Prénom', last_name: 'Nom', cin: 'CIN', code: 'Code',
    marital_status: 'État civil', children: 'Nombre d\'enfants',
    email: 'Email', phone: 'Téléphone', address: 'Adresse',
    date_of_birth: 'Date de naissance', date_of_recruitment: 'Date de recrutement',
    site_of_recruitment: 'Site de recrutement', diploma: 'Diplôme', rank: 'Grade', role_label: 'Fonction', role: 'Rôle',
};

export function formatDate(val) {
    if (!val) return null;
    return new Date(val).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function UserInfoCard({ title, icon, badge, items, onEdit }) {
    const IconEl = ICO[icon] || User;
    const hasData = items.some(([, v]) => v);

    return (
        <div className="group relative overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition hover:border-stone-300 hover:shadow">
            {/* Accent bar */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <IconEl className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-stone-900">{title}</h3>
                </div>
                <div className="flex items-center gap-2">
                    {badge && (
                        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium text-indigo-700">
                            {badge}
                        </span>
                    )}
                    {onEdit && (
                        <button
                            onClick={onEdit}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 opacity-0 transition group-hover:opacity-100 hover:bg-stone-100 hover:text-stone-600"
                            title="Modifier"
                        >
                            <Pencil className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-stone-50">
                {hasData
                    ? items
                          .filter(([, v]) => v)
                          .map(([label, value]) => (
                              <div
                                  key={label}
                                  className="flex items-center justify-between px-5 py-3"
                              >
                                  <span className="text-sm text-stone-500">{label}</span>
                                  <span className="text-sm font-medium text-stone-800">
                                      {value}
                                  </span>
                              </div>
                          ))
                    : (
                        <div className="px-5 py-6 text-center text-sm text-stone-400">
                            Aucune information renseignée
                        </div>
                    )}
            </div>
        </div>
    );
}
