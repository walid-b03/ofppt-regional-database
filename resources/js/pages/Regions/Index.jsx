import { Head } from '@inertiajs/react';
import Dashboard from '../../layouts/Dashboard';
import DataTable from '../../components/DataTable';

export default function Index({ regions }) {
    return (
        <Dashboard title="Régions">
            <Head title="Régions — OFPPT" />

            <DataTable
                data={regions}
                columns={[
                    { key: 'code', label: 'Code' },
                    { key: 'name', label: 'Nom' },
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
                    {
                        key: 'head',
                        label: 'Responsable',
                        render: r => r.head
                        ? `${r.head.first_name} ${r.head.last_name}`
                        : <span className="text-stone-400">—</span>,
                    },
                ]}
                createHref="/regions/create"
                showPrefix="regions"
                editPrefix="regions"
                searchPlaceholder="Rechercher par code ou nom..."
                searchKeys={['code', 'name']}
                emptyMessage="Aucune région trouvée"
            />
        </Dashboard>
    );
}
