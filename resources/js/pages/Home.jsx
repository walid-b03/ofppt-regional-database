import { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function Home() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        password: '',
        remember: false,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('login'));
    }

    const error = errors.code || errors.password || Object.values(errors)[0];

    return (
        <>
            <Head title="Connexion — OFPPT" />
            <div className="min-h-screen flex flex-col lg:flex-row bg-stone-50 font-sans">

                {/* ── Left Panel: Branding ── */}
                <div className="relative hidden lg:flex lg:w-1/2 xl:w-[55%] flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-800 via-indigo-900 to-stone-900 text-white p-12 xl:p-20">

                    {/* Decorative blobs */}
                    <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
                    <div className="pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-3xl" />
                    <div className="pointer-events-none absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-white/5 blur-2xl" />

                    {/* Logo */}
                    <div className="relative z-10">
                        <img
                            src="/ofppt.svg"
                            alt="OFPPT"
                            className="h-32 w-auto brightness-0 invert"
                        />
                    </div>

                    {/* Headline */}
                    <div className="relative z-10 max-w-lg space-y-6">
                        <h1 className="text-3xl xl:text-4xl font-semibold leading-[1.15] tracking-tight">
                            Portail de Gestion des Données Régionales
                        </h1>
                        <p className="text-base text-indigo-100/80 leading-relaxed text-justify">
                            Bienvenue sur la plateforme dédiée à la gestion centralisée des complexes, établissements, formations et ressources de l&#39;OFPPT à l&#39;échelle régionale. Cet espace sécurisé permet aux responsables de piloter l&#39;ensemble des données administratives et pédagogiques en toute simplicité.
                        </p>

                        {/* Subtle feature pills */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            {['Multi-rôle', 'Données centralisées', 'Hiérarchie régionale'].map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-4 py-1.5 text-sm text-indigo-100"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="relative z-10">
                        <p className="text-sm text-indigo-200/50">
                            © 2026 OFPPT — Tous droits réservés
                        </p>
                    </div>
                </div>

                {/* ── Right Panel: Form ── */}
                <div className="flex flex-1 flex-col items-center lg:justify-center px-6 py-6 sm:px-12 lg:px-16 xl:px-24 lg:py-12">

                    {/* Mobile logo */}
                    <div className="mb-6 lg:hidden">
                        <img
                            src="/ofppt.svg"
                            alt="OFPPT"
                            className="mx-auto h-24 w-auto"
                        />
                    </div>

                    {/* Form card */}
                    <div className="w-full max-w-md space-y-8">

                        {/* Header */}
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
                                Connexion
                            </h2>
                            <p className="text-sm text-stone-500 leading-relaxed">
                                Entrez vos identifiants pour accéder à votre espace
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Error Alert */}
                            {error && (
                                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 animate-[fadeIn_0.3s_ease]">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-medium text-red-600">
                                        !
                                    </span>
                                    <p className="text-sm text-red-700 leading-relaxed">{error}</p>
                                </div>
                            )}

                            {/* Identifier Field */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="code"
                                    className="block text-sm font-medium text-stone-700"
                                >
                                    Identifiant OFPPT
                                </label>
                                <div className="group relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400 transition-colors group-focus-within:text-indigo-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                    </span>
                                    <input
                                        id="code"
                                        required
                                        type="text"
                                        placeholder="Ex : ofppt011"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                        className="block w-full rounded-xl border border-stone-200 bg-white py-3 pl-11 pr-4 text-sm text-stone-900 placeholder:text-stone-400 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-stone-300"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-stone-700"
                                >
                                    Mot de passe
                                </label>
                                <div className="group relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400 transition-colors group-focus-within:text-indigo-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                    </span>
                                    <input
                                        id="password"
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="block w-full rounded-xl border border-stone-200 bg-white py-3 pl-11 pr-20 text-sm text-stone-900 placeholder:text-stone-400 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-stone-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs font-medium text-stone-400 transition-colors hover:text-indigo-600 focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember + Forgot */}
                            <div className="flex items-center justify-between">
                                <label className="group flex cursor-pointer items-center gap-2.5">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="peer sr-only"
                                        />
                                        <div className="h-4.5 w-4.5 rounded-md border border-stone-300 bg-white shadow-sm transition-all duration-200 peer-checked:border-indigo-500 peer-checked:bg-indigo-500 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500/20">
                                            <svg
                                                className="mx-auto mt-[3px] h-2.5 w-2.5 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="text-sm text-stone-600 select-none">Se souvenir de moi</span>
                                </label>
                                <a
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                    className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 focus:outline-none focus-visible:underline"
                                >
                                    Mot de passe oublié ?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-700 hover:shadow-indigo-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
                            >
                                {processing ? (
                                    <>
                                        <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Connexion en cours...
                                    </>
                                ) : (
                                    'Se connecter'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
