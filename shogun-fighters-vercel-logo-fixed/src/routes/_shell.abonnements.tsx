import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { EmptyState, Panel, StatusDot } from "@/components/ui-kit";
import { Modal, RenewForm } from "@/components/forms";
import {
  activityById,
  formatDate,
  memberById,
  subscriptions,
  type SubscriptionStatus,
} from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/abonnements")({
  head: () => ({
    meta: [
      { title: "Abonnements — Shogun Fighters" },
      {
        name: "description",
        content:
          "Les abonnements de la salle : membre, activité, date de fin et renouvellement.",
      },
      { property: "og:title", content: "Abonnements — Shogun Fighters" },
      {
        property: "og:description",
        content: "Voyez qui doit renouveler et renouvelez en un clic.",
      },
    ],
  }),
  component: SubscriptionsPage,
});

const tabs: { key: SubscriptionStatus | "ALL"; label: string }[] = [
  { key: "ALL", label: "Tous" },
  { key: "ACTIVE", label: "🟢 Actifs" },
  { key: "EXPIRING_SOON", label: "🟠 Bientôt" },
  { key: "EXPIRED", label: "🔴 Expirés" },
];

function SubscriptionsPage() {
  const [tab, setTab] = useState<SubscriptionStatus | "ALL">("ALL");
  const [renewId, setRenewId] = useState<string | null>(null);

  const rows = useMemo(
    () =>
      subscriptions
        .filter((s) => (tab === "ALL" ? true : s.status === tab))
        .sort((a, b) => a.endDate.localeCompare(b.endDate)),
    [tab],
  );

  return (
    <AppShell title="Abonnements" subtitle="Qui est encore abonné ?">
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={
              tab === t.key
                ? "rounded-full bg-soft px-5 py-2.5 text-sm font-bold text-soft-foreground"
                : "rounded-full bg-card px-5 py-2.5 text-sm font-semibold text-foreground/75 ring-1 ring-border"
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <Panel>
          <EmptyState title="Aucun abonnement dans cette liste." />
        </Panel>
      ) : (
        <ul className="grid gap-3 lg:grid-cols-2">
          {rows.map((s) => {
            const member = memberById(s.memberId)!;
            return (
              <li
                key={s.id}
                className="flex flex-wrap items-center gap-3 rounded-3xl bg-card p-4 ring-1 ring-border"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-bold">
                    {member.firstName} {member.lastName}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {activityById(s.activityId)?.name} · fin le {formatDate(s.endDate)}
                  </p>
                  <p className="mt-2">
                    <StatusDot status={s.status} />
                  </p>
                </div>
                <button
                  onClick={() => setRenewId(s.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-soft px-6 py-3 text-sm font-bold text-soft-foreground"
                >
                  <RefreshCw className="size-4" /> Renouveler
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {renewId && (
        <Modal title="Renouveler un abonnement" onClose={() => setRenewId(null)}>
          <RenewForm subscriptionId={renewId} onClose={() => setRenewId(null)} />
        </Modal>
      )}
    </AppShell>
  );
}
