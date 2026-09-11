import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { BigButton, EmptyState, Panel } from "@/components/ui-kit";
import { Modal, PaymentForm } from "@/components/forms";
import {
  currency,
  dashboardStats,
  formatDate,
  memberById,
  paymentMethods,
  payments,
  receipts,
} from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/paiements")({
  head: () => ({
    meta: [
      { title: "Paiements — Shogun Fighters" },
      {
        name: "description",
        content:
          "L'argent encaissé par la salle : montant, membre, date et mode de paiement.",
      },
      { property: "og:title", content: "Paiements — Shogun Fighters" },
      {
        property: "og:description",
        content: "Espèces, TMoney, Flooz ou carte : tout est enregistré en FCFA.",
      },
    ],
  }),
  component: PaymentsPage,
});

const filters = ["Tous", ...paymentMethods] as const;

function PaymentsPage() {
  const [method, setMethod] = useState<string>("Tous");
  const [open, setOpen] = useState(false);

  const rows = useMemo(
    () =>
      payments
        .filter((p) => (method === "Tous" ? true : p.method === method))
        .sort((a, b) => `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`)),
    [method],
  );

  return (
    <AppShell title="Paiements" subtitle="Qui a payé ?">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="rounded-3xl bg-card p-4 ring-1 ring-border">
          <p className="text-sm font-medium text-muted-foreground">Encaissé aujourd'hui</p>
          <p className="font-display text-2xl font-semibold">
            {currency(dashboardStats.todayRevenue)}
          </p>
        </div>
        <BigButton onClick={() => setOpen(true)}>
          <Plus className="size-5" /> Enregistrer un paiement
        </BigButton>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((m) => (
          <button
            key={m}
            onClick={() => setMethod(m)}
            className={
              method === m
                ? "rounded-full bg-soft px-5 py-2.5 text-sm font-bold text-soft-foreground"
                : "rounded-full bg-card px-5 py-2.5 text-sm font-semibold text-foreground/75 ring-1 ring-border"
            }
          >
            {m}
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <Panel>
          <EmptyState title="Aucun paiement pour le moment." />
        </Panel>
      ) : (
        <ul className="grid gap-3 lg:grid-cols-2">
          {rows.map((p) => {
            const member = memberById(p.memberId)!;
            const receipt = receipts.find((r) => r.paymentId === p.id);
            return (
              <li
                key={p.id}
                className="flex flex-wrap items-center gap-3 rounded-3xl bg-card p-4 ring-1 ring-border"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-display text-xl font-semibold">
                    {p.amount < 0 ? "−" : ""}
                    {currency(Math.abs(p.amount))}
                  </p>
                  <p className="truncate text-base font-bold">
                    {member.firstName} {member.lastName}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {formatDate(p.date)} · {p.method}
                  </p>
                </div>
                <Link
                  to="/recus"
                  className="rounded-full bg-card px-5 py-3 text-sm font-bold text-soft ring-1 ring-soft/25"
                >
                  {receipt ? "Voir le reçu" : "Reçu"}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {open && (
        <Modal title="Enregistrer un paiement" onClose={() => setOpen(false)}>
          <PaymentForm onClose={() => setOpen(false)} />
        </Modal>
      )}
    </AppShell>
  );
}
