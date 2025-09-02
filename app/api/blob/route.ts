import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });
  const { url } = await put(`products/${Date.now()}-${file.name}`, file, { access: "public" });
  return NextResponse.json({ url });
}
