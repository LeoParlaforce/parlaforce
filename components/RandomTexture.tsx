"use client";

import { useEffect, useState } from "react";

const TEXTURES = [
  "/textures/idea_2_clean.jpg",
  "/textures/idea_3_clean.jpg",
  "/textures/idea_4_clean.jpg",
  "/textures/idea_5_clean.jpg",
  "/textures/idea_6_clean.jpg",
];

export default function RandomTexture() {
  const [src, setSrc] = useState(TEXTURES[0]);

  useEffect(() => {
    setSrc(TEXTURES[Math.floor(Math.random() * TEXTURES.length)]);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage: `url('${src}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}
