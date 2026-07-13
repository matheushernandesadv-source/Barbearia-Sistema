"use client";

import { Topbar } from "@/components/dashboard/Topbar";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { barbers, commissions } from "@/lib/mock-data";
import { formatBRL } from "@/lib/utils";

export default function ComissoesPage() {
  const totalGeral = commissions.reduce((s, c) => s + c.total, 0);

  return (
    <>
      <Topbar title="Comissões" subtitle="Cálculo automático por barbeiro, serviço e produto" />

      <div className="p-5 lg:p-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Total a pagar (mês)</p>
              <p className="font-display text-2xl text-gold-300 mt-1">{formatBRL(totalGeral)}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Comissão média serviços</p>
              <p className="font-display text-2xl text-ink-50 mt-1">40%</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Comissão média produtos</p>
              <p className="font-display text-2xl text-ink-50 mt-1">10%</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Bonificações no mês</p>
              <p className="font-display text-2xl text-ink-50 mt-1">{formatBRL(350)}</p>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader
            title="Comissões por barbeiro"
            subtitle="Julho/2026"
            action={<Button size="sm">Fechar folha</Button>}
          />
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-ink-400 border-b border-ink-600/50">
                    <th className="px-5 py-3 font-medium">Barbeiro</th>
                    <th className="px-5 py-3 font-medium">Serviços</th>
                    <th className="px-5 py-3 font-medium">Produtos</th>
                    <th className="px-5 py-3 font-medium">Bônus</th>
                    <th className="px-5 py-3 font-medium">Total</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-600/50">
                  {commissions.map((c) => {
                    const barber = barbers.find((b) => b.id === c.barberId)!;
                    return (
                      <tr key={c.barberId}>
                        <td className="px-5 py-3.5 flex items-center gap-2.5">
                          <div
                            className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold text-ink-900"
                            style={{ backgroundColor: barber.color }}
                          >
                            {barber.avatarInitials}
                          </div>
                          <span className="text-ink-50">{barber.name}</span>
                        </td>
                        <td className="px-5 py-3.5 text-ink-200">{formatBRL(c.service)}</td>
                        <td className="px-5 py-3.5 text-ink-200">{formatBRL(c.product)}</td>
                        <td className="px-5 py-3.5 text-ink-200">{formatBRL(c.bonus)}</td>
                        <td className="px-5 py-3.5 text-gold-300 font-medium">{formatBRL(c.total)}</td>
                        <td className="px-5 py-3.5">
                          <Badge tone="orange">pendente</Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Histórico de pagamentos" />
          <CardBody className="p-0">
            <div className="divide-y divide-ink-600/50">
              {["Junho/2026", "Maio/2026", "Abril/2026"].map((m, i) => (
                <div key={m} className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-sm text-ink-50">{m}</span>
                  <span className="text-sm text-ink-200">{formatBRL(9800 - i * 320)}</span>
                  <Badge tone="green">pago</Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
