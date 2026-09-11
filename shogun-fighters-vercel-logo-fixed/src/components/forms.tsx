import { useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { toast } from "sonner";
import { BigButton, Field, fieldClass } from "@/components/ui-kit";
import {
  TODAY,
  activities,
  activityById,
  addMonths,
  currency,
  formatDate,
  latestSubscription,
  memberName,
  members,
  paymentMethods,
  subscriptions,
} from "@/lib/mock-data";

/* ---------- Fenêtre simple ---------- */

export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        aria-label="Fermer"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/50"
      />
      <div className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-card p-5 sm:max-w-md sm:rounded-3xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold">{title}</h2>
          <button
            aria-label="Fermer"
            onClick={onClose}
            className="grid size-10 shrink-0 place-items-center rounded-full bg-plate"
          >
            <X className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

const durations = [
  { months: 1, label: "1 mois" },
  { months: 3, label: "3 mois" },
  { months: 6, label: "6 mois" },
  { months: 12, label: "12 mois" },
];

/* ---------- Renouveler un abonnement ---------- */

export function RenewForm({
  subscriptionId,
  onClose,
}: {
  subscriptionId?: string | undefined;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const preset = subscriptionId ? subscriptions.find((s) => s.id === subscriptionId) : undefined;

  const [memberId, setMemberId] = useState(preset?.memberId ?? members[0]!.id);
  const [activityId, setActivityId] = useState(preset?.activityId ?? activities[0]!.id);
  const [months, setMonths] = useState(preset?.months ?? 1);
  const [method, setMethod] = useState(paymentMethods[0]!);

  const activity = activityById(activityId)!;
  const amount = activity.monthlyPrice * months;
  const current = latestSubscription(memberId);
  const start = current && current.endDate > TODAY ? current.endDate : TODAY;
  const newEnd = addMonths(start, months);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onClose();
        toast.success("Abonnement renouvelé.", {
          description: `${memberName(memberId)} · jusqu'au ${formatDate(newEnd)}`,
          action: { label: "Voir le reçu", onClick: () => navigate({ to: "/recus" }) },
        });
      }}
    >
      <Field label="Membre">
        <select
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          disabled={Boolean(preset)}
          className={fieldClass}
        >
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.firstName} {m.lastName}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Activité">
        <select
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
          className={fieldClass}
        >
          {activities.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} — {currency(a.monthlyPrice)} / mois
            </option>
          ))}
        </select>
      </Field>

      <Field label="Durée">
        <div className="grid grid-cols-4 gap-2">
          {durations.map((d) => (
            <button
              key={d.months}
              type="button"
              onClick={() => setMonths(d.months)}
              className={
                months === d.months
                  ? "rounded-2xl bg-soft py-3 text-sm font-bold text-soft-foreground"
                  : "rounded-2xl bg-plate py-3 text-sm font-semibold text-foreground/80"
              }
            >
              {d.label}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Montant à payer">
        <p className={`${fieldClass} font-display text-xl font-semibold`}>
          {currency(amount)}
        </p>
      </Field>

      <Field label="Mode de paiement">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as typeof method)}
          className={fieldClass}
        >
          {paymentMethods.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </Field>

      <div className="rounded-2xl bg-mint/20 px-4 py-3 text-sm font-semibold text-success">
        Nouvelle date de fin calculée : {formatDate(newEnd)}
      </div>

      <BigButton type="submit" className="w-full">
        Enregistrer
      </BigButton>
    </form>
  );
}

/* ---------- Ajouter un membre ---------- */

export function AddMemberForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+228 ");
  const [activityId, setActivityId] = useState(activities[0]!.id);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim()) {
          toast.error("Écrivez le nom du membre.");
          return;
        }
        onClose();
        toast.success("Membre ajouté.", { description: name.trim() });
      }}
    >
      <Field label="Nom du membre">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex : Moussa Koné"
          className={fieldClass}
        />
      </Field>
      <Field label="Téléphone">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+228 90 00 00 00"
          inputMode="tel"
          className={fieldClass}
        />
      </Field>
      <Field label="Activité">
        <select
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
          className={fieldClass}
        >
          {activities.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </Field>
      <BigButton type="submit" className="w-full">
        Enregistrer
      </BigButton>
    </form>
  );
}

/* ---------- Enregistrer un paiement ---------- */

export function PaymentForm({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState(members[0]!.id);
  const [amount, setAmount] = useState("10000");
  const [method, setMethod] = useState(paymentMethods[0]!);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const value = Number(amount);
        if (!value || value <= 0) {
          toast.error("Écrivez un montant en FCFA.");
          return;
        }
        onClose();
        toast.success("Paiement enregistré avec succès.", {
          description: `${memberName(memberId)} · ${currency(value)} · ${method}`,
          action: { label: "Voir le reçu", onClick: () => navigate({ to: "/recus" }) },
        });
      }}
    >
      <Field label="Membre">
        <select
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          className={fieldClass}
        >
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.firstName} {m.lastName}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Montant (FCFA)">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
          inputMode="numeric"
          className={fieldClass}
        />
      </Field>
      <Field label="Mode de paiement">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as typeof method)}
          className={fieldClass}
        >
          {paymentMethods.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </Field>
      <BigButton type="submit" className="w-full">
        Enregistrer
      </BigButton>
    </form>
  );
}
