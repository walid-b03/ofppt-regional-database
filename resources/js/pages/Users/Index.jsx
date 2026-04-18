import { Head, usePage } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import DataTable from '../../components/DataTable';
import { ROLE_LABELS } from '../../lib/constants';

export default function Index({ users }) {
    const { auth } = usePage().props;
    const canFilter = auth?.user?.role === 'admin' || auth?.user?.role === 'DRRG' || auth?.user?.role === 'DRCX';

    return (
        <Dashboard title="Personnel">
            <Head title="Personnel — OFPPT" />

            <DataTable
                data={users}
                columns={[
                    { key: 'code', label: 'Code' },
                    { key: 'name', label: 'Nom', render: u => `${u.first_name} ${u.last_name}` },
                    {
                        key: 'role',
                        label: 'Rôle',
                        render: u => <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">{ROLE_LABELS[u.role] || u.role}</span>,
                    },
                    {
                        key: 'phone',
                        label: 'Téléphone',
                        render: u => u.phone || <span className="text-stone-400">—</span>,
                    },
                    {
                        key: 'establishment',
                        label: 'Établissement',
                        render: u => u.establishment?.name || <span className="text-stone-400">—</span>,
                    },
                ]}
                createHref="/users/create"
                showPrefix="users"
                editPrefix="users"
                searchPlaceholder="Rechercher par code ou nom..."
                searchKeys={['code', 'first_name', 'last_name']}
                filters={
                    canFilter
                        ? [
                              {
                                  key: 'establishment',
                                  label: 'Établissement',
                                  getter: u => u.establishment?.name,
                                  options: [...new Map(users
                                      .filter(u => u.establishment)
                                      .map(u => [u.establishment.id, u.establishment])
                                  ).values()].map(e => ({ value: e.name, label: e.name })),
                              },
                          ]
                        : []
                }
                emptyMessage="Aucun membre du personnel trouvé"
            />
        </Dashboard>
    );
}
