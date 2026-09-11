import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  BigButton,
  EmptyState,
  Panel,
  StatusDot,
} from "@/components/ui-kit";
import { AddMemberForm, Modal } from "@/components/forms";
import { activityById, latestSubscription, members } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/membres/")({
  head: () => ({
    meta: [
      { title: "Membres — Shogun Fighters" },
      {
        name: "description",
        content: "La liste des membres de la salle : nom, téléphone, activité et statut.",
      },
      { property: "og:title", content: "Membres — Shogun Fighters" },
      {
        property: "og:description",
        content: "Cherchez un membre et voyez si son abonnement est encore valable.",
      },
    ],
  }),
  component: MembersPage,
});

function MembersPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter(
      (m) =>
        !q ||
        `${m.firstName} ${m.lastName} ${m.memberNumber} ${m.phone}`
          .toLowerCase()
          .includes(q),
    );
  }, [query]);

  return (
    <AppShell title="Membres" subtitle="Qui sont mes membres ?">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <label className="flex items-center gap-2.5 rounded-2xl bg-card px-4 py-3.5 ring-1 ring-border">
          <Search className="size-5 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un nom ou un téléphone"
            className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
        </label>
        <BigButton onClick={() => setOpen(true)}>
          <Plus className="size-5" /> Nouveau membre
        </BigButton>
      </div>

      {rows.length === 0 ? (
        <Panel>
          <EmptyState
            title="Aucun membre pour le moment."
            action={
              <BigButton onClick={() => setOpen(true)}>
                <Plus className="size-5" /> Ajouter un membre
              </BigButton>
            }
          />
        </Panel>
      ) : (
        <ul className="grid gap-3 lg:grid-cols-2">
          {rows.map((m) => {
            const sub = latestSubscription(m.id);
            return (
              <li
                key={m.id}
                className="flex flex-wrap items-center gap-3 rounded-3xl bg-card p-4 ring-1 ring-border"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-bold">
                    {m.firstName} {m.lastName}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">{m.phone}</p>
                  <p className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                    <span className="font-semibold text-foreground/80">
                      {sub ? activityById(sub.activityId)?.name : "Aucune activité"}
                    </span>
                    {sub && <StatusDot status={sub.status} />}
                  </p>
                </div>
                <Link
                  to="/membres/$memberId"
                  params={{ memberId: m.id }}
                  className="rounded-full bg-soft px-6 py-3 text-sm font-bold text-soft-foreground"
                >
                  Voir
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {open && (
        <Modal title="Ajouter un membre" onClose={() => setOpen(false)}>
          <AddMemberForm onClose={() => setOpen(false)} />
        </Modal>
      )}
    </AppShell>
  );
}
