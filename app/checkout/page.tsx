"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatBDT } from "@/lib/currency";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setItems(cart);
  }, []);

  const total = items.reduce((s, i) => s + i.priceBdt * i.qty, 0);

  async function placeOrder() {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, address, note, items })
    });
    const data = await res.json();
    if (data.ok) {
      localStorage.removeItem("cart");
      alert("Order placed! ID: " + data.orderId);
      router.push("/");
    } else {
      alert(data.error || "Failed");
    }
  }

  if (items.length === 0) return <div className="py-10">Your cart is empty.</div>;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-3">
        <h1 className="text-xl font-semibold">Cash on Delivery</h1>
        <input placeholder="Full name" className="border rounded px-3 py-2 w-full" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Phone" className="border rounded px-3 py-2 w-full" value={phone} onChange={e=>setPhone(e.target.value)} />
        <textarea placeholder="Address" className="border rounded px-3 py-2 w-full" rows={4} value={address} onChange={e=>setAddress(e.target.value)} />
        <textarea placeholder="Note (optional)" className="border rounded px-3 py-2 w-full" rows={3} value={note} onChange={e=>setNote(e.target.value)} />
        <button onClick={placeOrder} className="btn btn-primary w-full">Place Order</button>
      </div>
      <div>
        <h2 className="font-semibold mb-3">Order Summary</h2>
        <div className="space-y-2">
          {items.map(i => (
            <div key={i.id} className="flex justify-between text-sm">
              <span>{i.title} × {i.qty}</span>
              <span>{formatBDT(i.priceBdt * i.qty)}</span>
            </div>
          ))}
        </div>
        <div className="border-t mt-3 pt-3 font-semibold flex justify-between">
          <span>Total</span><span>{formatBDT(total)}</span>
        </div>
      </div>
    </div>
  );
}
