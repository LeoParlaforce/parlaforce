"use client";
import React from "react";

type Props = {
  title: string;
  cover?: string;
  price?: string;
  onBuy?: () => void;
};

export default function ProductCard({ title, cover, price, onBuy }: Props) {
  return (
    <div className="bg-black/40 p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105">
      {cover && (
        <img
          src={cover}
          alt={title}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {price && <p className="mb-4">{price}</p>}
      {onBuy && (
        <button
          onClick={onBuy}
          className="w-full bg-teal-900 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Acheter
        </button>
      )}
    </div>
  );
}
