import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Users,
  CheckCircle2,
  AlertTriangle,
  Wallet,
  TrendingUp,
  TrendingDown,
  RefreshCw,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/app-shell";
import { Panel } from "@/components/ui-kit";
import {
  cashStats,
  currency,
  dashboardStats,
  monthlySeries,
  monthlyTrends,
  revenueByActivity,
  revenueByMethod,
} from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/statistiques")({
  head: () => ({
    meta: [
      { title: "Statistiques — Shogun Fighters" },
      {
        name: "description",
        content:
          "Revenus, paiements, évolution des abonnements, membres, activités et renouvellements.",
      },
      { property: "og:title", content: "Statistiques — Shogun Fighters" },
      {
        property: "og:description",
        content: "Le tableau chiffré, clair et complet, de votre salle de sport.",
      },
    ],
  }),
  component: StatsPage,
});

const periods = [
  { key: "3", label: "3 mois" },
  { key: "6", label: "6 mois" },
] as const;

const pieColors = [
  "var(--soft)",
  "var(--mint)",
  "var(--sun)",
  "var(--bubble)",
  "var(--coral)",
];

/** Les graphiques ne s'affichent qu'après le chargement de la page. */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function Trend({ value }: { value: number }) {
  const up = value >= 0;
  const Icon = up ? TrendingUp : TrendingDown;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
        up ? "bg-mint/30 text-success" : "bg-bubble/30 text-coral"
      }`}
    >
      <Icon className="size-3.5" />
      {up ? "+" : ""}
      {value}%
    </span>
  );
}

function ChartFrame({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <Panel className="p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        <p className="text-sm font-medium text-muted-foreground">{hint}</p>
      </div>
      <div className="mt-4">{children}</div>
    </Panel>
  );
}

const tooltipStyle = {
  borderRadius: 16,
  border: "1px solid var(--border)",
  background: "var(--card)",
  fontSize: 13,
  fontWeight: 600,
  padding: "8px 12px",
} as const;

function StatsPage() {
  const mounted = useMounted();
  const [period, setPeriod] = useState<(typeof periods)[number]["key"]>("6");
  const series = monthlySeries.slice(period === "3" ? -3 : -6);

  const kpis = [
    {
      icon: Wallet,
      label: "Encaissé ce mois",
      value: currency(dashboardStats.monthRevenue),
      trend: monthlyTrends.revenue,
      tone: "bg-soft/15 text-soft",
    },
    {
      icon: Users,
      label: "Membres actifs",
      value: String(dashboardStats.activeMembers),
      trend: monthlyTrends.members,
      tone: "bg-mint/25 text-success",
    },
    {
      icon: RefreshCw,
      label: "Renouvellements",
      value: String(monthlySeries[monthlySeries.length - 1].renewals),
      trend: monthlyTrends.renewals,
      tone: "bg-sun/30 text-warning",
    },
    {
      icon: CheckCircle2,
      label: "Bénéfice du mois",
      value: currency(monthlyTrends.profitAmount),
      trend: monthlyTrends.profit,
      tone: "bg-bubble/25 text-coral",
    },
  ];

  return (
    <AppShell title="Statistiques" subtitle="Comment fonctionne ma salle ?">
      <div className="flex flex-wrap items-center gap-2">
        <p className="mr-auto text-sm font-semibold text-muted-foreground">
          Période affichée
        </p>
        {periods.map((p) => (
          <button
            key={p.key}
            onClick={() => setPeriod(p.key)}
            className={
              period === p.key
                ? "rounded-full bg-soft px-5 py-2.5 text-sm font-bold text-soft-foreground"
                : "rounded-full bg-card px-5 py-2.5 text-sm font-semibold text-foreground/75 ring-1 ring-border"
            }
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="rounded-3xl bg-card p-4 ring-1 ring-border">
              <div className="flex items-start justify-between gap-2">
                <span className={`grid size-11 place-items-center rounded-2xl ${k.tone}`}>
                  <Icon className="size-5" />
                </span>
                <Trend value={k.trend} />
              </div>
              <p className="mt-3 font-display text-2xl leading-none font-semibold">
                {k.value}
              </p>
              <p className="mt-1.5 text-sm font-medium text-muted-foreground">{k.label}</p>
            </div>
          );
        })}
      </div>

      <ChartFrame title="Argent encaissé" hint="Entrées et dépenses par mois">
        <div className="h-64 w-full">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series} margin={{ left: -18, right: 6, top: 6 }}>
                <defs>
                  <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--soft)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="var(--soft)" stopOpacity={0.04} />
                  </linearGradient>
                  <linearGradient id="gExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--coral)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--coral)" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 6" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fontWeight: 600 }}
                />
                <YAxis
                  tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  width={48}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v: number, name) => [
                    currency(v),
                    name === "revenue" ? "Encaissé" : "Dépenses",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--soft)"
                  strokeWidth={3}
                  fill="url(#gRev)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="var(--coral)"
                  strokeWidth={2}
                  fill="url(#gExp)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold">
          <span className="inline-flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-soft" /> Encaissé
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-coral" /> Dépenses
          </span>
        </div>
      </ChartFrame>

      <div className="grid gap-3 lg:grid-cols-2">
        <ChartFrame title="Membres" hint="Évolution du nombre de membres">
          <div className="h-56 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={series} margin={{ left: -18, right: 6, top: 6 }}>
                  <CartesianGrid
                    strokeDasharray="4 6"
                    stroke="var(--border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fontWeight: 600 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v: number) => [`${v} membres`, "Total"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="members"
                    stroke="var(--success)"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "var(--success)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </ChartFrame>

        <ChartFrame title="Renouvellements" hint="Abonnements renouvelés par mois">
          <div className="h-56 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={series} margin={{ left: -18, right: 6, top: 6 }}>
                  <CartesianGrid
                    strokeDasharray="4 6"
                    stroke="var(--border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fontWeight: 600 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    width={40}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--plate)" }}
                    contentStyle={tooltipStyle}
                    formatter={(v: number) => [`${v} renouvellements`, "Mois"]}
                  />
                  <Bar dataKey="renewals" fill="var(--soft)" radius={[10, 10, 4, 4]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </ChartFrame>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <ChartFrame title="Modes de paiement" hint="Comment les membres paient">
          <div className="grid items-center gap-3 sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)]">
            <div className="h-44 w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueByMethod}
                      dataKey="total"
                      nameKey="method"
                      innerRadius={44}
                      outerRadius={72}
                      paddingAngle={3}
                      stroke="var(--card)"
                      strokeWidth={2}
                    >
                      {revenueByMethod.map((m, i) => (
                        <Cell key={m.method} fill={pieColors[i % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(v: number) => currency(v)}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <ul className="space-y-2">
              {revenueByMethod.map((m, i) => (
                <li key={m.method} className="flex items-center gap-2.5">
                  <span
                    className="size-3 shrink-0 rounded-full"
                    style={{ background: pieColors[i % pieColors.length] }}
                  />
                  <span className="min-w-0 flex-1 truncate text-sm font-bold">
                    {m.method}
                  </span>
                  <span className="text-sm font-bold">{currency(m.total)}</span>
                </li>
              ))}
            </ul>
          </div>
        </ChartFrame>

        <ChartFrame title="Argent par activité" hint="Gym, Karaté, Danse…">
          <ul className="space-y-3">
            {revenueByActivity.map((a) => {
              const max = Math.max(...revenueByActivity.map((x) => x.revenue), 1);
              return (
                <li key={a.id}>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <p className="min-w-0 flex-1 truncate text-base font-bold">{a.name}</p>
                    <p className="text-sm font-semibold text-muted-foreground">
                      {a.members} membres
                    </p>
                    <p className="text-base font-bold">{currency(a.revenue)}</p>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-plate">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-soft to-bubble"
                      style={{ width: `${Math.max(4, (a.revenue / max) * 100)}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </ChartFrame>
      </div>

      <Panel className="p-4 sm:p-5">
        <h2 className="font-display text-lg font-semibold">Caisse du mois</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-4">
          <div className="rounded-2xl bg-plate px-4 py-3.5">
            <p className="text-sm font-medium text-muted-foreground">Entrées</p>
            <p className="mt-1 text-lg font-bold text-success">{currency(cashStats.in)}</p>
          </div>
          <div className="rounded-2xl bg-plate px-4 py-3.5">
            <p className="text-sm font-medium text-muted-foreground">Sorties</p>
            <p className="mt-1 text-lg font-bold text-coral">{currency(cashStats.out)}</p>
          </div>
          <div className="rounded-2xl bg-plate px-4 py-3.5">
            <p className="text-sm font-medium text-muted-foreground">Solde</p>
            <p className="mt-1 text-lg font-bold">{currency(cashStats.balance)}</p>
          </div>
          <div className="rounded-2xl bg-plate px-4 py-3.5">
            <p className="text-sm font-medium text-muted-foreground">À renouveler</p>
            <p className="mt-1 inline-flex items-center gap-2 text-lg font-bold text-warning">
              <AlertTriangle className="size-4" />
              {dashboardStats.expiringSoon + dashboardStats.expired}
            </p>
          </div>
        </div>
      </Panel>
    </AppShell>
  );
}
