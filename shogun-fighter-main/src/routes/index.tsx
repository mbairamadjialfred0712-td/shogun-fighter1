import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.png.asset.json";
import { CalendarClock, CreditCard, ReceiptText, ShieldCheck, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shogun Fighters — Gestion de la salle" },
      {
        name: "description",
        content:
          "Membres, abonnements, paiements, reçus et rappels d'expiration : le logiciel de gestion de salle de sport, en ligne.",
      },
      { property: "og:title", content: "Shogun Fighters — Gestion de la salle" },
      {
        property: "og:description",
        content:
          "Suivez vos membres, vos abonnements et vos encaissements depuis un seul espace.",
      },
    ],
  }),
  component: LoginPage,
});

const highlights = [
  { icon: Users, label: "Fiches membres complètes" },
  { icon: CalendarClock, label: "Abonnements & renouvellements" },
  { icon: CreditCard, label: "Paiements et revenus du mois" },
  { icon: ReceiptText, label: "Reçus professionnels imprimables" },
];

function LoginPage() {
  const navigate = useNavigate();

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-2">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-soft via-soft to-bubble p-10 text-soft-foreground lg:flex">
        <div className="flex items-center gap-2.5">
          <img
            src={logoAsset.url}
            alt="Logo Shogun Fighters"
            className="size-11 rounded-2xl bg-card object-contain p-1"
          />
          <span className="font-display text-lg font-semibold">Shogun Fighters</span>
        </div>

        <div className="max-w-md">
          <h1 className="font-display text-4xl leading-tight font-semibold">
            Votre salle de sport, pilotée en un seul endroit.
          </h1>
          <p className="mt-4 text-sm opacity-90">
            Fini les cahiers et les fichiers dispersés : membres, abonnements,
            encaissements et rappels d'expiration, sur ordinateur comme sur téléphone.
          </p>
          <ul className="mt-8 space-y-3">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <li key={h.label} className="flex items-center gap-3 text-sm">
                  <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white/20">
                    <Icon className="size-4" />
                  </span>
                  {h.label}
                </li>
              );
            })}
          </ul>
        </div>

        <p className="flex items-center gap-2 text-xs opacity-90">
          <ShieldCheck className="size-4" /> Chaque salle dispose de son propre espace de
          données.
        </p>
      </section>

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2.5 lg:hidden">
            <img
              src={logoAsset.url}
              alt="Logo Shogun Fighters"
              className="size-10 rounded-2xl bg-card object-contain p-1 ring-1 ring-border"
            />
            <span className="font-display text-base font-semibold">Shogun Fighters</span>
          </div>

          <h2 className="mt-8 font-display text-2xl font-semibold lg:mt-0">
            Connexion à votre espace
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Démonstration : cliquez simplement sur « Se connecter ».
          </p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/dashboard" });
            }}
          >
            <label className="block">
              <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                Email
              </span>
              <input
                type="email"
                defaultValue="kodjo@shogunfighters.tg"
                className="mt-1 w-full rounded-2xl bg-card px-4 py-3 text-base ring-1 ring-border outline-none focus:ring-2 focus:ring-soft/50"
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                Mot de passe
              </span>
              <input
                type="password"
                defaultValue="demo1234"
                className="mt-1 w-full rounded-2xl bg-card px-4 py-3 text-base ring-1 ring-border outline-none focus:ring-2 focus:ring-soft/50"
              />
            </label>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-full bg-soft py-4 text-base font-bold text-soft-foreground transition-colors hover:bg-soft/90"
            >
              Se connecter
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Nouvelle salle ?{" "}
            <Link to="/dashboard" className="font-semibold text-soft">
              Créer mon espace
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
