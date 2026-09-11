import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { MemberStatus, SubscriptionStatus } from "@/lib/mock-data";
import { memberStatusLabels, statusLabels } from "@/lib/mock-data";

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("rounded-3xl bg-card ring-1 ring-border", className)}>
      {children}
    </section>
  );
}

export function PanelHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 pb-3">
      <div className="min-w-0">
        <h2 className="font-display text-lg font-semibold leading-tight">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <h1 className="font-display text-2xl font-semibold leading-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

type Tone = "soft" | "coral" | "mint" | "sun" | "muted";

const toneClass: Record<Tone, string> = {
  soft: "bg-soft/15 text-soft",
  coral: "bg-coral/15 text-coral",
  mint: "bg-mint/20 text-success",
  sun: "bg-sun/25 text-warning",
  muted: "bg-plate text-muted-foreground",
};

export function Pill({
  tone = "muted",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const subTone: Record<SubscriptionStatus, Tone> = {
  ACTIVE: "mint",
  EXPIRING_SOON: "sun",
  EXPIRED: "coral",
  SUSPENDED: "muted",
  CANCELLED: "muted",
};

export function StatusBadge({ status }: { status: SubscriptionStatus }) {
  return <Pill tone={subTone[status]}>{statusLabels[status]}</Pill>;
}

const memberTone: Record<MemberStatus, Tone> = {
  ACTIVE: "mint",
  INACTIVE: "muted",
  SUSPENDED: "sun",
};

export function MemberStatusBadge({ status }: { status: MemberStatus }) {
  return <Pill tone={memberTone[status]}>{memberStatusLabels[status]}</Pill>;
}

export function DaysLeftPill({ days }: { days: number }) {
  if (days < 0) return <Pill tone="coral">Expiré</Pill>;
  if (days === 0) return <Pill tone="coral">Aujourd'hui</Pill>;
  if (days === 1) return <Pill tone="coral">Demain</Pill>;
  if (days <= 3) return <Pill tone="coral">{days} j</Pill>;
  if (days <= 7) return <Pill tone="sun">{days} j</Pill>;
  return <Pill tone="mint">{days} j</Pill>;
}

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-2xl bg-soft/15 text-xs font-bold text-soft",
        className,
      )}
    >
      {initials}
    </span>
  );
}

export function KpiCard({
  label,
  value,
  hint,
  hintTone = "muted",
  valueTone,
}: {
  label: string;
  value: string;
  hint?: string;
  hintTone?: "muted" | "mint" | "coral" | "sun";
  valueTone?: "coral" | "sun";
}) {
  return (
    <div className="kpi-pop rounded-3xl bg-card p-4 ring-1 ring-border">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-1 font-display text-2xl leading-none font-semibold",
          valueTone === "coral" && "text-coral",
          valueTone === "sun" && "text-warning",
        )}
      >
        {value}
      </p>
      {hint && (
        <p
          className={cn(
            "mt-2 text-xs font-semibold",
            hintTone === "muted" && "font-medium text-muted-foreground",
            hintTone === "mint" && "text-success",
            hintTone === "coral" && "text-coral",
            hintTone === "sun" && "text-warning",
          )}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

export function ActionButton({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "quiet";
}) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors",
        variant === "primary" && "bg-soft text-soft-foreground hover:bg-soft/90",
        variant === "ghost" &&
          "bg-soft/10 text-soft ring-1 ring-soft/20 hover:bg-soft/20",
        variant === "quiet" &&
          "bg-transparent text-muted-foreground ring-1 ring-border hover:bg-plate",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function EmptyRow({ colSpan, label }: { colSpan: number; label: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-10 text-center text-sm text-muted-foreground">
        {label}
      </td>
    </tr>
  );
}

/* ---------- Composants simples (gros boutons, cartes, états vides) ---------- */

/** Gros bouton tactile pour l'action principale d'un écran. */
export function BigButton({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
}) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-2.5 rounded-2xl px-5 text-base font-bold transition-colors sm:w-auto",
        variant === "primary" && "bg-soft text-soft-foreground hover:bg-soft/90",
        variant === "outline" &&
          "bg-card text-foreground ring-2 ring-soft/30 hover:bg-plate",
        className,
      )}
    >
      {children}
    </button>
  );
}

/** Pastille couleur : vert actif, orange bientôt terminé, rouge expiré. */
export function StatusDot({ status }: { status: SubscriptionStatus }) {
  const color =
    status === "ACTIVE"
      ? "bg-success"
      : status === "EXPIRING_SOON"
        ? "bg-warning"
        : status === "EXPIRED"
          ? "bg-coral"
          : "bg-muted-foreground";
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap">
      <span className={cn("size-2.5 shrink-0 rounded-full", color)} />
      {statusLabels[status]}
    </span>
  );
}

/** Message clair quand il n'y a rien à afficher, avec l'action à faire. */
export function EmptyState({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-14 text-center">
      <p className="text-base font-semibold text-muted-foreground">{title}</p>
      {action}
    </div>
  );
}

/** Alerte unique et simple en haut d'un écran. */
export function SimpleAlert({
  message,
  action,
}: {
  message: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-sun/25 px-4 py-3.5 ring-1 ring-sun/40">
      <span className="text-lg" aria-hidden>
        ⚠️
      </span>
      <p className="min-w-0 flex-1 text-sm font-semibold text-foreground">{message}</p>
      {action}
    </div>
  );
}

/** Champ de formulaire simple avec grand libellé. */
export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-foreground">{label}</span>
      {children}
    </label>
  );
}

export const fieldClass =
  "w-full rounded-2xl bg-plate px-4 py-3.5 text-base font-medium text-foreground outline-none ring-1 ring-border focus:ring-2 focus:ring-soft";
