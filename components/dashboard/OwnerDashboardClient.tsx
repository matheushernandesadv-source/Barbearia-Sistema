"use client";

import { Topbar } from "@/components/dashboard/Topbar";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  DollarSign,
  Users,
  Scissors,
  ShoppingBag,
  TrendingUp,
  Wallet,
  Trophy,
  UserX,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { formatBRL } from "@/lib/utils";
import type { getBarbers, getAppointmentsToday, getCashFlow, getRevenueByBarber, getOwnerSummary } from "@/lib/data";

const statusTone: Record<string, "gold" | "green" | "red" | "blue" | "neutral" | "orange"> = {
  confirmado: "blue",
  em_atendimento: "gold",
  aguardando: "neutral",
  cancelado: "red",
  falta: "orange",
};

const statusLabel: Record<string, string> = {
  confirmado: "Confirmado",
  em_atendimento: "Em atendimento",
  aguardando: "Aguardando",
  cancelado: "Cancelado",
  falta: "Faltou",
};

export function OwnerDashboardClient({
  ownerSummary,
  appointmentsToday,
  barbers,
  cashFlow,
  revenueByBarber,
}: {
  ownerSummary: Awaited<ReturnType<typeof getOwnerSummary>>;
  appointmentsToday: Awaited<ReturnType<typeof getAppointmentsToday>>;
  barbers: Awaited<ReturnType<typeof getBarbers>>;
  cashFlow: Awaited<ReturnType<typeof getCashFlow>>;
  revenueByBarber: Awaited<ReturnType<typeof getRevenueByBarber>>;
}) {
  const today = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long" });

  return (
    <>
      <Topbar title="Painel do Proprietário" subtitle={`Visão geral de hoje, ${today}`} />

      <div className="p-5 lg:p-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Faturamento hoje" value={formatBRL(ownerSummary.revenueToday)} icon={DollarSign} trend="hoje" />
          <StatCard label="Clientes atendidos" value={String(ownerSummary.clientsToday)} icon={Users} trend="hoje" />
          <StatCard label="Serviços vendidos" value={String(ownerSummary.servicesSoldToday)} icon={Scissors} trend="hoje" />
          <StatCard label="Produtos vendidos" value={String(ownerSummary.productsSoldToday)} icon={ShoppingBag} trend="hoje" />
          <StatCard label="Lucro estimado" value={formatBRL(ownerSummary.estimatedProfit)} icon={TrendingUp} trend="hoje" />
          <StatCard label="Caixa disponível" value={formatBRL(ownerSummary.cashAvailable)} icon={Wallet} hint="Atualizado agora" />
          <StatCard label="Barbeiro destaque" value={ownerSummary.topBarberToday} icon={Trophy} trendTone="neutral" />
          <StatCard label="Faltas hoje" value={String(ownerSummary.noShowsToday)} icon={UserX} trendTone="red" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader title="Fluxo de caixa (13 dias)" subtitle="Entradas x saídas" />
            <CardBody>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={cashFlow}>
                  <defs>
                    <linearGradient id="entradas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d1a838" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#d1a838" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="saidas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#22262e" vertical={false} />
                  <XAxis dataKey="day" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} width={40} />
                  <Tooltip
                    contentStyle={{ background: "#111318", border: "1px solid #22262e", borderRadius: 12, fontSize: 12 }}
                    labelStyle={{ color: "#c9ced6" }}
                  />
                  <Area type="monotone" dataKey="entradas" stroke="#d1a838" fill="url(#entradas)" strokeWidth={2} />
                  <Area type="monotone" dataKey="saidas" stroke="#ef4444" fill="url(#saidas)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Faturamento por barbeiro" subtitle="Mês atual" />
            <CardBody>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={revenueByBarber} layout="vertical" margin={{ left: 10 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#9aa1ad" fontSize={12} tickLine={false} axisLine={false} width={60} />
                  <Tooltip
                    contentStyle={{ background: "#111318", border: "1px solid #22262e", borderRadius: 12, fontSize: 12 }}
                    cursor={{ fill: "rgba(209,168,56,0.06)" }}
                  />
                  <Bar dataKey="faturamento" fill="#d1a838" radius={[0, 6, 6, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader title="Agenda de hoje" subtitle={`${appointmentsToday.length} atendimentos`} />
            <CardBody className="p-0">
              <div className="divide-y divide-ink-600/50 max-h-96 overflow-y-auto">
                {appointmentsToday.length === 0 && (
                  <p className="text-sm text-ink-500 italic px-5 py-6">Nenhum agendamento para hoje.</p>
                )}
                {appointmentsToday.map((a) => {
                  const barber = barbers.find((b) => b.id === a.barberId);
                  return (
                    <div key={a.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-sm text-ink-300 font-mono w-12 shrink-0">{a.time}</span>
                        <div className="min-w-0">
                          <p className="text-sm text-ink-50 truncate">{a.client}</p>
                          <p className="text-xs text-ink-400 truncate">{a.service} · {barber?.name}</p>
                        </div>
                      </div>
                      <Badge tone={statusTone[a.status]}>{statusLabel[a.status]}</Badge>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Ranking de barbeiros" subtitle="Faturamento do mês" />
            <CardBody className="space-y-4">
              {barbers
                .slice()
                .sort((a, b) => b.revenueMonth - a.revenueMonth)
                .map((b, i) => (
                  <div key={b.id} className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-ink-400 w-4">{i + 1}º</span>
                    <div
                      className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold text-ink-900 shrink-0"
                      style={{ backgroundColor: b.color }}
                    >
                      {b.avatarInitials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-ink-50 truncate">{b.name}</p>
                      <p className="text-xs text-ink-400">{b.clientsMonth} clientes</p>
                    </div>
                    <span className="text-sm font-medium text-gold-300">{formatBRL(b.revenueMonth)}</span>
                  </div>
                ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
