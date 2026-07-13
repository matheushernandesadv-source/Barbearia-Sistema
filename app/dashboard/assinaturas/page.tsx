"use client";

import { Topbar } from "@/components/dashboard/Topbar";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { plans, clients } from "@/lib/mock-data";
import { formatBRL } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

const subscribers = [
  { client: clients[0].name, plan: "Plano Completo", since: "12/01/2026", renews: "15/07/2026", status: "ativo" as const },
  { client: clients[3].name, plan: "Plano Black", since: "03/03/2026", renews: "15/07/2026", status: "ativo" as const },
  { client: clients[5].name, plan: "Plano Essencial", since: "20/11/2025", renews: "05/07/2026", status: "vencido" as const },
  { client: clients[1].name, plan: "Plano Essencial", since: "08/05/2026", renews: "18/07/2026", status: "ativo" as const },
];

export default function AssinaturasPage() {
  const mrr = plans.reduce((s, p) => s + p.price * p.subscribers, 0);

  return (
    <>
      <Topbar title="Assinaturas" subtitle="Planos mensais, cobrança recorrente e renovação" />

      <div className="p-5 lg:p-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Receita recorrente (MRR)</p>
              <p className="font-display text-2xl text-gold-300 mt-1">{formatBRL(mrr)}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Assinantes ativos</p>
              <p className="font-display text-2xl text-ink-50 mt-1">
                {plans.reduce((s, p) => s + p.subscribers, 0)}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Renovações essa semana</p>
              <p className="font-display text-2xl text-ink-50 mt-1">12</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Inadimplentes</p>
              <p className="font-display text-2xl text-red-400 mt-1">3</p>
            </CardBody>
          </Card>
        </div>

        <div>
          <h3 className="font-display text-lg text-ink-50 mb-4">Planos disponíveis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {plans.map((p, i) => (
              <Card key={p.id} className={i === 2 ? "ring-1 ring-gold-400/40" : ""}>
                <CardBody className="space-y-4">
                  <div>
                    <p className="text-sm text-ink-300">{p.name}</p>
                    <p className="font-display text-3xl text-ink-50 mt-1">
                      {formatBRL(p.price)}
                      <span className="text-sm text-ink-400">/mês</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-ink-200">
                    <CheckCircle2 size={15} className="text-gold-300" /> {p.benefits}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-ink-200">
                    <CheckCircle2 size={15} className="text-gold-300" /> Bloqueio automático em atraso
                  </div>
                  <Badge tone="neutral">{p.subscribers} assinantes</Badge>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader
            title="Assinantes"
            action={<Button size="sm" variant="secondary">+ Nova assinatura</Button>}
          />
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-ink-400 border-b border-ink-600/50">
                    <th className="px-5 py-3 font-medium">Cliente</th>
                    <th className="px-5 py-3 font-medium">Plano</th>
                    <th className="px-5 py-3 font-medium">Início</th>
                    <th className="px-5 py-3 font-medium">Próxima cobrança</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-600/50">
                  {subscribers.map((s, i) => (
                    <tr key={i}>
                      <td className="px-5 py-3.5 text-ink-50">{s.client}</td>
                      <td className="px-5 py-3.5 text-ink-200">{s.plan}</td>
                      <td className="px-5 py-3.5 text-ink-400">{s.since}</td>
                      <td className="px-5 py-3.5 text-ink-400">{s.renews}</td>
                      <td className="px-5 py-3.5">
                        <Badge tone={s.status === "ativo" ? "green" : "red"}>{s.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
