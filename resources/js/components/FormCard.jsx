import { ChevronDown } from 'lucide-react';
import { Link } from '@inertiajs/react';

/**
 * Single field renderer — input, select, or textarea.
 *
 * @param {Object}   props
 * @param {string}   props.name       — field key (used for label + id)
 * @param {string}   props.label      — human-readable label
 * @param {string}   props.value      — current value
 * @param {string}   [props.error]    — validation error message
 * @param {Function} props.onChange   — (name, value) => void
 * @param {string}   [props.type]     — 'text' | 'email' | 'number' | 'date' | 'password'
 * @param {Array}    [props.options]  — [{value, label}] for select fields
 * @param {boolean}  [props.textarea] — render as textarea
 * @param {boolean}  [props.checkbox] — render as checkbox (value becomes boolean)
 * @param {string}   [props.placeholder]
 * @param {number}   [props.rows]     — textarea rows
 * @param {string}   [props.className] — extra wrapper classes
 */
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

    // Checkbox
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

    // Select
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

    // Textarea
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

    // Default input
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

/**
 * Reusable form card — wraps fields in a styled card with submit/cancel footer.
 *
 * @param {Object}   props
 * @param {string}   props.title       — card heading
 * @param {string}   [props.subtitle]  — card subtitle
 * @param {string}   props.cancelHref  — URL for cancel button
 * @param {Function} props.onSubmit    — (e) => void
 * @param {boolean}  props.processing  — form is submitting
 * @param {string}   [props.submitLabel='Enregistrer']
 * @param {Array}    props.fields      — field config objects passed to <Field>
 * @param {ReactNode} [props.extra]    — extra content below fields (e.g. password button)
 */
export default function FormCard({
    title, subtitle, cancelHref, onSubmit, processing,
    submitLabel = 'Enregistrer', fields = [], extra,
}) {
    return (
        <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
            {/* Header */}
            <div className="border-b border-stone-100 px-6 py-4">
                <h3 className="text-sm font-semibold text-stone-900">{title}</h3>
                {subtitle && <p className="mt-0.5 text-xs text-stone-500">{subtitle}</p>}
            </div>

            <form onSubmit={onSubmit}>
                {/* Fields — 3-col grid */}
                <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-3">
                    {fields.filter(f => !f.fullWidth).map(f => (
                        <Field key={f.name} {...f} />
                    ))}
                </div>

                {/* Full-width fields */}
                {fields.filter(f => f.fullWidth).map(f => (
                    <div key={f.name} className="px-6 pb-5">
                        <Field {...f} />
                    </div>
                ))}

                {/* Extra content (e.g. password button) */}
                {extra && <div className="px-6 pb-5">{extra}</div>}

                {/* Footer */}
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
                                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Enregistrement...
                            </>
                        ) : submitLabel}
                    </button>
                </div>
            </form>
        </div>
    );
}

export { Field };
