/**
 * Role-based sidebar navigation configuration.
 *
 * Each role maps to an array of nav items with:
 *   - label:    display text
 *   - icon:     SVG path (Heroicons outline, 24x24)
 *   - route:    Inertia route name to navigate to
 *   - active:   fn(url) => bool  (determines active state)
 */

const ICONS = {
    profile:    'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z',
    region:     'M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z',
    complex:    'M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 10.5h13.5a3 3 0 0 1 2.977 2.625l.073.695H5.25a4.492 4.492 0 0 1-.398-.577l-.073-.695A3 3 0 0 1 5.25 10.5Zm-2.977 3.375.073.695A3 3 0 0 0 5.25 16.5h.198a4.5 4.5 0 0 1-.398-.577l-.073-.695A3 3 0 0 0 5.25 12.75H2.273ZM9 19.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 22.5v-3Z',
    establishment: 'M12 21v-8.25M15.75 12.75a.75.75 0 0 0 .75-.75 4.5 4.5 0 0 0-4.5-4.5 4.5 4.5 0 0 0-4.5 4.5.75.75 0 0 0 .75.75M9.75 21h4.5M3.75 9h.75a2.25 2.25 0 0 1 2.25 2.25v3a2.25 2.25 0 0 1-2.25 2.25H3.75a2.25 2.25 0 0 1-2.25-2.25v-3A2.25 2.25 0 0 1 3.75 9ZM18 9h.75a2.25 2.25 0 0 1 2.25 2.25v3a2.25 2.25 0 0 1-2.25 2.25H18a2.25 2.25 0 0 1-2.25-2.25v-3A2.25 2.25 0 0 1 18 9Z',
    user:       'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z',
    training:   'M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5',
    asset:      'M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z',
    room:       'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21',
};

const matchRoute = (currentUrl, routePattern) => {
    return currentUrl.includes(routePattern);
};

const NAVIGATION = {
    admin: [
        { label: 'Regions',        icon: ICONS.region,         route: 'admin.regions.index',      pattern: 'admin/regions' },
        { label: 'Complexes',      icon: ICONS.complex,        route: 'admin.complexes.index',    pattern: 'admin/complexes' },
        { label: 'Establishments', icon: ICONS.establishment,  route: 'admin.establishments.index', pattern: 'admin/establishments' },
        { label: 'Users',          icon: ICONS.user,           route: 'admin.users.index',        pattern: 'admin/users' },
        { label: 'Trainings',      icon: ICONS.training,       route: 'admin.trainings.index',    pattern: 'admin/trainings' },
        { label: 'Assets',         icon: ICONS.asset,          route: 'admin.assets.index',       pattern: 'admin/assets' },
        { label: 'Rooms',          icon: ICONS.room,           route: 'admin.rooms.index',        pattern: 'admin/rooms' },
    ],
    DRRG: [
        { label: 'Profile',        icon: ICONS.profile,        route: 'profile.show',             pattern: 'profile' },
        { label: 'Ma Région',      icon: ICONS.region,         route: 'drrg.region.show',         pattern: 'drrg/region' },
        { label: 'Mes Complexes',  icon: ICONS.complex,        route: 'drrg.complexes.index',     pattern: 'drrg/complexes' },
        { label: 'Mes Établissements', icon: ICONS.establishment, route: 'drrg.establishments.index', pattern: 'drrg/establishments' },
        { label: 'Mes Utilisateurs', icon: ICONS.user,         route: 'drrg.users.index',         pattern: 'drrg/users' },
        { label: 'Mes Formations', icon: ICONS.training,       route: 'drrg.trainings.index',     pattern: 'drrg/trainings' },
        { label: 'Mes Actifs',     icon: ICONS.asset,          route: 'drrg.assets.index',        pattern: 'drrg/assets' },
        { label: 'Mes Salles',     icon: ICONS.room,           route: 'drrg.rooms.index',         pattern: 'drrg/rooms' },
    ],
    DRCX: [
        { label: 'Profile',        icon: ICONS.profile,        route: 'profile.show',             pattern: 'profile' },
        { label: 'Mon Complexe',   icon: ICONS.complex,        route: 'drcx.complex.show',        pattern: 'drcx/complex' },
        { label: 'Mes Établissements', icon: ICONS.establishment, route: 'drcx.establishments.index', pattern: 'drcx/establishments' },
        { label: 'Mes Utilisateurs', icon: ICONS.user,         route: 'drcx.users.index',         pattern: 'drcx/users' },
        { label: 'Mes Formations', icon: ICONS.training,       route: 'drcx.trainings.index',     pattern: 'drcx/trainings' },
        { label: 'Mes Actifs',     icon: ICONS.asset,          route: 'drcx.assets.index',        pattern: 'drcx/assets' },
        { label: 'Mes Salles',     icon: ICONS.room,           route: 'drcx.rooms.index',         pattern: 'drcx/rooms' },
    ],
    DRPD: [
        { label: 'Profile',        icon: ICONS.profile,        route: 'profile.show',             pattern: 'profile' },
        { label: 'Mon Établissement', icon: ICONS.establishment, route: 'drpd.establishment.show', pattern: 'drpd/establishment' },
        { label: 'Mes Utilisateurs', icon: ICONS.user,         route: 'drpd.users.index',         pattern: 'drpd/users' },
        { label: 'Mes Formations', icon: ICONS.training,       route: 'drpd.trainings.index',     pattern: 'drpd/trainings' },
        { label: 'Mes Actifs',     icon: ICONS.asset,          route: 'drpd.assets.index',        pattern: 'drpd/assets' },
        { label: 'Mes Salles',     icon: ICONS.room,           route: 'drpd.rooms.index',         pattern: 'drpd/rooms' },
    ],
    AGAD: [
        { label: 'Profile',        icon: ICONS.profile,        route: 'profile.show',             pattern: 'profile' },
        { label: 'Formations',     icon: ICONS.training,       route: 'agad.trainings.index',     pattern: 'agad/trainings' },
        { label: 'Actifs',         icon: ICONS.asset,          route: 'agad.assets.index',        pattern: 'agad/assets' },
        { label: 'Salles',         icon: ICONS.room,           route: 'agad.rooms.index',         pattern: 'agad/rooms' },
    ],
    FRMT: [
        { label: 'Profile',        icon: ICONS.profile,        route: 'profile.show',             pattern: 'profile' },
    ],
};

export function getNavItems(role) {
    return NAVIGATION[role] ?? [];
}

export function isActive(url, pattern) {
    return matchRoute(url, pattern);
}
