import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashSync("Admin@123", 10),
      name: "Admin",
      role: "ADMIN"
    }
  });

  const col1 = await prisma.collection.upsert({
    where: { slug: "new-launch" },
    update: {},
    create: { slug: "new-launch", name: "New Launch", blurb: "Fresh drops." }
  });

  const col2 = await prisma.collection.upsert({
    where: { slug: "sale" },
    update: {},
    create: { slug: "sale", name: "Sale", blurb: "Discounted goodies." }
  });

  await prisma.product.createMany({
    data: [
      {
        title: "Bow Hair Clip",
        slug: "bow-hair-clip",
        priceBdt: 350,
        salePriceBdt: 299,
        imageUrl: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
        images: [],
        inStock: true,
        badges: ["Sale"],
        collectionId: col2.id
      },
      {
        title: "Floral Scrunchie",
        slug: "floral-scrunchie",
        priceBdt: 220,
        imageUrl: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5",
        images: [],
        inStock: true,
        badges: ["New"],
        collectionId: col1.id
      },
      {
        title: "Pearl Earrings",
        slug: "pearl-earrings",
        priceBdt: 550,
        imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        images: [],
        inStock: false,
        badges: ["Sold out"]
      }
    ]
  });

  console.log("Seeded. Admin: admin@example.com / Admin@123");
}

main().finally(() => prisma.$disconnect());
