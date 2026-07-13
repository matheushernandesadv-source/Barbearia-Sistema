"use client";

import { useState } from "react";
import { Topbar } from "@/components/dashboard/Topbar";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatBRL, formatDatePt } from "@/lib/utils";
import { Search, Cake, Star, UserPlus, Camera } from "lucide-react";
import type { getClients } from "@/lib/data";

export function ClientesClient({ clients }: { clients: Awaited<ReturnType<typeof getClients>> }) {
  const [selected, setSelected] = useState(clients[0]);
  const [query, setQuery] = useState("");

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  if (!selected) {
    return (
      <>
        <Topbar title="Clientes" subtitle="Histórico, fidelidade e preferências" />
        <div className="p-5 lg:p-8">
          <p className="text-sm text-ink-400">Nenhum cliente cadastrado ainda.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Topbar title="Clientes" subtitle="Histórico, fidelidade e preferências" />

      <div className="p-5 lg:p-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardBody className="flex items-center justify-between">
              <div>
                <p className="text-xs text-ink-400">Clientes ativos</p>
                <p className="font-display text-2xl text-ink-50 mt-1">
                  {clients.filter((c) => c.status === "ativo").length}
                </p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Clientes inativos</p>
              <p className="font-display text-2xl text-ink-50 mt-1">
                {clients.filter((c) => c.status === "inativo").length}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Ticket médio</p>
              <p className="font-display text-2xl text-ink-50 mt-1">{formatBRL(78)}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Aniversariantes do mês</p>
              <p className="font-display text-2xl text-ink-50 mt-1">
                {clients.filter((c) => c.birthday.startsWith("07")).length}
              </p>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader
              title="Base de clientes"
              action={
                <Button size="sm">
                  <UserPlus size={14} /> Novo
                </Button>
              }
            />
            <CardBody className="p-0">
              <div className="p-4 border-b border-ink-600/50">
                <div className="flex items-center gap-2 rounded-full border border-ink-600/60 bg-ink-900/40 px-4 py-2">
                  <Search size={15} className="text-ink-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar cliente..."
                    className="bg-transparent text-sm outline-none flex-1 placeholder:text-ink-500"
                  />
                </div>
              </div>
              <div className="divide-y divide-ink-600/50 max-h-[520px] overflow-y-auto">
                {filtered.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className={`w-full text-left px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-ink-700/40 transition-colors ${
                      selected.id === c.id ? "bg-gold-400/5" : ""
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm text-ink-50 truncate">{c.name}</p>
                      <p className="text-xs text-ink-400">{c.visits} visitas · {formatBRL(c.totalSpent)}</p>
                    </div>
                    <Badge tone={c.status === "ativo" ? "green" : "neutral"}>{c.status}</Badge>
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader
              title={selected.name}
              subtitle={selected.phone}
              action={<Badge tone="gold"><Star size={12} /> {selected.loyaltyPoints} pts fidelidade</Badge>}
            />
            <CardBody className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-xl border border-ink-600/60 p-3.5">
                  <p className="text-xs text-ink-400">Visitas</p>
                  <p className="text-lg text-ink-50 font-display mt-1">{selected.visits}</p>
                </div>
                <div className="rounded-xl border border-ink-600/60 p-3.5">
                  <p className="text-xs text-ink-400">Valor gasto</p>
                  <p className="text-lg text-ink-50 font-display mt-1">{formatBRL(selected.totalSpent)}</p>
                </div>
                <div className="rounded-xl border border-ink-600/60 p-3.5">
                  <p className="text-xs text-ink-400">Última visita</p>
                  <p className="text-lg text-ink-50 font-display mt-1">{formatDatePt(selected.lastVisit)}</p>
                </div>
                <div className="rounded-xl border border-ink-600/60 p-3.5 flex items-center gap-2">
                  <Cake size={16} className="text-gold-300" />
                  <div>
                    <p className="text-xs text-ink-400">Aniversário</p>
                    <p className="text-sm text-ink-50">{selected.birthday.split("-").reverse().join("/")}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-ink-400 mb-1.5">Preferências de corte / observações</p>
                <p className="text-sm text-ink-100 rounded-xl border border-ink-600/60 p-3.5 bg-ink-900/30">
                  {selected.preference}
                </p>
              </div>

              <div>
                <p className="text-xs text-ink-400 mb-2">Fotos antes / depois</p>
                <div className="flex gap-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-20 w-20 rounded-xl border border-dashed border-ink-500/60 flex items-center justify-center text-ink-500"
                    >
                      <Camera size={18} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm">Agendar horário</Button>
                <Button size="sm" variant="secondary">Enviar WhatsApp</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
