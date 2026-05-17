"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/programs", label: "Programs" },
  { href: "/supervision", label: "Supervision" },
  { href: "/articles", label: "Articles" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="cinema-nav">
      <Link href="/" className="brand" data-cursor="invert">
        Parla<span className="dot">Force.</span>
      </Link>
      <div className="nav-links">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={pathname === l.href ? "active" : ""}
            data-cursor="invert"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
