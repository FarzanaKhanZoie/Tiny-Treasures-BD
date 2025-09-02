"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatBDT } from "@/lib/currency";

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setItems(cart);
  }, []);

  const total = items.reduce((s, i) => s + i.priceBdt * i.qty, 0);

  function updateQty(id: string, qty: number) {
    const next = items.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i);
    setItems(next);
    localStorage.setItem("cart", JSON.stringify(next));
  }

  function removeItem(id: string) {
    const next = items.filter(i => i.id !== id);
    setItems(next);
    localStorage.setItem("cart", JSON.stringify(next));
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Your Cart</h1>
      {items.length === 0 ? (
        <div>Cart is empty. <Link className="underline" href="/">Go shopping</Link></div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map(i => (
              <div key={i.id} className="flex items-center gap-4 border rounded p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={i.imageUrl} alt={i.title} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium">{i.title}</div>
                  <div className="text-sm text-gray-600">{formatBDT(i.priceBdt)}</div>
                </div>
                <input type="number" min={1} value={i.qty} onChange={e => updateQty(i.id, parseInt(e.target.value || "1"))} className="border rounded px-2 py-1 w-20"/>
                <button onClick={() => removeItem(i.id)} className="btn">Remove</button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <div className="text-lg font-semibold">Total: {formatBDT(total)}</div>
            <Link href="/checkout" className="btn btn-primary">Checkout (COD)</Link>
          </div>
        </>
      )}
    </div>
  );
}
