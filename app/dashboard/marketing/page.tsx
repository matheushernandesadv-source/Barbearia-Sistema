"use client";

import { Topbar } from "@/components/dashboard/Topbar";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { campaigns } from "@/lib/mock-data";
import { MessageCircleMore, Cake, Users, Gift, Percent } from "lucide-react";

export default function MarketingPage() {
  return (
    <>
      <Topbar title="Marketing" subtitle="Campanhas via WhatsApp, cupons e indicações" />

      <div className="p-5 lg:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Card>
            <CardBody className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-gold-400/10 flex items-center justify-center ring-1 ring-inset ring-gold-400/25 shrink-0">
                <Cake size={18} className="text-gold-300" />
              </div>
              <div>
                <p className="text-sm text-ink-50">Mensagem automática de aniversário</p>
                <p className="text-xs text-ink-400 mt-1">Ativa · envia às 08h no dia</p>
                <Badge tone="green" className="mt-2">ativo</Badge>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-gold-400/10 flex items-center justify-center ring-1 ring-inset ring-gold-400/25 shrink-0">
                <MessageCircleMore size={18} className="text-gold-300" />
              </div>
              <div>
                <p className="text-sm text-ink-50">Lembrete para clientes inativos</p>
                <p className="text-xs text-ink-400 mt-1">Disparo em 30 e 45 dias sem retorno</p>
                <Badge tone="green" className="mt-2">ativo</Badge>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-gold-400/10 flex items-center justify-center ring-1 ring-inset ring-gold-400/25 shrink-0">
                <Gift size={18} className="text-gold-300" />
              </div>
              <div>
                <p className="text-sm text-ink-50">Programa de indicação</p>
                <p className="text-xs text-ink-400 mt-1">R$15 de cashback por indicado</p>
                <Badge tone="green" className="mt-2">ativo</Badge>
              </div>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader
            title="Campanhas"
            action={<Button size="sm">+ Nova campanha</Button>}
          />
          <CardBody className="p-0">
            <div className="divide-y divide-ink-600/50">
              {campaigns.map((c) => (
                <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                  <div>
                    <p className="text-sm text-ink-50">{c.name}</p>
                    <p className="text-xs text-ink-400 mt-0.5">{c.channel} · {c.audience} contatos</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-ink-50">{c.sent}</p>
                      <p className="text-[11px] text-ink-400">enviados</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-ink-50">{c.opened}</p>
                      <p className="text-[11px] text-ink-400">visualizados</p>
                    </div>
                    <Badge tone={c.status === "ativa" ? "green" : "neutral"}>{c.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Cupons de desconto" action={<Percent size={16} className="text-gold-300" />} />
            <CardBody className="space-y-3">
              {[
                { code: "STUDIOBLACK10", desc: "10% off em produtos", uses: 24 },
                { code: "VOLTAAI15", desc: "15% off para inativos", uses: 8 },
              ].map((cp) => (
                <div key={cp.code} className="flex items-center justify-between rounded-xl border border-ink-600/60 p-3.5">
                  <div>
                    <p className="text-sm font-mono text-gold-300">{cp.code}</p>
                    <p className="text-xs text-ink-400">{cp.desc}</p>
                  </div>
                  <Badge tone="neutral">{cp.uses} usos</Badge>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Indicações" action={<Users size={16} className="text-gold-300" />} />
            <CardBody className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-ink-300">Indicações este mês</span>
                <span className="text-ink-50">17</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink-300">Convertidas em clientes</span>
                <span className="text-ink-50">11</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink-300">Cashback distribuído</span>
                <span className="text-gold-300">R$ 255,00</span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
