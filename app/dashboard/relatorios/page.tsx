import { Topbar } from "@/components/dashboard/Topbar";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { RevenueByBarberChart, TopServicesPieChart, BusyHoursLineChart } from "@/components/dashboard/ReportsCharts";
import { getRevenueByBarber, getTopServices, getBusyHours, getBarbers, getClients } from "@/lib/data";
import { formatBRL } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function RelatoriosPage() {
  const [revenueByBarber, topServices, busyHours, barbers, clients] = await Promise.all([
    getRevenueByBarber(),
    getTopServices(),
    getBusyHours(),
    getBarbers(),
    getClients(),
  ]);

  const inactiveClients = clients.filter((c) => c.status === "inativo");
  const activeClients = clients.filter((c) => c.status === "ativo");
  const totalVisits = clients.reduce((s, c) => s + c.visits, 0);
  const totalSpent = clients.reduce((s, c) => s + c.totalSpent, 0);
  const ticketMedio = totalVisits > 0 ? totalSpent / totalVisits : 0;
  const returningClients = clients.length > 0 ? Math.round((clients.filter((c) => c.visits > 1).length / clients.length) * 100) : 0;

  return (
    <>
      <Topbar title="Relatórios" subtitle="Indicadores de faturamento, clientes e equipe" />

      <div className="p-5 lg:p-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Ticket médio</p>
              <p className="font-display text-2xl text-ink-50 mt-1">{formatBRL(ticketMedio)}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Clientes ativos</p>
              <p className="font-display text-2xl text-ink-50 mt-1">{activeClients.length}</p>
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
              <RevenueByBarberChart data={revenueByBarber} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Serviços mais vendidos" subtitle="Mês atual" />
            <CardBody className="flex items-center">
              {topServices.length > 0 ? (
                <TopServicesPieChart data={topServices} />
              ) : (
                <p className="text-sm text-ink-500 italic py-10 text-center w-full">Sem vendas registradas ainda.</p>
              )}
            </CardBody>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader title="Horários mais movimentados" subtitle="Ocupação relativa (%)" />
            <CardBody>
              {busyHours.length > 0 ? (
                <BusyHoursLineChart data={busyHours} />
              ) : (
                <p className="text-sm text-ink-500 italic py-10 text-center">Sem dados suficientes ainda.</p>
              )}
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
