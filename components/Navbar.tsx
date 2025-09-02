"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const path = usePathname();
  return (
    <nav className="border-b bg-white sticky top-0 z-40">
      <div className="container h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">Four O'Clock (Free)</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/collections/new-launch" className={path?.includes("/collections/new-launch") ? "font-semibold" : ""}>New Launch</Link>
          <Link href="/collections/sale" className={path?.includes("/collections/sale") ? "font-semibold" : ""}>Sale</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
