"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Scissors } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Painel" },
  { href: "/dashboard/agenda", label: "Agenda" },
  { href: "/dashboard/clientes", label: "Clientes" },
  { href: "/dashboard/financeiro", label: "Financeiro" },
  { href: "/dashboard/comissoes", label: "Comissões" },
  { href: "/dashboard/estoque", label: "Estoque" },
  { href: "/dashboard/vendas", label: "PDV / Vendas" },
  { href: "/dashboard/assinaturas", label: "Assinaturas" },
  { href: "/dashboard/relatorios", label: "Relatórios" },
  { href: "/dashboard/marketing", label: "Marketing" },
  { href: "/dashboard/equipe", label: "Equipe" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden sticky top-0 z-20 bg-ink-850/95 backdrop-blur border-b border-ink-600/60">
      <div className="flex items-center justify-between px-5 h-16">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-gold-300 to-gold-600 flex items-center justify-center">
            <Scissors className="h-4 w-4 text-ink-900" size={16} />
          </div>
          <span className="font-display text-ink-50">StudioBlack</span>
        </div>
        <button onClick={() => setOpen(!open)} className="text-ink-200">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav className="px-3 pb-4 space-y-0.5">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-xl px-3.5 py-2.5 text-sm",
                pathname === item.href
                  ? "bg-gold-400/10 text-gold-300"
                  : "text-ink-200 hover:bg-ink-700/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
