"use client";
import React from "react";

export default function Ticker() {
  const msgs = [
    "Cash On Delivery All Over Bangladesh",
    "Friday 4:00–4:59 PM → 4% Off",
    "Buy any 4, get Tk 100 off"
  ];
  return (
    <div className="w-full bg-black text-white text-sm py-2 overflow-hidden">
      <div className="animate-[marquee_18s_linear_infinite] whitespace-nowrap px-4">
        {msgs.map((m, i) => (
          <span key={i} className="mr-12">{m}</span>
        ))}
      </div>
      <style>{`@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
    </div>
  );
}
