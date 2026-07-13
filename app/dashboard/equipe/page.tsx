"use client";

import { Topbar } from "@/components/dashboard/Topbar";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { barbers, teamSchedule } from "@/lib/mock-data";
import { formatBRL } from "@/lib/utils";
import { Star, Clock3, Award } from "lucide-react";

const days: { key: keyof (typeof teamSchedule)[0]; label: string }[] = [
  { key: "mon", label: "Seg" },
  { key: "tue", label: "Ter" },
  { key: "wed", label: "Qua" },
  { key: "thu", label: "Qui" },
  { key: "fri", label: "Sex" },
  { key: "sat", label: "Sáb" },
  { key: "sun", label: "Dom" },
];

export default function EquipePage() {
  return (
    <>
      <Topbar title="Equipe" subtitle="Escala, metas, ranking e controle de ponto" />

      <div className="p-5 lg:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {barbers.map((b, i) => (
            <Card key={b.id}>
              <CardBody className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="h-11 w-11 rounded-full flex items-center justify-center text-sm font-semibold text-ink-900"
                    style={{ backgroundColor: b.color }}
                  >
                    {b.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-ink-50 truncate">{b.name}</p>
                    <p className="text-xs text-ink-400">{b.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gold-300">
                  <Star size={13} className="fill-gold-300" /> {b.rating}
                  {i === 0 && (
                    <Badge tone="gold" className="ml-auto">
                      <Award size={11} /> Top do mês
                    </Badge>
                  )}
                </div>
                <div className="flex justify-between text-xs text-ink-400 pt-2 border-t border-ink-600/50">
                  <span>Meta individual</span>
                  <span className="text-ink-200">{formatBRL(12000)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-ink-600/60 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-400 to-gold-300"
                    style={{ width: `${Math.min((b.revenueMonth / 12000) * 100, 100)}%` }}
                  />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader title="Escala de trabalho" subtitle="Horários semanais por barbeiro" />
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-ink-400 border-b border-ink-600/50">
                    <th className="px-5 py-3 font-medium">Barbeiro</th>
                    {days.map((d) => (
                      <th key={d.key} className="px-3 py-3 font-medium text-center">{d.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-600/50">
                  {teamSchedule.map((row) => {
                    const barber = barbers.find((b) => b.id === row.barberId)!;
                    return (
                      <tr key={row.barberId}>
                        <td className="px-5 py-3.5 text-ink-50 whitespace-nowrap">{barber.name}</td>
                        {days.map((d) => (
                          <td key={d.key} className="px-3 py-3.5 text-center">
                            {row[d.key] === "folga" ? (
                              <span className="text-ink-500 text-xs">folga</span>
                            ) : (
                              <span className="text-xs text-ink-200">{row[d.key]}h</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Controle de ponto" action={<Clock3 size={16} className="text-gold-300" />} />
            <CardBody className="space-y-3">
              {barbers.map((b) => (
                <div key={b.id} className="flex items-center justify-between text-sm">
                  <span className="text-ink-200">{b.name}</span>
                  <Badge tone="green">entrada 09:02</Badge>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Controle de férias" />
            <CardBody className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-200">Diego Alves</span>
                <span className="text-ink-400">10 a 25/ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-200">Bruno Ferreira</span>
                <span className="text-ink-400">Sem férias agendadas</span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
