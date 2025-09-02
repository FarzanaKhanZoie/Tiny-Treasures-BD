import Link from "next/link";
import { formatBDT } from "@/lib/currency";

export default function ProductCard({ p }: { p: any }) {
  const price = p.salePriceBdt ?? p.priceBdt;
  const onSale = !!p.salePriceBdt;
  return (
    <div className="card">
      <Link href={`/product/${p.id}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.imageUrl} alt={p.title} className="w-full h-64 object-cover" />
      </Link>
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium line-clamp-1">{p.title}</h3>
          {onSale && <span className="badge border-red-500 text-red-600">Sale</span>}
          {!p.inStock && <span className="badge border-gray-400 text-gray-600">Sold out</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{formatBDT(price)}</span>
          {onSale && <span className="text-xs line-through text-gray-500">{formatBDT(p.priceBdt)}</span>}
        </div>
        <div className="mt-3">
          <Link
            href={p.inStock ? `/product/${p.id}` : "#"}
            className={`btn btn-primary w-full ${p.inStock ? "" : "pointer-events-none opacity-50"}`}
          >
            {p.inStock ? "Add to Cart" : "Sold out"}
          </Link>
        </div>
      </div>
    </div>
  );
}
