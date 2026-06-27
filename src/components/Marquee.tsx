const items = [
  "Siti vetrina",
  "Landing page",
  "Menù digitali",
  "Prenotazioni",
  "Chiaro",
  "Design su misura",
];

export default function Marquee() {
  // Duplicate the list so the loop is seamless.
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-line/15 py-6">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap sm:gap-16">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-10 sm:gap-16">
            <span className="font-display text-2xl font-light text-muted sm:text-3xl">
              {item}
            </span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
