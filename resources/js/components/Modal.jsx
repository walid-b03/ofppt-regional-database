import { useEffect, useRef } from 'react';

export default function Modal({ open, onClose, title, description, children, footer, size = 'md' }) {
    const panelRef = useRef();

    useEffect(() => {
        if (!open) return;

        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    if (!open) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-xl',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity duration-300" />

            {/* Panel */}
            <div
                ref={panelRef}
                className={`relative w-full ${sizeClasses[size]} animate-[modalIn_0.25s_ease-out]`}
            >
                <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-stone-900/5">
                    {/* Header */}
                    <div className="flex items-start justify-between border-b border-stone-100 px-6 py-5">
                        <div>
                            <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
                            {description && (
                                <p className="mt-0.5 text-sm text-stone-500">{description}</p>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 transition hover:bg-stone-100 hover:text-stone-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-5">
                        {children}
                    </div>

                    {/* Footer */}
                    {footer && (
                        <div className="flex items-center justify-end gap-3 border-t border-stone-100 bg-stone-50 px-6 py-4">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
