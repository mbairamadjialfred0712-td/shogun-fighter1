import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { EmptyState, Panel, SimpleAlert } from "@/components/ui-kit";
import { notifications, renewalQueue, type AppNotification } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Shogun Fighters" },
      {
        name: "description",
        content:
          "Les rappels d'expiration des abonnements : 7 jours, 3 jours, demain, aujourd'hui.",
      },
      { property: "og:title", content: "Notifications — Shogun Fighters" },
      {
        property: "og:description",
        content: "Sachez qui doit renouveler son abonnement, sans rien oublier.",
      },
    ],
  }),
  component: NotificationsPage,
});

const levelLabel: Record<AppNotification["level"], string> = {
  TODAY: "🔴 Aujourd'hui",
  TOMORROW: "🔴 Demain",
  D3: "🟠 Dans 3 jours",
  D7: "🟠 Dans 7 jours",
  EXPIRED: "🔴 Expiré",
};

function NotificationsPage() {
  return (
    <AppShell title="Notifications">
      <SimpleAlert
        message={`${renewalQueue.length} abonnements arrivent à expiration`}
        action={
          <Link
            to="/rappels"
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background"
          >
            Voir
          </Link>
        }
      />

      {notifications.length === 0 ? (
        <Panel>
          <EmptyState title="Aucune alerte pour le moment." />
        </Panel>
      ) : (
        <ul className="grid gap-3 lg:grid-cols-2">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="flex flex-wrap items-center gap-3 rounded-3xl bg-card p-4 ring-1 ring-border"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-muted-foreground">
                  {levelLabel[n.level]}
                </p>
                <p className="truncate text-base font-bold">{n.title}</p>
                <p className="truncate text-sm text-muted-foreground">{n.message}</p>
              </div>
              <Link
                to="/membres/$memberId"
                params={{ memberId: n.memberId }}
                className="rounded-full bg-soft px-6 py-3 text-sm font-bold text-soft-foreground"
              >
                Voir
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
