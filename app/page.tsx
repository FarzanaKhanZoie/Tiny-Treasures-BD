import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default async function HomePage() {
  const [newLaunch, sale] = await Promise.all([
    prisma.product.findMany({
      where: { collection: { slug: "new-launch" } },
      orderBy: { createdAt: "desc" },
      take: 8
    }),
    prisma.product.findMany({
      where: { collection: { slug: "sale" } },
      orderBy: { createdAt: "desc" },
      take: 8
    }),
  ]);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-3xl font-bold">Cute & Pinteresty Accessories</h1>
        <p className="text-gray-600 mt-2">BD student‑friendly store. 100% free to host.</p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">New Launch</h2>
          <Link className="text-sm underline" href="/collections/new-launch">See all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newLaunch.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Sale</h2>
          <Link className="text-sm underline" href="/collections/sale">See all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sale.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  );
}
