interface EyebrowProps {
  children: React.ReactNode;
  quiet?: boolean;
}

export default function Eyebrow({ children, quiet = false }: EyebrowProps) {
  return <div className={quiet ? "eyebrow-quiet" : "eyebrow"}>{children}</div>;
}
