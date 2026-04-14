import { Head } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import DataTable from '../../components/DataTable';
import { getRoutePrefix } from '../../lib/routes';

export default function Index({ regions }) {
    const prefix = getRoutePrefix('regions', { drrg: 'region' });

    return (
        <Dashboard title="Régions">
            <Head title="Régions — OFPPT" />

            <DataTable
                data={regions}
                columns={[
                    { key: 'code', label: 'Code' },
                    { key: 'name', label: 'Nom' },
                    {
                        key: 'head',
                        label: 'Responsable',
                        render: r => r.head
                            ? `${r.head.first_name} ${r.head.last_name}`
                            : <span className="text-stone-400">—</span>,
                    },
                    {
                        key: 'email',
                        label: 'Email',
                        render: r => r.email || <span className="text-stone-400">—</span>,
                    },
                    {
                        key: 'phone',
                        label: 'Téléphone',
                        render: r => r.phone || <span className="text-stone-400">—</span>,
                    },
                ]}
                createHref={`/${prefix}/create`}
                showPrefix={prefix}
                editPrefix={prefix}
                destroyPrefix={prefix}
                searchPlaceholder="Rechercher une région..."
                emptyMessage="Aucune région trouvée"
            />
        </Dashboard>
    );
}
