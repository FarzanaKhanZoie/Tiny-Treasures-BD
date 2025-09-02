import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { name, phone, address, note, items } = await req.json();
  if (!items?.length) return NextResponse.json({ error: "Empty cart" }, { status: 400 });

  const products = await prisma.product.findMany({ where: { id: { in: items.map((i:any)=>i.id) } } });
  const orderItems = items.map((i:any) => {
    const p = products.find(x => x.id === i.id)!;
    const priceBdt = p.salePriceBdt ?? p.priceBdt;
    return { productId: p.id, qty: i.qty, priceBdt };
  });
  const totalBdt = orderItems.reduce((s:number, it:any) => s + it.priceBdt * it.qty, 0);

  const order = await prisma.order.create({
    data: { name, phone, address, note, totalBdt, items: { create: orderItems } }
  });
  return NextResponse.json({ ok: true, orderId: order.id });
}
