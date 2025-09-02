import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Four O'Clock (Free) — Next.js Store",
  description: "Zero-cost student-friendly store template."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Providers>
          <Ticker />
          <Navbar />
          <main className="container py-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
