"use client";

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export function CashFlowBarChart({ data }: { data: { day: string; entradas: number; saidas: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid stroke="#22262e" vertical={false} />
        <XAxis dataKey="day" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} width={40} />
        <Tooltip contentStyle={{ background: "#111318", border: "1px solid #22262e", borderRadius: 12, fontSize: 12 }} />
        <Bar dataKey="entradas" fill="#d1a838" radius={[4, 4, 0, 0]} />
        <Bar dataKey="saidas" fill="#ef4444" radius={[4, 4, 0, 0]} opacity={0.7} />
      </BarChart>
    </ResponsiveContainer>
  );
}
