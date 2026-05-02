import { Head } from '@inertiajs/react';
import Dashboard from '../../layouts/Dashboard';
import DataTable from '../../components/DataTable';

export default function Index({ complexes, auth }) {
    const isAdmin = auth?.user?.role === 'admin';
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
                        key: 'city',
                        label: 'Ville',
                        render: c => c.city || <span className="text-stone-400">—</span>,
                    },
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
                ]}
                createHref="/complexes/create"
                showPrefix="complexes"
                editPrefix="complexes"
                searchPlaceholder="Rechercher par code ou nom..."
                searchKeys={['code', 'name']}
                filters={
                    isAdmin
                        ? [
                              {
                                  key: 'region',
                                  label: 'Région',
                                  getter: c => c.region?.name,
                                  options: uniqueRegions.map(r => ({ value: r.name, label: r.name })),
                              },
                          ]
                        : []
                }
                emptyMessage="Aucun complexe trouvé"
            />
        </Dashboard>
    );
}
