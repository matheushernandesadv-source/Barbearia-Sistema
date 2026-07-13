"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

const SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export async function getAvailableSlots(barberId: string, dateKey: string) {
  const date = parseDateKey(dateKey);
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const appointments = await prisma.appointment.findMany({
    where: {
      barberId,
      date: { gte: start, lte: end },
      status: { not: "cancelado" },
    },
    select: { time: true },
  });

  const taken = new Set(appointments.map((a) => a.time));
  return SLOTS.map((time) => ({ time, taken: taken.has(time) }));
}

export async function createBooking(input: {
  barberId: string;
  serviceId: string;
  dateKey: string;
  time: string;
  name: string;
  phone: string;
}) {
  const service = await prisma.service.findUnique({ where: { id: input.serviceId } });
  if (!service) throw new Error("Serviço não encontrado.");

  const date = parseDateKey(input.dateKey);
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const conflict = await prisma.appointment.findFirst({
    where: {
      barberId: input.barberId,
      date: { gte: start, lte: end },
      time: input.time,
      status: { not: "cancelado" },
    },
  });
  if (conflict) throw new Error("Esse horário acabou de ser reservado. Escolha outro.");

  let client = await prisma.client.findFirst({ where: { phone: input.phone } });
  if (!client) {
    client = await prisma.client.create({
      data: { name: input.name, phone: input.phone, status: "ativo" },
    });
  }

  const appointment = await prisma.appointment.create({
    data: {
      date,
      time: input.time,
      clientId: client.id,
      barberId: input.barberId,
      serviceId: input.serviceId,
      price: service.price,
      status: "confirmado",
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/agenda");
  revalidatePath("/dashboard/clientes");

  return { id: appointment.id };
}
