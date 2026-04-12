import { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import { User, Lock, Eye, EyeOff, Check } from 'lucide-react';

export default function Home() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        password: '',
        remember: false,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/login');
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
                                        <User className="h-4.5 w-4.5" />
                                    </span>
                                    <input
                                        id="code"
                                        required
                                        type="text"
                                        placeholder="------"
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
                                        <Lock className="h-4.5 w-4.5" />
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
                                        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-stone-400 transition-colors hover:text-indigo-600 focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4.5 w-4.5" />
                                        ) : (
                                            <Eye className="h-4.5 w-4.5" />
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
                                            <Check
                                                className="mx-auto h-2.5 w-2.5 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                                                strokeWidth={4}
                                            />
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
