import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ActionButton, PageHeader, Panel, Pill } from "@/components/ui-kit";
import { activities, currency, subscriptions } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/activites")({
  head: () => ({
    meta: [
      { title: "Activités — Shogun Fighters" },
      {
        name: "description",
        content:
          "Configurez les activités de la salle : gym, fitness, arts martiaux, danse, aikido et tarifs mensuels.",
      },
      { property: "og:title", content: "Activités — Shogun Fighters" },
      {
        property: "og:description",
        content: "Tarifs mensuels et formules par activité.",
      },
    ],
  }),
  component: ActivitiesPage,
});

const plans = [
  { name: "Mensuel", months: 1, discount: "—" },
  { name: "Trimestriel", months: 3, discount: "−5 %" },
  { name: "Semestriel", months: 6, discount: "−10 %" },
  { name: "Annuel", months: 12, discount: "−15 %" },
];

const toneByColor = {
  soft: "soft",
  coral: "coral",
  mint: "mint",
  sun: "sun",
  bubble: "coral",
} as const;

function ActivitiesPage() {
  return (
    <AppShell title="Activités">
      <PageHeader
        title="Activités"
        subtitle="Chaque activité définit un tarif mensuel utilisé pour calculer le montant total"
        action={
          <ActionButton>
            <Plus className="size-3.5" /> Nouvelle activité
          </ActionButton>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {activities.map((a) => {
          const count = subscriptions.filter(
            (s) =>
              s.activityId === a.id &&
              (s.status === "ACTIVE" || s.status === "EXPIRING_SOON"),
          ).length;
          return (
            <Panel key={a.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="font-display text-lg leading-tight font-semibold">
                    {a.name}
                  </h2>
                  <p className="text-xs text-muted-foreground">Coach : {a.coach}</p>
                </div>
                <Pill tone={toneByColor[a.color]}>{a.activeMembers} membres</Pill>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-plate p-3">
                  <p className="text-[11px] text-muted-foreground">Tarif mensuel</p>
                  <p className="mt-0.5 font-display text-base font-semibold">
                    {currency(a.monthlyPrice)}
                  </p>
                </div>
                <div className="rounded-2xl bg-cream p-3">
                  <p className="text-[11px] text-muted-foreground">Abonnements en cours</p>
                  <p className="mt-0.5 font-display text-base font-semibold">{count}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <ActionButton variant="ghost">Modifier</ActionButton>
                <ActionButton variant="quiet">Désactiver</ActionButton>
              </div>
            </Panel>
          );
        })}
      </div>

      <Panel>
        <div className="px-5 pt-5 pb-2">
          <h2 className="font-display text-lg leading-tight font-semibold">
            Formules disponibles
          </h2>
          <p className="text-xs text-muted-foreground">
            Le montant total est calculé : tarif mensuel × nombre de mois, remise incluse.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="text-left text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                <th className="px-5 py-3 font-semibold">Formule</th>
                <th className="px-4 py-3 font-semibold">Durée</th>
                <th className="px-4 py-3 font-semibold">Remise</th>
                <th className="px-5 py-3 font-semibold">Exemple (Gym)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {plans.map((p) => (
                <tr key={p.name} className="transition-colors hover:bg-cream">
                  <td className="px-5 py-3 font-semibold">{p.name}</td>
                  <td className="px-4 py-3 text-foreground/80">{p.months} mois</td>
                  <td className="px-4 py-3 text-foreground/80">{p.discount}</td>
                  <td className="px-5 py-3 font-semibold">
                    {currency(20000 * p.months)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h-3" />
      </Panel>
    </AppShell>
  );
}
