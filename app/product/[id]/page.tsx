"use client";

import { useEffect, useState } from "react";
import { formatBDT } from "@/lib/currency";
import { useRouter } from "next/navigation";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [p, setP] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/products/${params.id}`).then(r => r.json()).then(setP);
  }, [params.id]);

  if (!p) return <div>Loading...</div>;

  const price = p.salePriceBdt ?? p.priceBdt;

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const idx = cart.findIndex((x: any) => x.id === p.id);
    if (idx >= 0) cart[idx].qty += qty;
    else cart.push({ id: p.id, title: p.title, priceBdt: price, imageUrl: p.imageUrl, qty });
    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/cart");
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.imageUrl} alt={p.title} className="w-full h-96 object-cover rounded-lg border" />
      <div>
        <h1 className="text-2xl font-semibold">{p.title}</h1>
        <div className="mt-2 flex items-center gap-3">
          <span className="text-xl font-bold">{formatBDT(price)}</span>
          {p.salePriceBdt && <span className="text-sm line-through text-gray-500">{formatBDT(p.priceBdt)}</span>}
        </div>
        <div className="mt-6 flex items-center gap-3">
          <label className="text-sm">Qty</label>
          <input type="number" min={1} value={qty} onChange={e => setQty(parseInt(e.target.value || "1"))} className="border rounded px-2 py-1 w-20"/>
        </div>
        <button onClick={addToCart} disabled={!p.inStock} className={`btn btn-primary mt-6 ${p.inStock ? "" : "opacity-50 pointer-events-none"}`}>
          {p.inStock ? "Add to Cart" : "Sold out"}
        </button>
      </div>
    </div>
  );
}
