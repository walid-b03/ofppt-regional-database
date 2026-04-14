import { Head } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import DataTable from '../../components/DataTable';
import { getRoutePrefix } from '../../lib/routes';

export default function Index({ establishments }) {
    const prefix = getRoutePrefix('establishments', { drrg: 'establishments', drcx: 'establishments', drpd: 'establishment' });
    const uniqueRegions = [...new Map(establishments.map(e => [e.complex?.region?.id, e.complex?.region])).values()].filter(Boolean);
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
                        key: 'region',
                        label: 'Région',
                        render: e => e.complex?.region?.name || <span className="text-stone-400">—</span>,
                    },
                    {
                        key: 'head',
                        label: 'Responsable',
                        render: e => e.head
                            ? `${e.head.first_name} ${e.head.last_name}`
                            : <span className="text-stone-400">—</span>,
                    },
                ]}
                createHref={`/${prefix}/create`}
                showPrefix={prefix}
                editPrefix={prefix}
                destroyPrefix={prefix}
                searchPlaceholder="Rechercher un établissement..."
                filters={[
                    {
                        key: 'region',
                        label: 'Région',
                        getter: e => e.complex?.region?.name,
                        options: uniqueRegions.map(r => ({ value: r.name, label: r.name })),
                    },
                    {
                        key: 'complex',
                        label: 'Complexe',
                        getter: e => e.complex?.name,
                        options: uniqueComplexes.map(c => ({ value: c.name, label: c.name })),
                    },
                ]}
                emptyMessage="Aucun établissement trouvé"
            />
        </Dashboard>
    );
}
