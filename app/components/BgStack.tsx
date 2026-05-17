"use client";

import { useBg } from "./BgContext";

const BACKGROUNDS = [
  { id: "hero",   cls: "bg-[url('/textures/idea_2_clean.jpg')]" },
  { id: "orange", cls: "bg-[url('/textures/idea_3_clean.jpg')]" },
  { id: "amber",  cls: "bg-[url('/textures/idea_6_clean.png')]" },
  { id: "purple", cls: "bg-[url('/textures/idea_4_clean.jpg')]" },
  { id: "violet", cls: "bg-[url('/textures/idea_5_clean.jpg')]" },
];

export default function BgStack() {
  const { active } = useBg();

  return (
    <div className="bg-stack">
      {BACKGROUNDS.map((bg) => (
        <div
          key={bg.id}
          className={`bg-layer bg-cover bg-center ${bg.cls} ${active === bg.id ? "active" : ""}`}
        />
      ))}
    </div>
  );
}
