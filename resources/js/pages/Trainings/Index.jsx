import { Head } from '@inertiajs/react';
import Dashboard from '../../layout/Dashboard';
import DataTable from '../../components/DataTable';

const TYPE_LABELS = { Diplomante: 'Diplomante', Qualifiante: 'Qualifiante' };
const LEVEL_LABELS = { Qualification: 'Qualification', 'Spécialisation': 'Spécialisation', Technicien: 'Technicien', 'Technicien Spécialisé': 'Technicien Spécialisé' };

export default function Index({ trainings, auth }) {
    const canFilter = auth?.user?.role === 'admin' || auth?.user?.role === 'DRRG' || auth?.user?.role === 'DRCX';
    const uniqueEstablishments = [...new Map(trainings.map(t => [t.establishment?.id, t.establishment])).values()].filter(Boolean);

    return (
        <Dashboard title="Formations">
            <Head title="Formations — OFPPT" />

            <DataTable
                data={trainings}
                columns={[
                    { key: 'code', label: 'Code' },
                    { key: 'name', label: 'Nom' },
                    {
                        key: 'type',
                        label: 'Type',
                        render: t => t.type ? TYPE_LABELS[t.type] || t.type : <span className="text-stone-400">—</span>,
                    },
                    {
                        key: 'level',
                        label: 'Niveau',
                        render: t => t.level ? LEVEL_LABELS[t.level] || t.level : <span className="text-stone-400">—</span>,
                    },
                    {
                        key: 'establishment',
                        label: 'Établissement',
                        render: t => t.establishment?.name || <span className="text-stone-400">—</span>,
                    },
                ]}
                createHref="/trainings/create"
                showPrefix="trainings"
                editPrefix="trainings"
                searchPlaceholder="Rechercher par code ou nom..."
                searchKeys={['code', 'name']}
                filters={
                    canFilter
                        ? [
                              {
                                  key: 'establishment',
                                  label: 'Établissement',
                                  getter: t => t.establishment?.name,
                                  options: uniqueEstablishments.map(e => ({ value: e.name, label: e.name })),
                              },
                          ]
                        : []
                }
                emptyMessage="Aucune formation trouvée"
            />
        </Dashboard>
    );
}
