import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  const col = await prisma.collection.findUnique({ where: { slug: params.slug } });
  if (!col) return <div className="py-10">Collection not found.</div>;
  const products = await prisma.product.findMany({
    where: { collectionId: col.id },
    orderBy: { createdAt: "desc" }
  });
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">{col.name}</h1>
      {col.blurb && <p className="text-gray-600">{col.blurb}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {products.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
