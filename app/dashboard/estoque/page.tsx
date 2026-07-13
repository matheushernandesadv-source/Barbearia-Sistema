import { Topbar } from "@/components/dashboard/Topbar";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getProducts } from "@/lib/data";
import { formatBRL, formatDatePt } from "@/lib/utils";
import { AlertTriangle, PackagePlus, PackageMinus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EstoquePage() {
  const products = await getProducts();
  const lowStock = products.filter((p) => p.stock <= p.min);

  return (
    <>
      <Topbar title="Estoque" subtitle="Produtos, entradas, saídas e validade" />

      <div className="p-5 lg:p-8 space-y-6">
        {lowStock.length > 0 && (
          <div className="rounded-2xl border border-orange-400/30 bg-orange-400/5 p-4 flex items-center gap-3">
            <AlertTriangle className="text-orange-400 shrink-0" size={20} />
            <p className="text-sm text-orange-200">
              {lowStock.length} produto(s) com estoque abaixo do mínimo: {lowStock.map((p) => p.name).join(", ")}.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Itens cadastrados</p>
              <p className="font-display text-2xl text-ink-50 mt-1">{products.length}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Estoque baixo</p>
              <p className="font-display text-2xl text-orange-400 mt-1">{lowStock.length}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Valor em estoque</p>
              <p className="font-display text-2xl text-ink-50 mt-1">
                {formatBRL(products.reduce((s, p) => s + p.cost * p.stock, 0))}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <p className="text-xs text-ink-400">Consumo interno (mês)</p>
              <p className="font-display text-2xl text-ink-50 mt-1">18 un.</p>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader
            title="Produtos"
            action={
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  <PackageMinus size={14} /> Saída
                </Button>
                <Button size="sm">
                  <PackagePlus size={14} /> Entrada
                </Button>
              </div>
            }
          />
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-ink-400 border-b border-ink-600/50">
                    <th className="px-5 py-3 font-medium">Produto</th>
                    <th className="px-5 py-3 font-medium">SKU</th>
                    <th className="px-5 py-3 font-medium">Estoque</th>
                    <th className="px-5 py-3 font-medium">Custo</th>
                    <th className="px-5 py-3 font-medium">Preço venda</th>
                    <th className="px-5 py-3 font-medium">Validade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-600/50">
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td className="px-5 py-3.5 text-ink-50">{p.name}</td>
                      <td className="px-5 py-3.5 text-ink-400 font-mono text-xs">{p.sku}</td>
                      <td className="px-5 py-3.5">
                        <Badge tone={p.stock <= p.min ? "red" : "green"}>{p.stock} un.</Badge>
                      </td>
                      <td className="px-5 py-3.5 text-ink-200">{formatBRL(p.cost)}</td>
                      <td className="px-5 py-3.5 text-ink-200">{formatBRL(p.price)}</td>
                      <td className="px-5 py-3.5 text-ink-400">{formatDatePt(p.expiry)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
