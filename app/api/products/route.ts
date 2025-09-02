import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const products = await prisma.product.findMany({ include: { collection: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const p = await prisma.product.create({ data: body });
  return NextResponse.json(p);
}
