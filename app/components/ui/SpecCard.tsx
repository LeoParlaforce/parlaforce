interface SpecCardProps {
  num: string;
  label: string;
}

export default function SpecCard({ num, label }: SpecCardProps) {
  return (
    <div
      style={{
        padding: "24px 22px",
        background: "rgba(0,0,0,0.45)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div className="display" style={{ fontSize: 56, lineHeight: 0.9 }}>{num}</div>
      <div className="eyebrow-quiet" style={{ marginTop: 8 }}>{label}</div>
    </div>
  );
}
