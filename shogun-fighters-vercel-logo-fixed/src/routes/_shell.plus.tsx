import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  Dumbbell,
  ReceiptText,
  Settings,
  ChevronRight,
  LogOut,
  MessageCircle,
  ArrowLeftRight,
  BarChart3,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Panel } from "@/components/ui-kit";
import { notifications } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/plus")({
  head: () => ({
    meta: [
      { title: "Plus — Shogun Fighters" },
      {
        name: "description",
        content: "Activités, reçus, notifications et paramètres de la salle.",
      },
      { property: "og:title", content: "Plus — Shogun Fighters" },
      {
        property: "og:description",
        content: "Accédez aux activités, aux reçus, aux alertes et aux réglages.",
      },
    ],
  }),
  component: MorePage,
});

const unread = notifications.filter((n) => !n.read).length;

const links = [
  { to: "/activites", label: "Activités", hint: "Gym, Karaté, Danse…", icon: Dumbbell },
  { to: "/recus", label: "Reçus", hint: "Voir et imprimer", icon: ReceiptText },
  { to: "/notifications", label: "Notifications", hint: "Rappels d'expiration", icon: Bell },
  {
    to: "/rappels",
    label: "Rappels WhatsApp / SMS",
    hint: "Prévenir les membres 7 jours avant",
    icon: MessageCircle,
  },
  {
    to: "/caisse",
    label: "Entrée et sortie de fonds",
    hint: "Encaissements et dépenses",
    icon: ArrowLeftRight,
  },
  { to: "/statistiques", label: "Statistiques", hint: "Chiffres du mois", icon: BarChart3 },
  { to: "/parametres", label: "Paramètres", hint: "Salle et équipe", icon: Settings },
] as const;

function MorePage() {
  return (
    <AppShell title="Plus">
      <Panel>
        <ul className="divide-y divide-border">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="flex items-center gap-4 px-5 py-5 transition-colors hover:bg-cream"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-soft/15">
                    <Icon className="size-5 text-soft" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-bold">{l.label}</span>
                    <span className="block text-sm text-muted-foreground">{l.hint}</span>
                  </span>
                  {l.to === "/notifications" && unread > 0 && (
                    <span className="rounded-full bg-coral px-2.5 py-1 text-xs font-bold text-soft-foreground">
                      {unread}
                    </span>
                  )}
                  <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              to="/"
              className="flex items-center gap-4 px-5 py-5 transition-colors hover:bg-cream"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-plate">
                <LogOut className="size-5 text-muted-foreground" />
              </span>
              <span className="min-w-0 flex-1 text-base font-bold">Se déconnecter</span>
              <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
            </Link>
          </li>
        </ul>
      </Panel>
    </AppShell>
  );
}
