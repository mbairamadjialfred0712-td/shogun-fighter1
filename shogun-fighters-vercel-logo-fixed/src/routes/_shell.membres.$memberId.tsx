import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, MapPin, Phone, RefreshCw } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Modal, RenewForm } from "@/components/forms";
import {
  Avatar,
  BigButton,
  DaysLeftPill,
  MemberStatusBadge,
  Panel,
  PanelHeader,
  StatusBadge,
} from "@/components/ui-kit";
import {
  activityById,
  currency,
  daysLeft,
  formatDate,
  memberById,
  payments,
  receipts,
  subscriptions,
} from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/membres/$memberId")({
  head: () => ({
    meta: [
      { title: "Fiche membre — Shogun Fighters" },
      {
        name: "description",
        content:
          "Historique complet d'un membre : abonnements, paiements et reçus émis.",
      },
      { property: "og:title", content: "Fiche membre — Shogun Fighters" },
      {
        property: "og:description",
        content: "Consultez l'historique d'un membre de votre salle.",
      },
    ],
  }),
  component: MemberDetailPage,
});

function MemberDetailPage() {
  const { memberId } = Route.useParams();
  const [renewOpen, setRenewOpen] = useState(false);
  const member = memberById(memberId);

  if (!member) {
    return (
      <AppShell title="Membre introuvable">
        <Panel className="p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Ce membre n'existe pas ou a été supprimé.
          </p>
          <Link
            to="/membres"
            className="mt-4 inline-flex rounded-full bg-soft px-4 py-2 text-xs font-semibold text-soft-foreground"
          >
            Retour aux membres
          </Link>
        </Panel>
      </AppShell>
    );
  }

  const memberSubs = subscriptions
    .filter((s) => s.memberId === member.id)
    .sort((a, b) => b.startDate.localeCompare(a.startDate));
  const memberPayments = payments.filter((p) => p.memberId === member.id);
  const memberReceipts = receipts.filter((r) => r.memberId === member.id);
  const current = memberSubs.find(
    (s) => s.status === "ACTIVE" || s.status === "EXPIRING_SOON",
  );
  const totalPaid = memberPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <AppShell title={`${member.firstName} ${member.lastName}`}>
      <Link
        to="/membres"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-soft"
      >
        <ArrowLeft className="size-3.5" /> Retour aux membres
      </Link>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel className="p-5 xl:col-span-1">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar
              name={`${member.firstName} ${member.lastName}`}
              className="size-14 rounded-3xl text-base"
            />
            <div className="min-w-0">
              <h2 className="truncate font-display text-xl leading-tight font-semibold">
                {member.firstName} {member.lastName}
              </h2>
              <p className="text-xs text-muted-foreground">{member.memberNumber}</p>
            </div>
          </div>
          <div className="mt-3">
            <MemberStatusBadge status={member.status} />
          </div>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 truncate">{member.phone}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 truncate">{member.address}</span>
            </div>
          </dl>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-plate p-3">
              <p className="text-[11px] text-muted-foreground">Inscrit le</p>
              <p className="mt-0.5 text-sm font-semibold">{formatDate(member.joinedAt)}</p>
            </div>
            <div className="rounded-2xl bg-plate p-3">
              <p className="text-[11px] text-muted-foreground">Total encaissé</p>
              <p className="mt-0.5 text-sm font-semibold">{currency(totalPaid)}</p>
            </div>
          </div>

          {member.notes && (
            <div className="mt-3 rounded-2xl bg-cream p-3">
              <p className="text-[11px] text-muted-foreground">Note interne</p>
              <p className="mt-0.5 text-sm">{member.notes}</p>
            </div>
          )}

          <div className="mt-5">
            <BigButton className="w-full" onClick={() => setRenewOpen(true)}>
              <RefreshCw className="size-5" /> Renouveler
            </BigButton>
          </div>
        </Panel>

        <div className="space-y-4 xl:col-span-2">
          {current && (
            <Panel className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Abonnement en cours</p>
                  <p className="font-display text-lg font-semibold">
                    {activityById(current.activityId)?.name} · {current.plan}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(current.startDate)} → {formatDate(current.endDate)} ·
                    renouvellement n°{current.renewalNumber}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <DaysLeftPill days={daysLeft(current.endDate)} />
                  <StatusBadge status={current.status} />
                </div>
              </div>
            </Panel>
          )}

          <Panel>
            <PanelHeader title="Historique des abonnements" />
            <ul className="divide-y divide-border">
              {memberSubs.map((s) => (
                <li key={s.id} className="flex flex-wrap items-center gap-3 px-5 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">
                      {activityById(s.activityId)?.name} · {s.months} mois
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {formatDate(s.startDate)} → {formatDate(s.endDate)}
                    </p>
                  </div>
                  <span className="text-sm font-bold">{currency(s.totalAmount)}</span>
                  <StatusBadge status={s.status} />
                </li>
              ))}
            </ul>
            <div className="h-2" />
          </Panel>

          <Panel>
            <PanelHeader
              title="Paiements & reçus"
              subtitle={`${memberReceipts.length} reçus disponibles`}
            />
            <ul className="divide-y divide-border">
              {memberPayments.length === 0 && (
                <li className="px-5 py-8 text-center text-sm text-muted-foreground">
                  Aucun paiement enregistré pour ce membre.
                </li>
              )}
              {memberPayments.map((p) => {
                const receipt = receipts.find((r) => r.paymentId === p.id);
                return (
                  <li key={p.id} className="flex flex-wrap items-center gap-3 px-5 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {p.kind} · {p.method}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(p.date)} à {p.time} · {receipt?.number}
                      </p>
                    </div>
                    <span
                      className={
                        p.amount < 0
                          ? "text-sm font-bold text-coral"
                          : "text-sm font-bold text-success"
                      }
                    >
                      {p.amount < 0 ? "−" : "+"}
                      {currency(Math.abs(p.amount))}
                    </span>
                    <Link
                      to="/recus"
                      className="rounded-full bg-soft/10 px-3.5 py-2 text-xs font-semibold text-soft ring-1 ring-soft/20"
                    >
                      Reçu
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="h-3" />
          </Panel>
        </div>
      </div>

      {renewOpen && (
        <Modal title="Renouveler un abonnement" onClose={() => setRenewOpen(false)}>
          <RenewForm
            subscriptionId={current?.id}
            onClose={() => setRenewOpen(false)}
          />
        </Modal>
      )}
    </AppShell>
  );
}
