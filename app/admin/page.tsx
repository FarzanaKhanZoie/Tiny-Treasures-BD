"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function AdminPage() {
  const { data: session } = useSession();
  const { data: products } = useSWR("/api/products", fetcher);

  if (!session) {
    return (
      <div className="max-w-sm mx-auto border rounded p-6">
        <h1 className="text-xl font-semibold mb-4">Admin Login</h1>
        <button className="btn btn-primary w-full" onClick={() => signIn()}>Sign in</button>
        <p className="text-xs text-gray-500 mt-3">Default admin (after seeding): admin@example.com / Admin@123</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <button className="btn" onClick={() => signOut()}>Sign out</button>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Products</h2>
        <Link href="/admin/products/new" className="btn btn-primary">New Product</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((p: any) => (
          <div key={p.id} className="border rounded p-4">
            <div className="font-medium">{p.title}</div>
            <div className="text-sm text-gray-600">{p.slug}</div>
            <div className="flex gap-2 mt-2">
              <Link className="btn" href={`/admin/products/${p.id}`}>Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
