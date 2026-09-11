import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ActionButton, PageHeader, Panel, PanelHeader, Pill } from "@/components/ui-kit";
import { organization, teamUsers } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/parametres")({
  head: () => ({
    meta: [
      { title: "Paramètres — Shogun Fighters" },
      {
        name: "description",
        content:
          "Informations de la salle, équipe, rôles et préférences de rappel d'expiration.",
      },
      { property: "og:title", content: "Paramètres — Shogun Fighters" },
      {
        property: "og:description",
        content: "Configurez votre espace, votre équipe et vos rappels.",
      },
    ],
  }),
  component: SettingsPage,
});

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <input
        defaultValue={value}
        className="mt-1 w-full rounded-2xl bg-plate px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-soft/40"
      />
    </label>
  );
}

const reminders = [
  { label: "7 jours avant expiration", on: true },
  { label: "3 jours avant expiration", on: true },
  { label: "La veille de l'expiration", on: true },
  { label: "Le jour de l'expiration", on: true },
  { label: "Après expiration", on: false },
];

function SettingsPage() {
  return (
    <AppShell title="Paramètres" subtitle="Modifier mon espace">
      <PageHeader
        title="Paramètres"
        subtitle="Espace de la salle, équipe et règles de rappel"
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel className="p-5">
          <h2 className="font-display text-lg leading-tight font-semibold">
            Informations de la salle
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field label="Nom de la salle" value={organization.name} />
            <Field label="Ville" value={organization.city} />
            <Field label="Téléphone" value={organization.phone} />
            <Field label="Email" value={organization.email} />
            <div className="sm:col-span-2">
              <Field label="Adresse" value={organization.address} />
            </div>
            <Field label="Devise" value={organization.currency} />
          </div>
          <div className="mt-4">
            <ActionButton>Enregistrer</ActionButton>
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel>
            <PanelHeader
              title="Équipe & rôles"
              subtitle="Owner, Admin et Staff — un seul espace de données par salle"
              action={<ActionButton variant="ghost">Inviter</ActionButton>}
            />
            <ul className="divide-y divide-border">
              {teamUsers.map((u) => (
                <li key={u.id} className="flex items-center gap-3 px-5 py-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-soft/15 text-xs font-bold text-soft">
                    {u.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{u.fullName}</p>
                    <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                  </div>
                  <Pill tone={u.role === "Owner" ? "soft" : "muted"}>{u.role}</Pill>
                </li>
              ))}
            </ul>
            <div className="h-3" />
          </Panel>

          <Panel className="p-5">
            <h2 className="font-display text-lg leading-tight font-semibold">
              Rappels d'expiration
            </h2>
            <ul className="mt-3 space-y-2">
              {reminders.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-plate px-4 py-2.5"
                >
                  <span className="min-w-0 truncate text-sm">{r.label}</span>
                  <span
                    className={
                      r.on
                        ? "h-6 w-11 shrink-0 rounded-full bg-soft p-0.5"
                        : "h-6 w-11 shrink-0 rounded-full bg-muted-foreground/30 p-0.5"
                    }
                  >
                    <span
                      className={
                        r.on
                          ? "block size-5 translate-x-5 rounded-full bg-card transition-transform"
                          : "block size-5 rounded-full bg-card transition-transform"
                      }
                    />
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
