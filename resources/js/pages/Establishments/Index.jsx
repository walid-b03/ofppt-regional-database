import { Head } from '@inertiajs/react';
import Dashboard from '../../layouts/Dashboard';
import DataTable from '../../components/DataTable';

export default function Index({ establishments, auth }) {
    const canFilter = auth?.user?.role === 'admin' || auth?.user?.role === 'DRRG';
    const uniqueComplexes = [...new Map(establishments.map(e => [e.complex?.id, e.complex])).values()].filter(Boolean);

    return (
        <Dashboard title="Établissements">
            <Head title="Établissements — OFPPT" />

            <DataTable
                data={establishments}
                columns={[
                    { key: 'code', label: 'Code' },
                    { key: 'name', label: 'Nom' },
                    {
                        key: 'complex',
                        label: 'Complexe',
                        render: e => e.complex?.name || <span className="text-stone-400">—</span>,
                    },
                    {
                        key: 'head',
                        label: 'Responsable',
                        render: e => e.head
                            ? `${e.head.first_name} ${e.head.last_name}`
                            : <span className="text-stone-400">—</span>,
                    },
                ]}
                createHref="/establishments/create"
                showPrefix="establishments"
                editPrefix="establishments"
                searchPlaceholder="Rechercher par code ou nom..."
                searchKeys={['code', 'name']}
                filters={
                    canFilter
                        ? [
                              {
                                  key: 'complex',
                                  label: 'Complexe',
                                  getter: e => e.complex?.name,
                                  options: uniqueComplexes.map(c => ({ value: c.name, label: c.name })),
                              },
                          ]
                        : []
                }
                emptyMessage="Aucun établissement trouvé"
            />
        </Dashboard>
    );
}
