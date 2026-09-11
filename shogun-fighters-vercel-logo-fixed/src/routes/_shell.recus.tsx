import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Printer } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { BigButton, Panel } from "@/components/ui-kit";
import {
  activityById,
  currency,
  formatDate,
  memberById,
  organization,
  paymentById,
  receipts,
  subscriptionById,
} from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/recus")({
  head: () => ({
    meta: [
      { title: "Reçus — Shogun Fighters" },
      {
        name: "description",
        content:
          "Générez et imprimez des reçus professionnels pour chaque paiement d'abonnement.",
      },
      { property: "og:title", content: "Reçus — Shogun Fighters" },
      {
        property: "og:description",
        content: "Reçus numérotés, prêts à imprimer, aux couleurs de la salle.",
      },
    ],
  }),
  component: ReceiptsPage,
});

function ReceiptsPage() {
  const [selectedId, setSelectedId] = useState(receipts[0]!.id);
  const receipt = receipts.find((r) => r.id === selectedId)!;
  const member = memberById(receipt.memberId)!;
  const sub = subscriptionById(receipt.subscriptionId)!;
  const payment = paymentById(receipt.paymentId)!;
  const activity = activityById(sub.activityId)!;

  return (
    <AppShell title="Reçus">
      <div className="no-print">
        <BigButton className="w-full sm:w-auto" onClick={() => window.print()}>
          <Printer className="size-5" /> Imprimer le reçu
        </BigButton>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel className="no-print xl:col-span-1">
          <div className="px-5 pt-5 pb-2">
            <h2 className="font-display text-lg leading-tight font-semibold">
              Derniers reçus
            </h2>
          </div>
          <ul className="divide-y divide-border">
            {receipts.map((r) => {
              const m = memberById(r.memberId)!;
              const p = paymentById(r.paymentId)!;
              const active = r.id === selectedId;
              return (
                <li key={r.id}>
                  <button
                    onClick={() => setSelectedId(r.id)}
                    className={
                      active
                        ? "flex w-full items-center gap-3 bg-cream px-5 py-3 text-left"
                        : "flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-cream"
                    }
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{r.number}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {m.firstName} {m.lastName} · {formatDate(r.issuedAt)}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-bold">
                      {currency(Math.abs(p.amount))}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="h-3" />
        </Panel>

        <Panel className="print-sheet overflow-hidden xl:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4 bg-gradient-to-r from-soft to-bubble px-6 py-6 text-soft-foreground">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src="/shogun-fighters-logo.png"
                alt={`Logo ${organization.name}`}
                className="size-12 shrink-0 rounded-2xl bg-card object-contain p-1"
              />
              <div className="min-w-0">
                <p className="font-display text-xl leading-tight font-semibold">
                  {organization.name}
                </p>
                <p className="text-xs opacity-90">{organization.address}</p>
                <p className="text-xs opacity-90">
                  {organization.phone} · {organization.email}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[11px] tracking-[0.14em] uppercase opacity-90">Reçu</p>
              <p className="font-display text-lg font-semibold">{receipt.number}</p>
              <p className="text-xs opacity-90">{formatDate(receipt.issuedAt)}</p>
            </div>
          </div>

          <div className="grid gap-4 px-6 py-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-plate p-4">
              <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
                Membre
              </p>
              <p className="mt-1 font-display text-base font-semibold">
                {member.firstName} {member.lastName}
              </p>
              <p className="text-xs text-muted-foreground">N° {member.memberNumber}</p>
              <p className="text-xs text-muted-foreground">{member.phone}</p>
            </div>
            <div className="rounded-2xl bg-cream p-4">
              <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
                Période d'abonnement
              </p>
              <p className="mt-1 font-display text-base font-semibold">{activity.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(sub.startDate)} → {formatDate(sub.endDate)}
              </p>
              <p className="text-xs text-muted-foreground">
                Formule {sub.plan} · renouvellement n°{sub.renewalNumber}
              </p>
            </div>
          </div>

          <div className="px-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                  <th className="py-2 font-semibold">Désignation</th>
                  <th className="py-2 font-semibold">Montant unitaire</th>
                  <th className="py-2 font-semibold">Mois</th>
                  <th className="py-2 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 font-semibold">Abonnement {activity.name}</td>
                  <td className="py-3 text-foreground/80">
                    {currency(sub.monthlyAmount)}
                  </td>
                  <td className="py-3 text-foreground/80">{sub.months}</td>
                  <td className="py-3 text-right font-semibold">
                    {currency(sub.totalAmount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4 px-6 py-6">
            <div className="text-xs text-muted-foreground">
              <p>Moyen de paiement : {payment.method}</p>
              <p>Encaissé le {formatDate(payment.date)} à {payment.time}</p>
              <div className="mt-6 w-44 border-t border-dashed border-border pt-1">
                Signature / cachet
              </div>
            </div>
            <div className="rounded-2xl bg-soft px-5 py-4 text-right text-soft-foreground">
              <p className="text-[11px] tracking-wide uppercase opacity-90">
                Montant total réglé
              </p>
              <p className="font-display text-2xl font-semibold">
                {currency(sub.totalAmount)}
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
