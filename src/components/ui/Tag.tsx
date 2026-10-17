interface TagProps { children: React.ReactNode; tone?: "neutral" | "accent" }

export default function Tag({ children, tone = "neutral" }: TagProps) {
  const color = tone === "accent" ? "border-terracotta text-terracotta" : "border-grain text-muted";
  return (
    <span className={`inline-block rounded-[4px] border px-2 py-1 font-mono text-xs uppercase tracking-wider ${color}`}>
      {children}
    </span>
  );
}
