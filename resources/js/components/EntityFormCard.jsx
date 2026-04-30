import FormCard from './FormCard';

function EntityBanner({ entity, entityLabel = 'Entité' }) {
    if (!entity) return null;
    const name = entity.name || entity.title || entityLabel;
    const code = entity.code || '';
    const label = entity.label || entity.category || entity.type || entity.level || entity.sector || entity.city || entity.state || entityLabel;

    return (
        <div className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white px-5 py-4 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white shadow-sm">
                {(name || entityLabel).charAt(0).toUpperCase()}
            </div>
            <div>
                <p className="text-sm font-semibold text-stone-900">{name || entityLabel}</p>
                <p className="text-xs text-stone-500">{label}{code ? ` — ${code}` : ''}</p>
            </div>
        </div>
    );
}

function buildBanner(entity, entityLabel) {
    if (!entity) return undefined;
    return <EntityBanner entity={entity} entityLabel={entityLabel} />;
}

export default function EntityFormCard({
    title,
    cancelHref,
    onSubmit,
    processing,
    submitLabel = 'Enregistrer',
    fields = [],
    extraFields = [],
    extras,
    isCreate = false,
    entity,
    entityLabel = 'Entité',
    deleteUrl,
    showDelete = true,
    deleteTitle,
    deleteZoneTitle = 'Zone dangereuse',
    deleteZoneDescription = 'Cette action est irréversible.',
    deleteModalDescription,
}) {
    return (
        <div className="mx-auto max-w-5xl space-y-6">
            <FormCard
                title={title}
                cancelHref={cancelHref}
                onSubmit={onSubmit}
                processing={processing}
                submitLabel={submitLabel}
                fields={fields}
                extraFields={extraFields}
                extra={extras}
                isCreate={isCreate}
                banner={buildBanner(entity, entityLabel)}
                showDelete={!isCreate && showDelete && deleteUrl}
                deleteUrl={deleteUrl}
                deleteTitle={deleteTitle || 'Supprimer'}
                deleteZoneTitle={deleteZoneTitle}
                deleteZoneDescription={deleteZoneDescription}
                deleteModalDescription={deleteModalDescription}
            />
        </div>
    );
}