"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export type CartItemInput = {
  id: string;
  kind: "servico" | "produto";
  qty: number;
  price: number;
};

export async function finalizeSale(input: {
  items: CartItemInput[];
  paymentMethod: "pix" | "cartao" | "dinheiro" | "vale";
  discount: number;
}) {
  if (input.items.length === 0) throw new Error("Comanda vazia.");

  const subtotal = input.items.reduce((s, i) => s + i.price * i.qty, 0);
  const total = Math.max(subtotal - input.discount, 0);

  const productIds = input.items.filter((i) => i.kind === "produto").map((i) => i.id);
  if (productIds.length > 0) {
    const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
    for (const item of input.items.filter((i) => i.kind === "produto")) {
      const product = products.find((p) => p.id === item.id);
      if (!product) continue;
      if (product.stock < item.qty) {
        throw new Error(`Estoque insuficiente para ${product.name}.`);
      }
    }
  }

  const sale = await prisma.sale.create({
    data: {
      paymentMethod: input.paymentMethod,
      discount: input.discount,
      total,
      items: {
        create: input.items.map((i) => ({
          quantity: i.qty,
          price: i.price,
          productId: i.kind === "produto" ? i.id : undefined,
          serviceId: i.kind === "servico" ? i.id : undefined,
        })),
      },
    },
  });

  for (const item of input.items.filter((i) => i.kind === "produto")) {
    await prisma.product.update({
      where: { id: item.id },
      data: { stock: { decrement: item.qty } },
    });
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/estoque");
  revalidatePath("/dashboard/financeiro");
  revalidatePath("/dashboard/relatorios");

  return { id: sale.id, total };
}
