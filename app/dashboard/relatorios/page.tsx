"use client";

import { Topbar } from "@/components/dashboard/Topbar";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { revenueByBarber, topServices, busyHours, barbers, clients } from "@/lib/mock-data";
import { formatBRL } from "@/lib/utils";
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";

const pieColors = ["#d1a838", "#7dd3fc", "#86efac", "#f9a8d4", "#c9ced6"];

export default function RelatoriosPage() {
  const inactiveClients = clients.filter((c) => c.status === "inativo");
  const newClientsMonth = 14;
  const returningClients = 62;

  return (
    <>
      <Topbar title="Relatórios" subtitle="Indicadores de faturamento, clientes e equipe" />

      <div className="p-5 lg:p-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Ticket médio</p>
              <p className="font-display text-2xl text-ink-50 mt-1">{formatBRL(78)}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Novos clientes (mês)</p>
              <p className="font-display text-2xl text-ink-50 mt-1">{newClientsMonth}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Retorno de clientes</p>
              <p className="font-display text-2xl text-ink-50 mt-1">{returningClients}%</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Clientes inativos</p>
              <p className="font-display text-2xl text-red-400 mt-1">{inactiveClients.length}</p>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Faturamento por barbeiro" subtitle="Ranking do mês" />
            <CardBody>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={revenueByBarber}>
                  <CartesianGrid stroke="#22262e" vertical={false} />
                  <XAxis dataKey="name" stroke="#9aa1ad" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} width={40} />
                  <Tooltip contentStyle={{ background: "#111318", border: "1px solid #22262e", borderRadius: 12, fontSize: 12 }} />
                  <Bar dataKey="faturamento" fill="#d1a838" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Serviços mais vendidos" subtitle="Mês atual" />
            <CardBody className="flex items-center">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={topServices} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                    {topServices.map((_, i) => (
                      <Cell key={i} fill={pieColors[i % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#111318", border: "1px solid #22262e", borderRadius: 12, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "#c9ced6" }} />
                </PieChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader title="Horários mais movimentados" subtitle="Taxa de ocupação (%)" />
            <CardBody>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={busyHours}>
                  <CartesianGrid stroke="#22262e" vertical={false} />
                  <XAxis dataKey="hour" stroke="#9aa1ad" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} width={40} />
                  <Tooltip contentStyle={{ background: "#111318", border: "1px solid #22262e", borderRadius: 12, fontSize: 12 }} />
                  <Line type="monotone" dataKey="ocupacao" stroke="#d1a838" strokeWidth={2.5} dot={{ r: 3, fill: "#d1a838" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader title="Ranking de barbeiros e serviços" />
          <CardBody className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-ink-400 mb-3">Ranking de barbeiros</p>
              <div className="space-y-2">
                {barbers
                  .slice()
                  .sort((a, b) => b.revenueMonth - a.revenueMonth)
                  .map((b, i) => (
                    <div key={b.id} className="flex justify-between text-sm">
                      <span className="text-ink-200">{i + 1}. {b.name}</span>
                      <span className="text-gold-300">{formatBRL(b.revenueMonth)}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-ink-400 mb-3">Ranking de serviços</p>
              <div className="space-y-2">
                {topServices
                  .slice()
                  .sort((a, b) => b.value - a.value)
                  .map((s, i) => (
                    <div key={s.name} className="flex justify-between text-sm">
                      <span className="text-ink-200">{i + 1}. {s.name}</span>
                      <span className="text-gold-300">{s.value} vendas</span>
                    </div>
                  ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
