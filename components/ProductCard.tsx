// components/ProductCard.tsx
"use client";

import { useRef, useState } from "react";
import BookFly from "./BookFly";

type Props = {
  title: string;
  cover: string;   // miniature de l'article
  pdfImage: string; // image à afficher dans le livre ouvert
  onBuy?: () => void; // callback bouton
};

export default function ProductCard({ title, cover, pdfImage, onBuy }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [flying, setFlying] = useState(false);

  const onHover = () => {
    if (flying) return;
    // calcule une origine depuis la carte (optionnel)
    const rect = ref.current?.getBoundingClientRect();
    const from = rect
      ? { x: rect.left - window.innerWidth / 2 + rect.width / 2, y: rect.top - window.innerHeight / 2 }
      : undefined;
    setFlying(true);
  };

  return (
    <>
      {flying && (
        <BookFly
          pdfImage={pdfImage}
          onDone={() => setFlying(false)}
        />
      )}

      <div
        ref={ref}
        onMouseEnter={onHover}
        className="group relative overflow-hidden rounded-2xl bg-white/8 backdrop-blur border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <img src={cover} alt={title} className="w-full h-48 object-cover opacity-95 group-hover:opacity-100 transition" />
        <div className="p-4">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <div className="mt-3 flex gap-2">
            <button
              onClick={onBuy}
              className="px-3 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white text-sm"
            >
              Acheter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
