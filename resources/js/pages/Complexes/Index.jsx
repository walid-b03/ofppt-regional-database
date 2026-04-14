import { Head } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import DataTable from '../../components/DataTable';
import { getRoutePrefix } from '../../lib/routes';

export default function Index({ complexes }) {
    const prefix = getRoutePrefix('complexes', { drrg: 'complexes', drcx: 'complex' });
    const uniqueRegions = [...new Map(complexes.map(c => [c.region?.id, c.region])).values()]
        .filter(Boolean);

    return (
        <Dashboard title="Complexes">
            <Head title="Complexes — OFPPT" />

            <DataTable
                data={complexes}
                columns={[
                    { key: 'code', label: 'Code' },
                    { key: 'name', label: 'Nom' },
                    {
                        key: 'region',
                        label: 'Région',
                        render: c => c.region?.name || <span className="text-stone-400">—</span>,
                    },
                    {
                        key: 'head',
                        label: 'Responsable',
                        render: c => c.head
                            ? `${c.head.first_name} ${c.head.last_name}`
                            : <span className="text-stone-400">—</span>,
                    },
                    {
                        key: 'location',
                        label: 'Ville',
                        render: c => c.location || <span className="text-stone-400">—</span>,
                    },
                ]}
                createHref={`/${prefix}/create`}
                showPrefix={prefix}
                editPrefix={prefix}
                destroyPrefix={prefix}
                searchPlaceholder="Rechercher un complexe..."
                filters={[
                    {
                        key: 'region',
                        label: 'Région',
                        getter: c => c.region?.name,
                        options: uniqueRegions.map(r => ({ value: r.name, label: r.name })),
                    },
                ]}
                emptyMessage="Aucun complexe trouvé"
            />
        </Dashboard>
    );
}
