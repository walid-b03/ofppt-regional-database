/**
 * Resolve the correct URL prefix for a resource based on the current path.
 *
 * @param {string} resource  — plural slug (e.g. 'regions', 'complexes', 'trainings')
 * @param {Object} [singulars] — map of role prefix → singular slug (e.g. { drrg: 'region', drcx: 'complex', drpd: 'establishment' })
 * @returns {string}
 */
export function getRoutePrefix(resource, singulars = {}) {
    const p = typeof window !== 'undefined' ? window.location.pathname : '';

    if (p.startsWith('/admin')) return `admin/${resource}`;

    const match = Object.entries(singulars).find(([role]) => p.startsWith(`/${role}`));
    if (match) return `${match[0]}/${singulars[match[0]] ?? resource}`;

    return `admin/${resource}`;
}
