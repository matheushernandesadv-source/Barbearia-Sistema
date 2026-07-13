"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Topbar } from "@/components/dashboard/Topbar";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatBRL } from "@/lib/utils";
import { Trash2, QrCode, CreditCard, Banknote, Ticket, Tag, CheckCircle2 } from "lucide-react";
import { finalizeSale } from "@/lib/actions/sales";
import type { getServices, getProducts } from "@/lib/data";

type CartItem = { id: string; name: string; price: number; qty: number; kind: "servico" | "produto" };

export function VendasClient({
  services,
  products,
}: {
  services: Awaited<ReturnType<typeof getServices>>;
  products: Awaited<ReturnType<typeof getProducts>>;
}) {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [payment, setPayment] = useState<"pix" | "cartao" | "dinheiro" | "vale">("pix");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  function addItem(item: Omit<CartItem, "qty">) {
    setSuccess(false);
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function removeItem(id: string) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total = Math.max(subtotal - discount, 0);

  function submit() {
    setError(null);
    startTransition(async () => {
      try {
        await finalizeSale({
          items: cart.map((i) => ({ id: i.id, kind: i.kind, qty: i.qty, price: i.price })),
          paymentMethod: payment,
          discount,
        });
        setCart([]);
        setDiscount(0);
        setSuccess(true);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Não foi possível finalizar a venda.");
      }
    });
  }

  return (
    <>
      <Topbar title="PDV / Vendas" subtitle="Venda de serviços e produtos" />

      <div className="p-5 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader title="Serviços" />
            <CardBody className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => addItem({ id: s.id, name: s.name, price: s.price, kind: "servico" })}
                  className="rounded-xl border border-ink-600/60 p-3.5 text-left hover:border-gold-400/40 hover:bg-gold-400/5 transition-colors"
                >
                  <p className="text-sm text-ink-50">{s.name}</p>
                  <p className="text-xs text-gold-300 mt-1">{formatBRL(s.price)}</p>
                </button>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Produtos" />
            <CardBody className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {products.map((p) => (
                <button
                  key={p.id}
                  disabled={p.stock <= 0}
                  onClick={() => addItem({ id: p.id, name: p.name, price: p.price, kind: "produto" })}
                  className="rounded-xl border border-ink-600/60 p-3.5 text-left hover:border-gold-400/40 hover:bg-gold-400/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-ink-600/60 disabled:hover:bg-transparent"
                >
                  <p className="text-sm text-ink-50">{p.name}</p>
                  <p className="text-xs text-gold-300 mt-1">{formatBRL(p.price)}</p>
                  <p className="text-[11px] text-ink-500 mt-0.5">{p.stock} em estoque</p>
                </button>
              ))}
            </CardBody>
          </Card>
        </div>

        <Card className="h-fit lg:sticky lg:top-24">
          <CardHeader title="Comanda atual" subtitle={`${cart.length} item(ns)`} />
          <CardBody className="space-y-4">
            {success && (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-3 text-sm text-emerald-300">
                <CheckCircle2 size={16} /> Venda registrada com sucesso.
              </div>
            )}

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {cart.length === 0 && (
                <p className="text-sm text-ink-500 italic py-6 text-center">Nenhum item adicionado</p>
              )}
              {cart.map((i) => (
                <div key={i.id} className="flex items-center justify-between gap-2 rounded-xl border border-ink-600/60 p-3">
                  <div className="min-w-0">
                    <p className="text-sm text-ink-50 truncate">{i.name}</p>
                    <p className="text-xs text-ink-400">
                      {i.qty}x {formatBRL(i.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gold-300">{formatBRL(i.price * i.qty)}</span>
                    <button onClick={() => removeItem(i.id)} className="text-ink-400 hover:text-red-400">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-ink-600/60 p-3">
              <Tag size={15} className="text-ink-400" />
              <span className="text-sm text-ink-300">Cashback / desconto</span>
              <input
                type="number"
                value={discount || ""}
                onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                placeholder="R$ 0,00"
                className="ml-auto w-24 bg-transparent text-right text-sm outline-none text-ink-50 placeholder:text-ink-500"
              />
            </div>

            <div>
              <p className="text-xs text-ink-400 mb-2">Forma de pagamento</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "pix", label: "PIX", icon: QrCode },
                  { id: "cartao", label: "Cartão", icon: CreditCard },
                  { id: "dinheiro", label: "Dinheiro", icon: Banknote },
                  { id: "vale", label: "Vale", icon: Ticket },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPayment(m.id as typeof payment)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                      payment === m.id
                        ? "border-gold-400/50 bg-gold-400/10 text-gold-300"
                        : "border-ink-600/60 text-ink-300 hover:text-ink-50"
                    }`}
                  >
                    <m.icon size={15} /> {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-ink-600/60 pt-4 space-y-1.5">
              <div className="flex justify-between text-sm text-ink-300">
                <span>Subtotal</span>
                <span>{formatBRL(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-ink-300">
                <span>Desconto</span>
                <span>- {formatBRL(discount)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-ink-50 pt-1">
                <span>Total</span>
                <span className="text-gold-300">{formatBRL(total)}</span>
              </div>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button className="w-full" size="lg" disabled={cart.length === 0 || isPending} onClick={submit}>
              {isPending ? "Finalizando..." : "Finalizar venda e emitir recibo"}
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
