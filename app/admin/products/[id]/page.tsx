"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const [p, setP] = useState<any>(null);
  const [collections, setCollections] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/products/${params.id}`).then(r=>r.json()).then(setP);
    fetch("/api/collections").then(r=>r.json()).then(setCollections);
  }, [params.id]);

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    const fd = new FormData(); fd.append("file", f);
    const res = await fetch("/api/blob", { method: "POST", body: fd });
    const data = await res.json(); setP((x:any)=>({ ...x, imageUrl: data.url }));
  }

  async function save() {
    const res = await fetch(`/api/products/${params.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) });
    if (res.ok) router.push("/admin");
  }

  async function del() {
    const res = await fetch(`/api/products/${params.id}`, { method: "DELETE" });
    if (res.ok) router.push("/admin");
  }

  if (!p) return <div>Loading...</div>;

  return (
    <div className="max-w-xl space-y-3">
      <h1 className="text-xl font-semibold">Edit Product</h1>
      <input className="border rounded px-3 py-2 w-full" placeholder="Title" value={p.title} onChange={e=>setP({...p,title:e.target.value})} />
      <input className="border rounded px-3 py-2 w-full" placeholder="Slug" value={p.slug} onChange={e=>setP({...p,slug:e.target.value})} />
      <input type="number" className="border rounded px-3 py-2 w-full" placeholder="Price (Tk)" value={p.priceBdt} onChange={e=>setP({...p,priceBdt:parseInt(e.target.value||'0')})} />
      <input type="number" className="border rounded px-3 py-2 w-full" placeholder="Sale Price" value={p.salePriceBdt ?? ""} onChange={e=>setP({...p,salePriceBdt:e.target.value?parseInt(e.target.value):null})} />
      <select className="border rounded px-3 py-2 w-full" value={p.collectionId||""} onChange={e=>setP({...p,collectionId:e.target.value||null})}>
        <option value="">No collection</option>
        {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <label className="flex items-center gap-2"><input type="checkbox" checked={!!p.inStock} onChange={e=>setP({...p,inStock:e.target.checked})}/> In stock</label>
      <div className="space-y-2">
        <input type="file" onChange={upload} />
        {p.imageUrl && <div className="text-xs break-all">Uploaded: {p.imageUrl}</div>}
      </div>
      <div className="flex gap-3">
        <button className="btn btn-primary" onClick={save}>Save</button>
        <button className="btn" onClick={del}>Delete</button>
      </div>
    </div>
  );
}
