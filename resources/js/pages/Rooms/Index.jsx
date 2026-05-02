import { Head } from '@inertiajs/react';
import Dashboard from '../../layouts/Dashboard';
import DataTable from '../../components/DataTable';

export default function Index({ rooms, auth }) {
    const canFilter = auth?.user?.role === 'admin' || auth?.user?.role === 'DRRG' || auth?.user?.role === 'DRCX';
    const uniqueEstablishments = [...new Map(rooms.map(r => [r.establishment?.id, r.establishment])).values()].filter(Boolean);

    return (
        <Dashboard title="Salles">
            <Head title="Salles — OFPPT" />

            <DataTable
                data={rooms}
                columns={[
                    { key: 'code', label: 'Code' },
                    { key: 'name', label: 'Nom' },
                    {
                        key: 'type',
                        label: 'Type',
                        render: r => r.type || <span className="text-stone-400">—</span>,
                    },
                    {
                        key: 'establishment',
                        label: 'Établissement',
                        render: r => r.establishment?.name || <span className="text-stone-400">—</span>,
                    },
                ]}
                createHref="/rooms/create"
                showPrefix="rooms"
                editPrefix="rooms"
                searchPlaceholder="Rechercher par code ou nom..."
                searchKeys={['code', 'name']}
                filters={
                    canFilter
                        ? [
                              {
                                  key: 'establishment',
                                  label: 'Établissement',
                                  getter: r => r.establishment?.name,
                                  options: uniqueEstablishments.map(e => ({ value: e.name, label: e.name })),
                              },
                          ]
                        : []
                }
                emptyMessage="Aucune salle trouvée"
            />
        </Dashboard>
    );
}
