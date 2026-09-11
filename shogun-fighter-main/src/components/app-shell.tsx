import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Home, Users, CalendarClock, Wallet, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { currentUser, notifications, organization } from "@/lib/mock-data";
import logoAsset from "@/assets/logo.png.asset.json";

const mainNav = [
  { to: "/dashboard", label: "Accueil", icon: Home },
  { to: "/membres", label: "Membres", icon: Users },
  { to: "/abonnements", label: "Abonnements", icon: CalendarClock },
  { to: "/paiements", label: "Paiements", icon: Wallet },
  { to: "/plus", label: "Plus", icon: Menu },
] as const;

const unread = notifications.filter((n) => !n.read).length;

export function Brand({ className }: { className?: string }) {
  return (
    <Link to="/dashboard" className={cn("flex items-center gap-3", className)}>
      <img
        src={logoAsset.url}
        alt={`Logo ${organization.name}`}
        className="h-11 w-11 shrink-0 rounded-2xl bg-card object-contain p-1 ring-1 ring-border"
      />
      <span className="min-w-0">
        <span className="block font-display text-base leading-tight font-semibold">
          {organization.name}
        </span>
        <span className="block text-[11px] font-medium text-muted-foreground">
          {organization.tagline}
        </span>
      </span>
    </Link>
  );
}

function NavLinks() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="mt-6 flex flex-col gap-2">
      {mainNav.map((item) => {
        const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-4 py-3.5 text-base font-semibold transition-colors",
              active ? "bg-soft text-soft-foreground" : "text-foreground/75 hover:bg-plate",
            )}
          >
            <Icon className="size-5 shrink-0" />
            <span className="truncate">{item.label}</span>
            {item.to === "/plus" && unread > 0 && (
              <span className="ml-auto rounded-full bg-coral px-2 py-0.5 text-[11px] font-bold text-soft-foreground">
                {unread}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1440px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card/60 p-5 lg:flex">
          <Brand />
          <NavLinks />
          <div className="mt-auto flex items-center gap-3 rounded-2xl bg-cream p-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-soft/20 text-sm font-bold text-soft">
              {currentUser.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{currentUser.fullName}</p>
              <p className="truncate text-[11px] text-muted-foreground">
                {organization.city}
              </p>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-border bg-background/90 px-5 py-3.5 backdrop-blur-sm lg:px-8">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="min-w-0">
                <h1 className="truncate font-display text-xl leading-tight font-semibold">
                  {title}
                </h1>
                <p className="text-[11px] font-medium text-muted-foreground">
                  {subtitle ?? "06 septembre 2026"}
                </p>
              </div>
              <img
                src={logoAsset.url}
                alt={`Logo ${organization.name}`}
                className="h-10 w-10 shrink-0 rounded-2xl bg-card object-contain p-1 ring-1 ring-border lg:hidden"
              />
            </div>
          </header>

          <div className="space-y-5 p-4 pb-28 sm:p-5 lg:p-8 lg:pb-10">{children}</div>
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-card/95 px-1 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-sm lg:hidden">
        {mainNav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-1 rounded-2xl px-1 py-1.5 text-[11px] font-semibold text-muted-foreground"
              activeProps={{ className: "text-soft" }}
            >
              <Icon className="size-6" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
