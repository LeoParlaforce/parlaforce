import Link from "next/link";

interface BtnProps {
  children: React.ReactNode;
  href?: string;
  primary?: boolean;
  label?: string;
  className?: string;
}

export default function Btn({
  children,
  href = "#",
  primary = false,
  label,
  className = "",
}: BtnProps) {
  const cls = `btn-cinema ${primary ? "btn-cinema-primary" : ""} ${className}`.trim();

  return (
    <Link
      href={href}
      className={cls}
      data-cursor={primary ? "accent" : "invert"}
      data-cursor-label={label || ""}
    >
      <span>{children}</span>
      <span className="arrow">→</span>
    </Link>
  );
}
