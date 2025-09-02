"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [form, setForm] = useState<any>({ title: "", slug: "", priceBdt: 0, imageUrl: "", inStock: true });
  const router = useRouter();

  useEffect(() => { fetch("/api/collections").then(r=>r.json()).then(setCollections); }, []);

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    const fd = new FormData(); fd.append("file", f);
    const res = await fetch("/api/blob", { method: "POST", body: fd });
    const data = await res.json(); setForm((x:any)=>({ ...x, imageUrl: data.url }));
  }

  async function save() {
    const res = await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) router.push("/admin");
  }

  return (
    <div className="max-w-xl space-y-3">
      <h1 className="text-xl font-semibold">New Product</h1>
      <input className="border rounded px-3 py-2 w-full" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
      <input className="border rounded px-3 py-2 w-full" placeholder="Slug (unique)" value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})} />
      <input type="number" className="border rounded px-3 py-2 w-full" placeholder="Price (Tk)" value={form.priceBdt} onChange={e=>setForm({...form,priceBdt:parseInt(e.target.value||'0')})} />
      <input type="number" className="border rounded px-3 py-2 w-full" placeholder="Sale Price (optional)" onChange={e=>setForm({...form,salePriceBdt:e.target.value?parseInt(e.target.value):null})} />
      <select className="border rounded px-3 py-2 w-full" value={form.collectionId||""} onChange={e=>setForm({...form,collectionId:e.target.value||null})}>
        <option value="">No collection</option>
        {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <label className="flex items-center gap-2"><input type="checkbox" checked={!!form.inStock} onChange={e=>setForm({...form,inStock:e.target.checked})}/> In stock</label>
      <div className="space-y-2">
        <input type="file" onChange={upload} />
        {form.imageUrl && <div className="text-xs break-all">Uploaded: {form.imageUrl}</div>}
      </div>
      <button className="btn btn-primary" onClick={save}>Save</button>
    </div>
  );
}
