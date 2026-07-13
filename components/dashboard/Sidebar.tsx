"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Wallet,
  Percent,
  Boxes,
  ShoppingCart,
  Repeat,
  BarChart3,
  Megaphone,
  UsersRound,
  Scissors,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Painel", icon: LayoutDashboard },
  { href: "/dashboard/agenda", label: "Agenda", icon: CalendarDays },
  { href: "/dashboard/clientes", label: "Clientes", icon: Users },
  { href: "/dashboard/financeiro", label: "Financeiro", icon: Wallet },
  { href: "/dashboard/comissoes", label: "Comissões", icon: Percent },
  { href: "/dashboard/estoque", label: "Estoque", icon: Boxes },
  { href: "/dashboard/vendas", label: "PDV / Vendas", icon: ShoppingCart },
  { href: "/dashboard/assinaturas", label: "Assinaturas", icon: Repeat },
  { href: "/dashboard/relatorios", label: "Relatórios", icon: BarChart3 },
  { href: "/dashboard/marketing", label: "Marketing", icon: Megaphone },
  { href: "/dashboard/equipe", label: "Equipe", icon: UsersRound },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-ink-600/60 bg-ink-850/80 h-screen sticky top-0">
      <div className="flex items-center gap-2.5 px-6 h-20 border-b border-ink-600/60">
        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-gold-300 to-gold-600 flex items-center justify-center">
          <Scissors className="h-4.5 w-4.5 text-ink-900" size={18} />
        </div>
        <div>
          <p className="font-display text-base leading-none text-ink-50">StudioBlack</p>
          <p className="text-[11px] text-ink-400 mt-1">Painel de Gestão</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {nav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors",
                active
                  ? "bg-gold-400/10 text-gold-300 ring-1 ring-inset ring-gold-400/25"
                  : "text-ink-200 hover:bg-ink-700/60 hover:text-ink-50"
              )}
            >
              <Icon size={17} strokeWidth={1.8} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-ink-600/60">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-ink-300 hover:bg-ink-700/60 hover:text-ink-50 transition-colors"
        >
          <ArrowLeft size={17} strokeWidth={1.8} />
          Voltar ao site
        </Link>
      </div>
    </aside>
  );
}
