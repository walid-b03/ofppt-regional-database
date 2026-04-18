import { useState } from 'react';
import { ChevronDown, Loader2, Trash2 } from 'lucide-react';
import { Link } from '@inertiajs/react';
import Modal from './Modal';

function Field({
    name, label, value, error, onChange,
    type = 'text', options, textarea, checkbox,
    placeholder = '...', rows = 3, className = '',
}) {
    const baseCls =
        'block w-full rounded-xl border bg-white py-2.5 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-stone-300';
    const borderCls = error
        ? 'border-red-400 bg-red-50'
        : 'border-stone-200 focus:border-indigo-500';

    if (checkbox) {
        return (
            <div className={`space-y-1.5 ${className}`}>
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={!!value}
                        onChange={e => onChange(name, e.target.checked)}
                        className="h-4.5 w-4.5 rounded border-stone-300 text-indigo-600 shadow-sm focus:ring-indigo-500/20"
                    />
                    <span className="text-sm font-medium text-stone-700">{label}</span>
                </label>
                {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
        );
    }

    if (options) {
        const emptyVal = value === '' || value === null || value === undefined;
        return (
            <div className={`space-y-1.5 ${className}`}>
                <label htmlFor={name} className="block text-sm font-medium text-stone-700">
                    {label}
                </label>
                <div className="group/input relative">
                    <select
                        id={name}
                        value={value ?? ''}
                        onChange={e => onChange(name, e.target.value)}
                        className={`${baseCls} ${borderCls} appearance-none pr-10 pl-4 ${emptyVal ? 'text-stone-400' : ''}`}
                    >
                        <option value="">Sélectionner...</option>
                        {options.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-stone-400">
                        <ChevronDown className="h-4 w-4" />
                    </span>
                </div>
                {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
        );
    }

    if (textarea) {
        return (
            <div className={`space-y-1.5 ${className}`}>
                <label htmlFor={name} className="block text-sm font-medium text-stone-700">
                    {label}
                </label>
                <textarea
                    id={name}
                    rows={rows}
                    value={value ?? ''}
                    onChange={e => onChange(name, e.target.value)}
                    placeholder={placeholder}
                    className={`${baseCls} ${borderCls} resize-none px-4`}
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
        );
    }

    return (
        <div className={`space-y-1.5 ${className}`}>
            <label htmlFor={name} className="block text-sm font-medium text-stone-700">
                {label}
            </label>
            <input
                id={name}
                type={type}
                value={value ?? ''}
                onChange={e => onChange(name, e.target.value)}
                placeholder={placeholder}
                className={`${baseCls} ${borderCls} px-4`}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}

export default function FormCard({
    title, subtitle, cancelHref, onSubmit, processing,
    submitLabel = 'Enregistrer', fields = [], extraFields = [], extra,
    isCreate, banner,
    showDelete, onDelete, deleteTitle,
    deleteZoneTitle = 'Zone dangereuse',
    deleteZoneDescription,
    deleteModalDescription,
}) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteProcessing, setDeleteProcessing] = useState(false);

    const handleDelete = () => {
        setDeleteProcessing(true);
        onDelete?.();
    };

    const isProcessing = processing || deleteProcessing;

    return (
        <div>
            {!isCreate && banner && (
                <div className="mb-6">
                    {banner}
                </div>
            )}

            <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
                <div className="border-b border-stone-100 px-6 py-4">
                    <h3 className="text-sm font-semibold text-stone-900">{title}</h3>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-3">
                        {fields.filter(f => !f.fullWidth).map(f => (
                            <Field key={f.name} {...f} />
                        ))}
                    </div>

                    {fields.filter(f => f.fullWidth).map(f => (
                        <div key={f.name} className="px-6 pb-5">
                            <Field {...f} />
                        </div>
                    ))}

                    {extraFields.length > 0 && (
                        <div className="grid grid-cols-1 gap-5 px-6 pb-5 sm:grid-cols-3">
                            {extraFields.map(f => (
                                <Field key={f.name} {...f} />
                            ))}
                        </div>
                    )}

                    {extra && <div className="px-6 pb-5">{extra}</div>}

                    <div className="flex items-center justify-end gap-3 border-t border-stone-100 bg-stone-50 px-6 py-4">
                        <Link
                            href={cancelHref}
                            className="rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-all duration-200 hover:bg-stone-50"
                        >
                            Annuler
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-700 disabled:pointer-events-none disabled:opacity-60"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Enregistrement...
                                </>
                            ) : submitLabel}
                        </button>
                    </div>
                </form>
            </div>

            {showDelete && onDelete && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50/50 p-6">
                    <h3 className="text-sm font-semibold text-red-800">{deleteZoneTitle}</h3>
                    <p className="mt-1 text-xs text-red-600">
                        {deleteZoneDescription || 'Cette action est irréversible.'}
                    </p>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm transition-all duration-200 hover:bg-red-50"
                    >
                        <Trash2 className="h-4 w-4" />
                        {deleteTitle || 'Supprimer'}
                    </button>
                </div>
            )}

            <Modal
                open={showDeleteModal}
                onClose={() => !isProcessing && setShowDeleteModal(false)}
                title="Confirmer la suppression"
                description={deleteModalDescription || 'Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.'}
                footer={
                    <>
                        <button
                            onClick={() => !isProcessing && setShowDeleteModal(false)}
                            disabled={isProcessing}
                            className="rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-all duration-200 hover:bg-stone-50 disabled:opacity-60"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isProcessing}
                            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition-all duration-200 hover:bg-red-700 disabled:pointer-events-none disabled:opacity-60"
                        >
                            {isProcessing ? 'Suppression...' : 'Supprimer'}
                        </button>
                    </>
                }
            />
        </div>
    );
}

export { Field };
