import {
    Map, School, Building2, Users, GraduationCap, Package, DoorOpen,
} from 'lucide-react';

export function getNavItems(role, user) {
    const baseItems = {
        admin: [
            { label: 'Régions',        icon: Map,        href: '/regions' },
            { label: 'Complexes',      icon: School,     href: '/complexes' },
            { label: 'Établissements', icon: Building2,  href: '/establishments' },
            { label: 'Personnel',      icon: Users,      href: '/users' },
            { label: 'Formations',     icon: GraduationCap, href: '/trainings' },
            { label: 'Actifs',         icon: Package,    href: '/assets' },
            { label: 'Salles',         icon: DoorOpen,   href: '/rooms' },
        ],
        DRRG: [
            { label: 'Ma Région',        icon: Map,        href: `/regions/${user?.headedRegion?.id ?? ''}` },
            { label: 'Mes Complexes',    icon: School,     href: '/complexes' },
            { label: 'Mes Établissements', icon: Building2, href: '/establishments' },
            { label: 'Mon Personnel',  icon: Users,      href: '/users' },
            { label: 'Mes Formations',   icon: GraduationCap, href: '/trainings' },
            { label: 'Mes Actifs',       icon: Package,    href: '/assets' },
            { label: 'Mes Salles',       icon: DoorOpen,   href: '/rooms' },
        ],
        DRCX: [
            { label: 'Mon Complexe',     icon: School,     href: `/complexes/${user?.headedComplex?.id ?? ''}` },
            { label: 'Mes Établissements', icon: Building2, href: '/establishments' },
            { label: 'Mon Personnel',  icon: Users,      href: '/users' },
            { label: 'Mes Formations',   icon: GraduationCap, href: '/trainings' },
            { label: 'Mes Actifs',       icon: Package,    href: '/assets' },
            { label: 'Mes Salles',       icon: DoorOpen,   href: '/rooms' },
        ],
        DRPD: [
            { label: 'Mon Établissement', icon: Building2, href: `/establishments/${user?.headedEstablishment?.id ?? ''}` },
            { label: 'Mon Personnel',  icon: Users,      href: '/users' },
            { label: 'Mes Formations',   icon: GraduationCap, href: '/trainings' },
            { label: 'Mes Actifs',       icon: Package,    href: '/assets' },
            { label: 'Mes Salles',       icon: DoorOpen,   href: '/rooms' },
        ],
        AGAD: [
            { label: 'Formations',   icon: GraduationCap, href: '/trainings' },
            { label: 'Actifs',       icon: Package,    href: '/assets' },
            { label: 'Salles',       icon: DoorOpen,   href: '/rooms' },
        ],
        FRMT: [],
    };

    return baseItems[role] ?? [];
}

export function isActive(url, href) {
    return url === href || url.startsWith(href + '/') || url.startsWith(href + '?');
}

