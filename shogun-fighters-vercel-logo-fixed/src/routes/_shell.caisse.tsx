import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, Plus, Wallet } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Modal } from "@/components/forms";
import { BigButton, EmptyState, Field, Panel, fieldClass } from "@/components/ui-kit";
import {
  cashMovements,
  cashStats,
  currency,
  expenseCategories,
  formatDate,
  paymentMethods,
  type CashDirection,
  type CashMovement,
} from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/caisse")({
  head: () => ({
    meta: [
      { title: "Entrée et sortie de fonds — Shogun Fighters" },
      {
        name: "description",
        content:
          "Suivez l'argent qui entre et l'argent qui sort de la salle, avec le solde du mois en FCFA.",
      },
      { property: "og:title", content: "Entrée et sortie de fonds — Shogun Fighters" },
      {
        property: "og:description",
        content: "Encaissements, dépenses et solde du mois, sur une seule page.",
      },
    ],
  }),
  component: CashPage,
});

const filters = [
  { key: "ALL", label: "Tout" },
  { key: "IN", label: "Entrées" },
  { key: "OUT", label: "Sorties" },
] as const;

function CashPage() {
  const [filter, setFilter] = useState<"ALL" | CashDirection>("ALL");
  const [extra, setExtra] = useState<CashMovement[]>([]);
  const [open, setOpen] = useState(false);

  const all = [...extra, ...cashMovements];
  const list = filter === "ALL" ? all : all.filter((m) => m.direction === filter);

  const totalIn = cashStats.in + extra.filter((m) => m.direction === "IN").reduce((s, m) => s + m.amount, 0);
  const totalOut =
    cashStats.out + extra.filter((m) => m.direction === "OUT").reduce((s, m) => s + m.amount, 0);

  const cards = [
    {
      icon: ArrowDownCircle,
      label: "Argent entré ce mois",
      value: currency(totalIn),
      tone: "bg-mint/25 text-success",
    },
    {
      icon: ArrowUpCircle,
      label: "Argent sorti ce mois",
      value: currency(totalOut),
      tone: "bg-bubble/25 text-coral",
    },
    {
      icon: Wallet,
      label: "Solde du mois",
      value: currency(totalIn - totalOut),
      tone: "bg-soft/15 text-soft",
    },
  ];

  return (
    <AppShell title="Entrée et sortie de fonds">
      <div className="grid gap-3 sm:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="rounded-3xl bg-card p-4 ring-1 ring-border">
              <span className={`grid size-11 place-items-center rounded-2xl ${c.tone}`}>
                <Icon className="size-5" />
              </span>
              <p className="mt-3 font-display text-xl leading-none font-semibold">{c.value}</p>
              <p className="mt-1.5 text-sm font-medium text-muted-foreground">{c.label}</p>
            </div>
          );
        })}
      </div>

      <BigButton className="w-full sm:w-auto" onClick={() => setOpen(true)}>
        <Plus className="size-5" /> Enregistrer une sortie d'argent
      </BigButton>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold ${
              filter === f.key ? "bg-foreground text-background" : "bg-plate text-foreground/70"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <Panel className="p-4 sm:p-5">
        <h2 className="font-display text-lg font-semibold">Mouvements</h2>
        {list.length === 0 ? (
          <EmptyState title="Aucun mouvement pour le moment." />
        ) : (
          <ul className="mt-3 space-y-2.5">
            {list.map((m) => (
              <li
                key={m.id}
                className="flex flex-wrap items-center gap-3 rounded-2xl bg-plate px-4 py-3.5"
              >
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-2xl ${
                    m.direction === "IN" ? "bg-mint/30 text-success" : "bg-bubble/30 text-coral"
                  }`}
                >
                  {m.direction === "IN" ? (
                    <ArrowDownCircle className="size-5" />
                  ) : (
                    <ArrowUpCircle className="size-5" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-bold">{m.label}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {m.category} · {m.method} · {formatDate(m.date)}
                  </p>
                </div>
                <p
                  className={`text-base font-bold ${
                    m.direction === "IN" ? "text-success" : "text-coral"
                  }`}
                >
                  {m.direction === "IN" ? "+" : "−"} {currency(m.amount)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      {open && (
        <Modal title="Enregistrer une sortie d'argent" onClose={() => setOpen(false)}>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              const label = String(form.get("label") ?? "").trim();
              const amount = Number(form.get("amount"));
              if (!label || !amount) {
                toast.error("Écrivez le motif et le montant.");
                return;
              }
              setExtra((prev) => [
                {
                  id: `cash_out_new_${Date.now()}`,
                  organizationId: "org_1",
                  direction: "OUT",
                  label,
                  category: String(form.get("category")),
                  amount,
                  method: String(form.get("method")) as CashMovement["method"],
                  date: "2026-09-06",
                },
                ...prev,
              ]);
              setOpen(false);
              toast.success("Sortie d'argent enregistrée");
            }}
          >
            <Field label="Motif">
              <input name="label" className={fieldClass} placeholder="Ex : Salaire coach" />
            </Field>
            <Field label="Catégorie">
              <select name="category" className={fieldClass} defaultValue="Salaires">
                {expenseCategories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Montant (FCFA)">
              <input name="amount" type="number" min="0" className={fieldClass} placeholder="10000" />
            </Field>
            <Field label="Mode de paiement">
              <select name="method" className={fieldClass} defaultValue="Espèces">
                {paymentMethods.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </Field>
            <BigButton type="submit" className="w-full">
              Enregistrer
            </BigButton>
          </form>
        </Modal>
      )}
    </AppShell>
  );
}
