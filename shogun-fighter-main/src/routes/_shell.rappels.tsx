import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Smartphone, Send, Check } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { BigButton, EmptyState, Field, Panel, SimpleAlert, fieldClass } from "@/components/ui-kit";
import {
  activityById,
  daysLeft,
  formatDate,
  memberById,
  organization,
  subscriptions,
  type Subscription,
} from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/rappels")({
  head: () => ({
    meta: [
      { title: "Rappels — Shogun Fighters" },
      {
        name: "description",
        content:
          "Prévenez chaque membre par WhatsApp ou SMS 7 jours avant la fin de son abonnement.",
      },
      { property: "og:title", content: "Rappels — Shogun Fighters" },
      {
        property: "og:description",
        content: "Un message tout prêt pour chaque membre dont l'abonnement se termine bientôt.",
      },
    ],
  }),
  component: RemindersPage,
});

/** Abonnements qui se terminent dans 7 jours ou moins (et pas encore terminés). */
const dueSoon: Subscription[] = subscriptions
  .filter((s) => {
    const d = daysLeft(s.endDate);
    return d >= 0 && d <= 7;
  })
  .sort((a, b) => daysLeft(a.endDate) - daysLeft(b.endDate));

const buildMessage = (s: Subscription) => {
  const member = memberById(s.memberId)!;
  const activity = activityById(s.activityId)?.name ?? "";
  return `Bonjour ${member.firstName}, votre abonnement ${activity} à ${organization.name} se termine le ${formatDate(s.endDate)}. Passez à la salle pour le renouveler. Merci !`;
};

function RemindersPage() {
  const [sent, setSent] = useState<Record<string, string>>({});
  const [auto, setAuto] = useState(true);
  const [template, setTemplate] = useState(
    "Bonjour {prenom}, votre abonnement {activite} à {salle} se termine le {date}. Passez à la salle pour le renouveler. Merci !",
  );

  const send = (s: Subscription, channel: "WhatsApp" | "SMS") => {
    const member = memberById(s.memberId)!;
    setSent((prev) => ({ ...prev, [s.id]: channel }));
    toast.success(`Rappel ${channel} envoyé à ${member.firstName} ${member.lastName}`, {
      description: "Démonstration : aucun message réel n'est envoyé.",
    });
  };

  const sendAll = () => {
    const all: Record<string, string> = {};
    dueSoon.forEach((s) => (all[s.id] = "WhatsApp"));
    setSent(all);
    toast.success(`${dueSoon.length} rappels envoyés par WhatsApp`, {
      description: "Démonstration : aucun message réel n'est envoyé.",
    });
  };

  return (
    <AppShell title="Rappels" subtitle="Qui doit renouveler ?">
      <SimpleAlert message="Démonstration : les messages ne partent pas encore réellement." />

      <Panel className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-semibold">Rappel automatique</h2>
            <p className="text-sm text-muted-foreground">
              Envoyer un message 7 jours avant la fin de l'abonnement.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAuto((v) => !v)}
            aria-pressed={auto}
            className={`rounded-full px-6 py-3 text-sm font-bold ${
              auto ? "bg-success text-background" : "bg-plate text-muted-foreground"
            }`}
          >
            {auto ? "Activé" : "Désactivé"}
          </button>
        </div>

        <div className="mt-4">
          <Field label="Message envoyé aux membres">
            <textarea
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              rows={3}
              className={fieldClass}
            />
          </Field>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {"{prenom}"}, {"{activite}"}, {"{salle}"} et {"{date}"} sont remplacés
            automatiquement.
          </p>
        </div>
      </Panel>

      <Panel className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="min-w-0 flex-1 font-display text-lg font-semibold">
            À prévenir cette semaine ({dueSoon.length})
          </h2>
          {dueSoon.length > 0 && (
            <BigButton onClick={sendAll}>
              <Send className="size-5" /> Tout envoyer
            </BigButton>
          )}
        </div>

        {dueSoon.length === 0 ? (
          <EmptyState title="Personne à prévenir pour le moment." />
        ) : (
          <ul className="mt-3 space-y-3">
            {dueSoon.map((s) => {
              const member = memberById(s.memberId)!;
              const done = sent[s.id];
              return (
                <li key={s.id} className="rounded-2xl bg-plate p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-bold">
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="truncate text-sm text-muted-foreground">
                        {member.phone} · {activityById(s.activityId)?.name} · fin le{" "}
                        {formatDate(s.endDate)}
                      </p>
                    </div>
                    <Link
                      to="/membres/$memberId"
                      params={{ memberId: member.id }}
                      className="rounded-full bg-card px-5 py-2.5 text-sm font-bold text-soft ring-1 ring-soft/25"
                    >
                      Voir
                    </Link>
                  </div>

                  <p className="mt-3 rounded-2xl bg-card px-4 py-3 text-sm text-muted-foreground">
                    {buildMessage(s)}
                  </p>

                  {done ? (
                    <p className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-success">
                      <Check className="size-4" /> Rappel envoyé par {done}
                    </p>
                  ) : (
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      <BigButton onClick={() => send(s, "WhatsApp")}>
                        <MessageCircle className="size-5" /> WhatsApp
                      </BigButton>
                      <BigButton variant="outline" onClick={() => send(s, "SMS")}>
                        <Smartphone className="size-5" /> SMS
                      </BigButton>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Panel>
    </AppShell>
  );
}
