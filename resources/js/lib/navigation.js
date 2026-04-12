/**
 * Role-based sidebar navigation configuration.
 *
 * Each role maps to an array of nav items with:
 *   - label:  display text
 *   - icon:   lucide-react icon component (rendered directly)
 *   - href:   URL path (used for navigation AND active matching)
 */

import {
    Map, School, Building2, Users, GraduationCap, Package, DoorOpen,
} from 'lucide-react';

const NAVIGATION = {
    admin: [
        { label: 'Régions',        icon: Map,        href: '/admin/regions' },
        { label: 'Complexes',      icon: School,     href: '/admin/complexes' },
        { label: 'Établissements', icon: Building2,  href: '/admin/establishments' },
        { label: 'Utilisateurs',   icon: Users,      href: '/admin/users' },
        { label: 'Formations',     icon: GraduationCap, href: '/admin/trainings' },
        { label: 'Actifs',         icon: Package,    href: '/admin/assets' },
        { label: 'Salles',         icon: DoorOpen,   href: '/admin/rooms' },
    ],
    DRRG: [
        { label: 'Ma Région',        icon: Map,        href: '/drrg/region' },
        { label: 'Mes Complexes',    icon: School,     href: '/drrg/complexes' },
        { label: 'Mes Établissements', icon: Building2, href: '/drrg/establishments' },
        { label: 'Mes Utilisateurs', icon: Users,      href: '/drrg/users' },
        { label: 'Mes Formations',   icon: GraduationCap, href: '/drrg/trainings' },
        { label: 'Mes Actifs',       icon: Package,    href: '/drrg/assets' },
        { label: 'Mes Salles',       icon: DoorOpen,   href: '/drrg/rooms' },
    ],
    DRCX: [
        { label: 'Mon Complexe',     icon: School,     href: '/drcx/complex' },
        { label: 'Mes Établissements', icon: Building2, href: '/drcx/establishments' },
        { label: 'Mes Utilisateurs', icon: Users,      href: '/drcx/users' },
        { label: 'Mes Formations',   icon: GraduationCap, href: '/drcx/trainings' },
        { label: 'Mes Actifs',       icon: Package,    href: '/drcx/assets' },
        { label: 'Mes Salles',       icon: DoorOpen,   href: '/drcx/rooms' },
    ],
    DRPD: [
        { label: 'Mon Établissement', icon: Building2, href: '/drpd/establishment' },
        { label: 'Mes Utilisateurs', icon: Users,      href: '/drpd/users' },
        { label: 'Mes Formations',   icon: GraduationCap, href: '/drpd/trainings' },
        { label: 'Mes Actifs',       icon: Package,    href: '/drpd/assets' },
        { label: 'Mes Salles',       icon: DoorOpen,   href: '/drpd/rooms' },
    ],
    AGAD: [
        { label: 'Formations',   icon: GraduationCap, href: '/agad/trainings' },
        { label: 'Actifs',       icon: Package,    href: '/agad/assets' },
        { label: 'Salles',       icon: DoorOpen,   href: '/agad/rooms' },
    ],
    FRMT: [],
};

export function getNavItems(role) {
    return NAVIGATION[role] ?? [];
}

export function isActive(url, href) {
    return url.includes(href.slice(1));
}
