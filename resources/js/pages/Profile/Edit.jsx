import { useState, useEffect } from "react";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import Dashboard from "../../layout/Dashboard";
import PasswordModal from "../../components/PasswordModal";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Hash,
  Heart,
  Users,
  Award,
  Briefcase,
  Lock,
  ChevronDown,
  ArrowLeft,
  Check,
  X,
} from "lucide-react";

const MARITAL_OPTIONS = [
  { value: "single", label: "Célibataire" },
  { value: "married", label: "Marié(e)" },
  { value: "divorced", label: "Divorcé(e)" },
  { value: "widowed", label: "Veuf(ve)" },
];

const RANK_OPTIONS = [
  { value: "A1", label: "A1" },
  { value: "A2", label: "A2" },
  { value: "A3", label: "A3" },
];

const LABEL_MAP = {
  first_name: "Prénom",
  last_name: "Nom",
  cin: "CIN",
  marital_status: "État civil",
  children: "Nombre d'enfants",
  email: "Email",
  phone: "Téléphone",
  address: "Adresse",
  date_of_birth: "Date de naissance",
  date_of_recruitment: "Date de recrutement",
  diploma: "Diplôme",
  rank: "Grade",
  role_label: "Fonction",
};

const ICON_MAP = {
  first_name: User,
  last_name: User,
  cin: Hash,
  marital_status: Heart,
  children: Users,
  email: Mail,
  phone: Phone,
  address: MapPin,
  date_of_birth: Calendar,
  date_of_recruitment: Briefcase,
  diploma: Award,
  rank: Award,
  role_label: Briefcase,
};

/* --- Toast --- */
function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-emerald-200 bg-white px-5 py-3.5 shadow-lg ring-1 ring-emerald-100">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <Check className="h-4 w-4" />
      </div>
      <p className="text-sm font-medium text-stone-800">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-stone-400 hover:text-stone-600"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

/* --- Single input / select / textarea field --- */
function Field({ name, value, error, onChange }) {
  const IconEl = ICON_MAP[name];
  const label = LABEL_MAP[name];
  const isSelect = name === "marital_status" || name === "rank";
  const isTextarea = name === "address";
  const options =
    name === "marital_status" ? MARITAL_OPTIONS : RANK_OPTIONS;

  const baseCls =
    "block w-full rounded-xl border bg-white py-2.5 pl-11 pr-4 text-sm shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-stone-300";
  const borderCls = error
    ? "border-red-400 bg-red-50"
    : "border-stone-200 focus:border-indigo-500";
  const emptyCls = !value && isSelect ? "text-stone-400" : "";

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-stone-700"
      >
        {label}
      </label>

      <div className="group/input relative">
        {/* Icon */}
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400 transition group-focus-within/input:text-indigo-600">
          {IconEl && <IconEl className="h-4 w-4" />}
        </span>

        {isSelect && (
          <>
            <select
              id={name}
              value={value}
              onChange={(e) => onChange(name, e.target.value)}
              className={`${baseCls} ${borderCls} ${emptyCls} appearance-none pr-10`}
            >
              <option value="">Sélectionner...</option>
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-stone-400">
              <ChevronDown className="h-4 w-4" />
            </span>
          </>
        )}

        {isTextarea && (
          <textarea
            id={name}
            rows={3}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            className={`${baseCls} ${borderCls} resize-none`}
            placeholder="..."
          />
        )}

        {!isSelect && !isTextarea && (
          <input
            id={name}
            type={
              name === "email"
                ? "email"
                : name === "children"
                  ? "number"
                  : name.includes("date")
                    ? "date"
                    : "text"
            }
            min={name === "children" ? "0" : undefined}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            className={`${baseCls} ${borderCls}`}
            placeholder="..."
          />
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
/* ── Main Page ── */
/* ═══════════════════════════════════════════════════════════ */
export default function ProfileEdit({ user: serverUser }) {
  const { auth } = usePage().props;
  const user = serverUser ?? auth?.user ?? {};
  const isAdmin = user.role === "admin";
  const name =
    `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim();
  const roleLabel = user.role_label ?? user.role ?? "";

  const [pwOpen, setPwOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const { data, setData, put, processing, errors } = useForm({
    first_name: user.first_name ?? "",
    last_name: user.last_name ?? "",
    cin: user.cin ?? "",
    marital_status: user.marital_status ?? "",
    children: user.children ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    address: user.address ?? "",
    date_of_birth: user.date_of_birth ?? "",
    date_of_recruitment: user.date_of_recruitment ?? "",
    diploma: user.diploma ?? "",
    rank: user.rank ?? "",
    role_label: user.role_label ?? "",
  });

  const fields = isAdmin
    ? [
        "first_name",
        "last_name",
        "cin",
        "marital_status",
        "children",
        "email",
        "phone",
        "date_of_birth",
        "date_of_recruitment",
        "diploma",
        "rank",
        "role_label",
      ]
    : [
        "marital_status",
        "children",
        "email",
        "phone",
        "date_of_birth",
        "date_of_recruitment",
        "diploma",
        "rank",
        "role_label",
      ];

  function handleSubmit(e) {
    e.preventDefault();
    put("/profile", {
      preserveScroll: true,
      onSuccess: () => setToast("Profil mis à jour avec succès"),
    });
  }

  return (
    <Dashboard title="Modifier le profil">
      <Head title="Modifier le profil — OFPPT" />

      <div className="mx-auto max-w-5xl space-y-6">
        {/* Back + password */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-indigo-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au profil
          </Link>

          <button
            type="button"
            onClick={() => setPwOpen(true)}
            className="group/btn inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-all duration-200 hover:bg-stone-50 hover:text-stone-900"
          >
            <Lock className="h-4 w-4 text-stone-400 transition-colors group-hover/btn:text-indigo-500" />
            Changer le mot de passe
          </button>
        </div>

        {/* Mini user banner */}
        <div className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white shadow-sm">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase() || "?"}
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-900">
              {name || "Utilisateur"}
            </p>
            <p className="text-xs text-stone-500">
              {roleLabel} — {user.code}
            </p>
          </div>
        </div>

        {/* Form card */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
            <div className="border-b border-stone-100 px-6 py-4">
              <h3 className="text-sm font-semibold text-stone-900">
                Informations du profil
              </h3>
              <p className="mt-0.5 text-xs text-stone-500">
                {isAdmin
                  ? "Tous les champs sont modifiables"
                  : "Certains champs ne peuvent être modifiés que par un administrateur"}
              </p>
            </div>

            {/* Regular fields — 3-col grid */}
            <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-3">
              {fields.map((f) => (
                <Field
                  key={f}
                  name={f}
                  value={data[f]}
                  error={errors[f]}
                  onChange={setData}
                />
              ))}
            </div>

            {/* Address — full-width textarea */}
            <div className="px-6 pb-6">
              <Field
                name="address"
                value={data.address}
                error={errors.address}
                onChange={setData}
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-stone-100 bg-stone-50 px-6 py-4">
              <Link
                href="/profile"
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
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Enregistrement...
                  </>
                ) : (
                  "Enregistrer"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Password modal */}
      <PasswordModal open={pwOpen} onClose={() => setPwOpen(false)} />

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </Dashboard>
  );
}
