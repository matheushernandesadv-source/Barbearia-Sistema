"use client";

import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";

const pieColors = ["#d1a838", "#7dd3fc", "#86efac", "#f9a8d4", "#c9ced6"];

export function RevenueByBarberChart({ data }: { data: { name: string; faturamento: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid stroke="#22262e" vertical={false} />
        <XAxis dataKey="name" stroke="#9aa1ad" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} width={40} />
        <Tooltip contentStyle={{ background: "#111318", border: "1px solid #22262e", borderRadius: 12, fontSize: 12 }} />
        <Bar dataKey="faturamento" fill="#d1a838" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TopServicesPieChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
          {data.map((_, i) => (
            <Cell key={i} fill={pieColors[i % pieColors.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ background: "#111318", border: "1px solid #22262e", borderRadius: 12, fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 12, color: "#c9ced6" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function BusyHoursLineChart({ data }: { data: { hour: string; ocupacao: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <CartesianGrid stroke="#22262e" vertical={false} />
        <XAxis dataKey="hour" stroke="#9aa1ad" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} width={40} />
        <Tooltip contentStyle={{ background: "#111318", border: "1px solid #22262e", borderRadius: 12, fontSize: 12 }} />
        <Line type="monotone" dataKey="ocupacao" stroke="#d1a838" strokeWidth={2.5} dot={{ r: 3, fill: "#d1a838" }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
