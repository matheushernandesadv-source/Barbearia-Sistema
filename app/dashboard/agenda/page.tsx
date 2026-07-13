"use client";

import { useState } from "react";
import { Topbar } from "@/components/dashboard/Topbar";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { barbers, appointmentsToday, waitlist } from "@/lib/mock-data";
import { Lock, Clock, UserPlus, MessageCircleMore } from "lucide-react";
import { formatBRL } from "@/lib/utils";

const hours = ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00"];

const statusTone: Record<string, "gold" | "green" | "red" | "blue" | "neutral" | "orange"> = {
  confirmado: "blue",
  em_atendimento: "gold",
  aguardando: "neutral",
  cancelado: "red",
  falta: "orange",
};

export default function AgendaPage() {
  const [selectedBarber, setSelectedBarber] = useState<string>("all");

  const filtered = appointmentsToday.filter(
    (a) => selectedBarber === "all" || a.barberId === selectedBarber
  );

  return (
    <>
      <Topbar title="Agenda" subtitle="Agendamento por barbeiro, bloqueios e lista de espera" />

      <div className="p-5 lg:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedBarber("all")}
              className={`rounded-full px-4 py-2 text-sm border transition-colors ${
                selectedBarber === "all"
                  ? "bg-gold-400/10 border-gold-400/40 text-gold-300"
                  : "border-ink-600/60 text-ink-300 hover:text-ink-50"
              }`}
            >
              Todos
            </button>
            {barbers.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBarber(b.id)}
                className={`rounded-full px-4 py-2 text-sm border transition-colors flex items-center gap-2 ${
                  selectedBarber === b.id
                    ? "bg-gold-400/10 border-gold-400/40 text-gold-300"
                    : "border-ink-600/60 text-ink-300 hover:text-ink-50"
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: b.color }}
                />
                {b.name}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Lock size={14} /> Bloquear horário
            </Button>
            <Button size="sm">
              <UserPlus size={14} /> Novo agendamento
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader
              title="Grade de hoje"
              subtitle={`${filtered.length} horários · confirmação automática ativada`}
            />
            <CardBody className="p-0">
              <div className="divide-y divide-ink-600/50">
                {hours.map((h) => {
                  const appt = filtered.find((a) => a.time === h);
                  const barber = appt ? barbers.find((b) => b.id === appt.barberId) : null;
                  return (
                    <div key={h} className="flex items-center gap-4 px-5 py-3.5">
                      <span className="text-sm font-mono text-ink-400 w-14 shrink-0 flex items-center gap-1.5">
                        <Clock size={13} /> {h}
                      </span>
                      {appt ? (
                        <div className="flex items-center justify-between flex-1 min-w-0 gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className="h-2 w-2 rounded-full shrink-0"
                              style={{ backgroundColor: barber?.color }}
                            />
                            <div className="min-w-0">
                              <p className="text-sm text-ink-50 truncate">{appt.client}</p>
                              <p className="text-xs text-ink-400 truncate">
                                {appt.service} · {barber?.name} · {formatBRL(appt.price)}
                              </p>
                            </div>
                          </div>
                          <Badge tone={statusTone[appt.status]}>{appt.status.replace("_", " ")}</Badge>
                        </div>
                      ) : (
                        <span className="text-sm text-ink-500 italic">Horário livre</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader title="Lista de espera" subtitle="Encaixes automáticos sugeridos" />
              <CardBody className="space-y-3">
                {waitlist.map((w) => (
                  <div key={w.id} className="rounded-xl border border-ink-600/60 p-3.5">
                    <p className="text-sm text-ink-50">{w.client}</p>
                    <p className="text-xs text-ink-400 mt-0.5">{w.service} · {w.preferredBarber}</p>
                    <p className="text-xs text-gold-300 mt-1">{w.desiredWindow}</p>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  Ver todos ({waitlist.length})
                </Button>
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Lembretes automáticos" subtitle="Via WhatsApp" />
              <CardBody className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-ink-600/60 p-3.5">
                  <MessageCircleMore size={18} className="text-emerald-400 shrink-0" />
                  <div className="text-sm">
                    <p className="text-ink-50">24 lembretes enviados hoje</p>
                    <p className="text-xs text-ink-400">Confirmação 2h antes do horário</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-ink-600/60 p-3.5">
                  <UserPlus size={18} className="text-gold-300 shrink-0" />
                  <div className="text-sm">
                    <p className="text-ink-50">2 reagendamentos hoje</p>
                    <p className="text-xs text-ink-400">Feitos pelo próprio cliente</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
