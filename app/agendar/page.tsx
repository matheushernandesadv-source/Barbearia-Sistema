"use client";

import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { barbers, services } from "@/lib/mock-data";
import { formatBRL, cn } from "@/lib/utils";
import { Check, Clock, Scissors, User, CalendarDays, ArrowLeft } from "lucide-react";

const days = ["Seg 14", "Ter 15", "Qua 16", "Qui 17", "Sex 18", "Sáb 19"];
const slots = ["09:00", "09:30", "10:30", "11:00", "14:00", "14:30", "15:30", "16:00", "17:00"];
const takenSlots = ["10:30", "15:30"];

export default function AgendarPage() {
  const [step, setStep] = useState(1);
  const [barberId, setBarberId] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const barber = barbers.find((b) => b.id === barberId);
  const service = services.find((s) => s.id === serviceId);

  const steps = [
    { n: 1, label: "Barbeiro" },
    { n: 2, label: "Serviço" },
    { n: 3, label: "Horário" },
    { n: 4, label: "Confirmação" },
  ];

  function reset() {
    setStep(1);
    setBarberId(null);
    setServiceId(null);
    setDay(null);
    setSlot(null);
    setName("");
    setPhone("");
    setConfirmed(false);
  }

  return (
    <>
      <Nav />
      <main className="bg-noise min-h-[calc(100vh-80px)]">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 py-14">
          {!confirmed && (
            <>
              <div className="flex items-center gap-3 mb-8">
                {step > 1 && (
                  <button onClick={() => setStep(step - 1)} className="text-ink-300 hover:text-gold-300">
                    <ArrowLeft size={18} />
                  </button>
                )}
                <h1 className="font-display text-2xl lg:text-3xl text-ink-50">Agendar horário</h1>
              </div>

              <div className="flex items-center gap-2 mb-10">
                {steps.map((s, i) => (
                  <div key={s.n} className="flex items-center gap-2 flex-1">
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 border",
                        step > s.n
                          ? "bg-gold-400 border-gold-400 text-ink-900"
                          : step === s.n
                          ? "border-gold-400 text-gold-300"
                          : "border-ink-600 text-ink-500"
                      )}
                    >
                      {step > s.n ? <Check size={14} /> : s.n}
                    </div>
                    <span className={cn("text-xs hidden sm:inline", step >= s.n ? "text-ink-200" : "text-ink-500")}>
                      {s.label}
                    </span>
                    {i < steps.length - 1 && <div className="h-px flex-1 bg-ink-600/60" />}
                  </div>
                ))}
              </div>
            </>
          )}

          {confirmed ? (
            <Card>
              <CardBody className="text-center py-14">
                <div className="h-16 w-16 rounded-full bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/30 flex items-center justify-center mx-auto mb-6">
                  <Check size={28} className="text-emerald-400" />
                </div>
                <h2 className="font-display text-2xl text-ink-50">Agendamento confirmado!</h2>
                <p className="text-ink-300 mt-2">
                  {service?.name} com {barber?.name} · {day}, às {slot}
                </p>
                <p className="text-sm text-ink-400 mt-4">
                  Você receberá a confirmação e um lembrete pelo WhatsApp antes do horário.
                </p>
                <div className="flex justify-center gap-3 mt-8">
                  <Button variant="secondary" onClick={reset}>Novo agendamento</Button>
                  <Button href="/">Voltar ao site</Button>
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardBody className="min-h-[380px]">
                {step === 1 && (
                  <div>
                    <p className="text-sm text-ink-400 mb-4 flex items-center gap-2">
                      <User size={15} /> Escolha o barbeiro
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {barbers.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => {
                            setBarberId(b.id);
                            setStep(2);
                          }}
                          className={cn(
                            "flex items-center gap-3 rounded-xl border p-4 text-left transition-colors",
                            barberId === b.id ? "border-gold-400/50 bg-gold-400/5" : "border-ink-600/60 hover:border-gold-400/30"
                          )}
                        >
                          <div
                            className="h-11 w-11 rounded-full flex items-center justify-center text-sm font-semibold text-ink-900"
                            style={{ backgroundColor: b.color }}
                          >
                            {b.avatarInitials}
                          </div>
                          <div>
                            <p className="text-sm text-ink-50">{b.name}</p>
                            <p className="text-xs text-ink-400">{b.role} · ⭐ {b.rating}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <p className="text-sm text-ink-400 mb-4 flex items-center gap-2">
                      <Scissors size={15} /> Escolha o serviço
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {services.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setServiceId(s.id);
                            setStep(3);
                          }}
                          className={cn(
                            "flex items-center justify-between rounded-xl border p-4 text-left transition-colors",
                            serviceId === s.id ? "border-gold-400/50 bg-gold-400/5" : "border-ink-600/60 hover:border-gold-400/30"
                          )}
                        >
                          <div>
                            <p className="text-sm text-ink-50">{s.name}</p>
                            <p className="text-xs text-ink-400">{s.duration} min</p>
                          </div>
                          <span className="text-sm text-gold-300">{formatBRL(s.price)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <p className="text-sm text-ink-400 mb-4 flex items-center gap-2">
                      <CalendarDays size={15} /> Escolha o dia
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {days.map((d) => (
                        <button
                          key={d}
                          onClick={() => setDay(d)}
                          className={cn(
                            "rounded-full px-4 py-2 text-sm border transition-colors",
                            day === d ? "border-gold-400/50 bg-gold-400/5 text-gold-300" : "border-ink-600/60 text-ink-300 hover:text-ink-50"
                          )}
                        >
                          {d}
                        </button>
                      ))}
                    </div>

                    {day && (
                      <>
                        <p className="text-sm text-ink-400 mb-3 flex items-center gap-2">
                          <Clock size={15} /> Horários disponíveis
                        </p>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {slots.map((s) => {
                            const taken = takenSlots.includes(s);
                            return (
                              <button
                                key={s}
                                disabled={taken}
                                onClick={() => {
                                  setSlot(s);
                                  setStep(4);
                                }}
                                className={cn(
                                  "rounded-xl px-3 py-2.5 text-sm border transition-colors",
                                  taken
                                    ? "border-ink-700 text-ink-600 cursor-not-allowed line-through"
                                    : slot === s
                                    ? "border-gold-400/50 bg-gold-400/5 text-gold-300"
                                    : "border-ink-600/60 text-ink-200 hover:border-gold-400/30"
                                )}
                              >
                                {s}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <p className="text-sm text-ink-400 mb-4">Confirme seus dados</p>
                    <div className="rounded-xl border border-ink-600/60 p-4 mb-5 space-y-1.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-ink-400">Barbeiro</span>
                        <span className="text-ink-50">{barber?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ink-400">Serviço</span>
                        <span className="text-ink-50">{service?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ink-400">Data</span>
                        <span className="text-ink-50">{day}, {slot}</span>
                      </div>
                      <div className="flex justify-between pt-1.5 border-t border-ink-600/50 mt-1.5">
                        <span className="text-ink-400">Valor</span>
                        <span className="text-gold-300 font-medium">{service && formatBRL(service.price)}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome completo"
                        className="w-full rounded-xl border border-ink-600/60 bg-ink-900/40 px-4 py-2.5 text-sm outline-none focus:border-gold-400/50 placeholder:text-ink-500"
                      />
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="WhatsApp (11) 90000-0000"
                        className="w-full rounded-xl border border-ink-600/60 bg-ink-900/40 px-4 py-2.5 text-sm outline-none focus:border-gold-400/50 placeholder:text-ink-500"
                      />
                    </div>
                    <Button
                      className="w-full mt-6"
                      size="lg"
                      disabled={!name || !phone}
                      onClick={() => setConfirmed(true)}
                    >
                      Confirmar agendamento
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
          )}
        </div>
      </main>
    </>
  );
}
