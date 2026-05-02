import { Head } from '@inertiajs/react';
import Dashboard from '../../layouts/Dashboard';
import DataTable from '../../components/DataTable';

const STATE_COLORS = {
    'Actif': 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    'Inactif': 'bg-stone-100 text-stone-600 ring-stone-200',
    'Endommagé': 'bg-red-50 text-red-700 ring-red-100',
    'Perdu': 'bg-amber-50 text-amber-700 ring-amber-100',
};

export default function Index({ assets, auth }) {
    const canFilter = auth?.user?.role === 'admin' || auth?.user?.role === 'DRRG' || auth?.user?.role === 'DRCX';
    const uniqueEstablishments = [...new Map(assets.map(a => [a.establishment?.id, a.establishment])).values()].filter(Boolean);

    return (
        <Dashboard title="Actifs">
            <Head title="Actifs — OFPPT" />

            <DataTable
                data={assets}
                columns={[
                    { key: 'code', label: 'Code' },
                    { key: 'name', label: 'Nom' },
                    {
                        key: 'type',
                        label: 'Type',
                        render: a => a.type || <span className="text-stone-400">—</span>,
                    },
                    {
                        key: 'state',
                        label: 'État',
                        render: a => a.state ? (
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${STATE_COLORS[a.state] || 'bg-stone-100 text-stone-600'}`}>
                                {a.state}
                            </span>
                        ) : <span className="text-stone-400">—</span>,
                    },
                    {
                        key: 'establishment',
                        label: 'Établissement',
                        render: a => a.establishment?.name || <span className="text-stone-400">—</span>,
                    },
                ]}
                createHref="/assets/create"
                showPrefix="assets"
                editPrefix="assets"
                searchPlaceholder="Rechercher par code ou nom..."
                searchKeys={['code', 'name']}
                filters={
                    canFilter
                        ? [
                              {
                                  key: 'establishment',
                                  label: 'Établissement',
                                  getter: a => a.establishment?.name,
                                  options: uniqueEstablishments.map(e => ({ value: e.name, label: e.name })),
                              },
                          ]
                        : []
                }
                emptyMessage="Aucun actif trouvé"
            />
        </Dashboard>
    );
}
