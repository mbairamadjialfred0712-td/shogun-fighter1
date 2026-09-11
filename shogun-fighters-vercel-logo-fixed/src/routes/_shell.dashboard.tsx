import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  RefreshCw,
  Users,
  CheckCircle2,
  AlertTriangle,
  Wallet,
  ChevronRight,
  UserPlus,
  CalendarClock,
  ArrowLeftRight,
  BarChart3,
  Settings,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { BigButton, Panel, SimpleAlert } from "@/components/ui-kit";
import { AddMemberForm, Modal, PaymentForm, RenewForm } from "@/components/forms";
import { currency, currentUser, dashboardStats, renewalQueue } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/dashboard")({
  head: () => ({
    meta: [
      { title: "Accueil — Shogun Fighters" },
      {
        name: "description",
        content:
          "Membres, abonnements actifs, abonnements à renouveler et argent encaissé aujourd'hui.",
      },
      { property: "og:title", content: "Accueil — Shogun Fighters" },
      {
        property: "og:description",
        content: "Le résumé du jour de votre salle de sport à Lomé.",
      },
    ],
  }),
  component: DashboardPage,
});

const kpis = [
  {
    icon: Users,
    label: "Membres",
    value: String(dashboardStats.activeMembers),
    tone: "bg-soft/15 text-soft",
  },
  {
    icon: CheckCircle2,
    label: "Abonnements actifs",
    value: String(dashboardStats.activeSubscriptions),
    tone: "bg-mint/25 text-success",
  },
  {
    icon: AlertTriangle,
    label: "À renouveler",
    value: String(dashboardStats.expiringSoon + dashboardStats.expired),
    tone: "bg-sun/30 text-warning",
  },
  {
    icon: Wallet,
    label: "Aujourd'hui",
    value: currency(dashboardStats.todayRevenue),
    tone: "bg-bubble/25 text-coral",
  },
];

const menuTiles: {
  to: string;
  label: string;
  hint: string;
  icon: typeof UserPlus;
  tone: string;
}[] = [
  {
    to: "/membres",
    label: "Voir les membres",
    hint: "Qui sont mes membres ?",
    icon: UserPlus,
    tone: "bg-soft/15 text-soft",
  },
  {
    to: "/abonnements",
    label: "Voir les abonnements",
    hint: "Qui est encore abonné ?",
    icon: CalendarClock,
    tone: "bg-mint/25 text-success",
  },
  {
    to: "/caisse",
    label: "Entrées et sorties",
    hint: "Argent entré et sorti",
    icon: ArrowLeftRight,
    tone: "bg-bubble/25 text-coral",
  },
  {
    to: "/statistiques",
    label: "Statistiques",
    hint: "Comment fonctionne ma salle ?",
    icon: BarChart3,
    tone: "bg-sun/30 text-warning",
  },
  {
    to: "/parametres",
    label: "Paramètres",
    hint: "Modifier mon espace",
    icon: Settings,
    tone: "bg-plate text-foreground/70",
  },
];

function DashboardPage() {
  const [modal, setModal] = useState<"member" | "renew" | "payment" | null>(null);

  return (
    <AppShell title="Accueil" subtitle="Que dois-je faire aujourd'hui ?">
      <div>
        <h2 className="font-display text-2xl leading-tight font-semibold">
          Bonjour {currentUser.fullName} 👋
        </h2>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          Voici votre salle en un coup d'œil.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="rounded-3xl bg-card p-4 ring-1 ring-border">
              <span className={`grid size-11 place-items-center rounded-2xl ${k.tone}`}>
                <Icon className="size-5" />
              </span>
              <p className="mt-3 font-display text-2xl leading-none font-semibold">
                {k.value}
              </p>
              <p className="mt-1.5 text-sm font-medium text-muted-foreground">{k.label}</p>
            </div>
          );
        })}
      </div>

      <SimpleAlert
        message={`${renewalQueue.length} abonnements doivent être renouvelés.`}
        action={
          <Link
            to="/abonnements"
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background"
          >
            Voir
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <BigButton className="w-full" onClick={() => setModal("member")}>
          <Plus className="size-5" /> Ajouter un membre
        </BigButton>
        <BigButton variant="outline" className="w-full" onClick={() => setModal("renew")}>
          <RefreshCw className="size-5" /> Renouveler un abonnement
        </BigButton>
        <BigButton
          variant="outline"
          className="w-full"
          onClick={() => setModal("payment")}
        >
          <Wallet className="size-5" /> Enregistrer un paiement
        </BigButton>
      </div>

      <Panel className="overflow-hidden p-0">
        <div className="bg-gradient-to-r from-soft to-bubble px-5 py-4">
          <h2 className="font-display text-lg leading-tight font-semibold text-soft-foreground">
            Menu principal
          </h2>
          <p className="text-sm text-soft-foreground/85">
            Choisissez ce que vous voulez faire
          </p>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
          {menuTiles.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.label}
                to={t.to}
                className="group flex items-center gap-4 rounded-3xl bg-plate p-4 ring-1 ring-transparent transition-colors hover:bg-card hover:ring-soft/30"
              >
                <span
                  className={`grid size-12 shrink-0 place-items-center rounded-2xl ${t.tone}`}
                >
                  <Icon className="size-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-base font-semibold">
                    {t.label}
                  </span>
                  <span className="block truncate text-sm text-muted-foreground">
                    {t.hint}
                  </span>
                </span>
                <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
              </Link>
            );
          })}
        </div>

        <p className="border-t border-border bg-cream px-5 py-3 text-center text-sm font-semibold text-muted-foreground">
          Licence accordée à SHOGUN FIGHTERS
        </p>
      </Panel>

      {modal === "member" && (
        <Modal title="Ajouter un membre" onClose={() => setModal(null)}>
          <AddMemberForm onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal === "renew" && (
        <Modal title="Renouveler un abonnement" onClose={() => setModal(null)}>
          <RenewForm onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal === "payment" && (
        <Modal title="Enregistrer un paiement" onClose={() => setModal(null)}>
          <PaymentForm onClose={() => setModal(null)} />
        </Modal>
      )}
    </AppShell>
  );
}
