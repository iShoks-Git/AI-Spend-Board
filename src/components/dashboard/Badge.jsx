export default function Badge({ text, col }) {
  return (
    <span
      className="inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
      style={{ background: col + "1a", color: col, border: `1px solid ${col}33` }}
    >
      {text}
    </span>
  );
}
