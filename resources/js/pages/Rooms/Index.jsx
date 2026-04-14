import { Head } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import DataTable from '../../components/DataTable';
import { getRoutePrefix } from '../../lib/routes';

export default function Index({ rooms }) {
    const prefix = getRoutePrefix('rooms');
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
                createHref={`/${prefix}/create`}
                showPrefix={prefix}
                editPrefix={prefix}
                destroyPrefix={prefix}
                searchPlaceholder="Rechercher une salle..."
                filters={[
                    {
                        key: 'establishment',
                        label: 'Établissement',
                        getter: r => r.establishment?.name,
                        options: uniqueEstablishments.map(e => ({ value: e.name, label: e.name })),
                    },
                ]}
                emptyMessage="Aucune salle trouvée"
            />
        </Dashboard>
    );
}
