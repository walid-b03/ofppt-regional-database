import { Head, usePage } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import DataTable from '../../components/DataTable';
import { ROLE_LABELS } from '../../lib/constants';
import { getRoutePrefix } from '../../lib/routes';

export default function Index({ users }) {
    const prefix = getRoutePrefix('users', { drrg: 'users', drcx: 'users', drpd: 'users' });
    const { auth } = usePage().props;
    const currentUserId = auth?.user?.id;

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
                        key: 'establishment',
                        label: 'Établissement',
                        render: u => u.establishment?.name || <span className="text-stone-400">—</span>,
                    },
                    {
                        key: 'email',
                        label: 'Email',
                        render: u => u.email || <span className="text-stone-400">—</span>,
                    },
                ]}
                createHref={`/${prefix}/create`}
                showPrefix={prefix}
                editPrefix={prefix}
                destroyPrefix={prefix}
                searchPlaceholder="Rechercher un membre du personnel..."
                filters={[
                    {
                        key: 'establishment',
                        label: 'Établissement',
                        getter: u => u.establishment?.name,
                        options: [...new Map(users
                            .filter(u => u.establishment)
                            .map(u => [u.establishment.id, u.establishment])
                        ).values()].map(e => ({ value: e.name, label: e.name })),
                    },
                ]}
                emptyMessage="Aucun membre du personnel trouvé"
                currentUserId={currentUserId}
            />
        </Dashboard>
    );
}
