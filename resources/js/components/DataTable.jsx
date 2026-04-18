import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Pencil, Eye, X, Plus } from 'lucide-react';

export default function DataTable({
    data,
    columns,
    createHref,
    showPrefix,
    editPrefix,
    searchPlaceholder = 'Rechercher...',
    filters = [],
    emptyMessage = 'Aucune donnée disponible',
    searchKeys,
}) {
    const [search, setSearch] = useState('');
    const [filterValues, setFilterValues] = useState(
        Object.fromEntries(filters.map(f => [f.key, '']))
    );

    const keysToSearch = searchKeys || columns.map(c => c.key);

    const filtered = data.filter(row => {
        if (search) {
            const q = search.toLowerCase();
            const matchesSearch = keysToSearch.some(key => {
                const val = row[key];
                return String(val ?? '').toLowerCase().includes(q);
            });
            if (!matchesSearch) return false;
        }
        for (const f of filters) {
            if (filterValues[f.key]) {
                const rowVal = f.getter ? f.getter(row) : row[f.key];
                if (rowVal !== filterValues[f.key]) return false;
            }
        }
        return true;
    });

    const hasActiveFilters = search || Object.values(filterValues).some(Boolean);

    return (
        <>
            {/* Toolbar */}
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                    {/* Search */}
                    <div className="flex-1 max-w-sm">
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="block w-full rounded-xl border border-stone-200 bg-white py-2.5 px-4 text-sm shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-stone-300"
                        />
                    </div>

                    {/* Filter dropdowns */}
                    {filters.map(f => (
                        <select
                            key={f.key}
                            value={filterValues[f.key]}
                            onChange={e => setFilterValues(v => ({ ...v, [f.key]: e.target.value }))}
                            className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-stone-300"
                        >
                            <option value="">{f.label}</option>
                            {f.options.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                    ))}

                    {/* Clear filters */}
                    {hasActiveFilters && (
                        <button
                            onClick={() => { setSearch(''); setFilterValues(Object.fromEntries(filters.map(f => [f.key, '']))); }}
                            className="inline-flex items-center gap-1.5 text-sm text-stone-500 transition-colors hover:text-stone-700"
                        >
                            <X className="h-4 w-4" />
                            Réinitialiser
                        </button>
                    )}
                </div>

                {/* Create button */}
                <Link
                    href={createHref}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-700 hover:shadow-indigo-600/30"
                >
                    <Plus className="h-4 w-4" />
                    Ajouter
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-stone-100 bg-stone-50/80">
                                {columns.map(col => (
                                    <th
                                        key={col.key}
                                        className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-stone-500"
                                    >
                                        {col.label}
                                    </th>
                                ))}
                                <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-stone-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-50">
                            {filtered.length > 0
                                ? filtered.map(row => (
                                    <tr
                                        key={row.id}
                                        className="transition-colors hover:bg-stone-50/60"
                                    >
                                        {columns.map(col => (
                                            <td key={col.key} className="px-5 py-3.5 text-stone-700">
                                                {col.render ? col.render(row) : row[col.key]}
                                            </td>
                                        ))}
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Link
                                                    href={`/${showPrefix}/${row.id}`}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 transition hover:bg-sky-50 hover:text-sky-600"
                                                    title="Voir"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    href={`/${editPrefix}/${row.id}/edit`}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 transition hover:bg-amber-50 hover:text-amber-600"
                                                    title="Modifier"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                : (
                                    <tr>
                                        <td colSpan={columns.length + 1} className="px-5 py-12 text-center text-stone-400">
                                            {hasActiveFilters ? 'Aucun résultat pour ces filtres' : emptyMessage}
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>

                {/* Result count */}
                {filtered.length > 0 && (
                    <div className="border-t border-stone-100 px-5 py-3 text-xs text-stone-400">
                        {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
                    </div>
                )}
            </div>
        </>
    );
}
