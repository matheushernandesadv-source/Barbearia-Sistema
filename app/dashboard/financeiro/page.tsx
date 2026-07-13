import { Topbar } from "@/components/dashboard/Topbar";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CashFlowBarChart } from "@/components/dashboard/CashFlowBarChart";
import { getCashFlow, getReceivables, getPayables, getCommissions } from "@/lib/data";
import { formatBRL, formatDatePt } from "@/lib/utils";
import { ArrowDownCircle, ArrowUpCircle, Target, FileBarChart } from "lucide-react";

const statusTone: Record<string, "green" | "orange" | "red"> = {
  pago: "green",
  pendente: "orange",
  atrasado: "red",
};

export const dynamic = "force-dynamic";

export default async function FinanceiroPage() {
  const [cashFlow, receivables, payables, commissions] = await Promise.all([
    getCashFlow(),
    getReceivables(),
    getPayables(),
    getCommissions(),
  ]);
  const totalEntradas = cashFlow.reduce((s, d) => s + d.entradas, 0);
  const totalSaidas = cashFlow.reduce((s, d) => s + d.saidas, 0);
  const totalComissoes = commissions.reduce((s, c) => s + c.total, 0);
  const lucroLiquido = totalEntradas - totalSaidas;

  return (
    <>
      <Topbar title="Financeiro" subtitle="Fluxo de caixa, contas e DRE simplificada" />

      <div className="p-5 lg:p-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardBody className="flex items-center gap-3">
              <ArrowUpCircle className="text-emerald-400" size={22} />
              <div>
                <p className="text-xs text-ink-400">Receitas (13 dias)</p>
                <p className="font-display text-xl text-ink-50">{formatBRL(totalEntradas)}</p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex items-center gap-3">
              <ArrowDownCircle className="text-red-400" size={22} />
              <div>
                <p className="text-xs text-ink-400">Despesas (13 dias)</p>
                <p className="font-display text-xl text-ink-50">{formatBRL(totalSaidas)}</p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex items-center gap-3">
              <FileBarChart className="text-gold-300" size={22} />
              <div>
                <p className="text-xs text-ink-400">Lucro líquido</p>
                <p className="font-display text-xl text-ink-50">{formatBRL(lucroLiquido)}</p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex items-center gap-3">
              <Target className="text-sky-300" size={22} />
              <div>
                <p className="text-xs text-ink-400">Meta do mês</p>
                <p className="font-display text-xl text-ink-50">78%</p>
              </div>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader title="Fluxo de caixa diário" subtitle="Entradas x saídas · últimos 13 dias" />
          <CardBody>
            <CashFlowBarChart data={cashFlow} />
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader
              title="Contas a receber"
              action={<Button size="sm" variant="secondary">+ Nova</Button>}
            />
            <CardBody className="p-0">
              <div className="divide-y divide-ink-600/50">
                {receivables.map((r) => (
                  <div key={r.id} className="flex items-center justify-between px-5 py-3.5">
                    <div>
                      <p className="text-sm text-ink-50">{r.desc}</p>
                      <p className="text-xs text-ink-400">Vence {formatDatePt(r.due)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-ink-50">{formatBRL(r.value)}</p>
                      <Badge tone={statusTone[r.status]}>{r.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Contas a pagar"
              action={<Button size="sm" variant="secondary">+ Nova</Button>}
            />
            <CardBody className="p-0">
              <div className="divide-y divide-ink-600/50">
                {payables.map((p) => (
                  <div key={p.id} className="flex items-center justify-between px-5 py-3.5">
                    <div>
                      <p className="text-sm text-ink-50">{p.desc}</p>
                      <p className="text-xs text-ink-400">Vence {formatDatePt(p.due)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-ink-50">{formatBRL(p.value)}</p>
                      <Badge tone={statusTone[p.status]}>{p.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader title="DRE simplificada" subtitle="Mês de julho" />
          <CardBody className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-ink-600/50">
              <span className="text-ink-300">Receita bruta</span>
              <span className="text-ink-50">{formatBRL(totalEntradas)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-ink-600/50">
              <span className="text-ink-300">(-) Custos e despesas</span>
              <span className="text-red-400">{formatBRL(totalSaidas)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-ink-600/50">
              <span className="text-ink-300">(-) Comissões</span>
              <span className="text-red-400">{formatBRL(totalComissoes)}</span>
            </div>
            <div className="flex justify-between py-2 font-semibold">
              <span className="text-ink-50">Lucro líquido</span>
              <span className="text-gold-300">{formatBRL(lucroLiquido - totalComissoes)}</span>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
