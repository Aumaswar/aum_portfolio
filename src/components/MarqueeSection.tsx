const items = [
  "React", "✦", "TypeScript", "✦", "Motion", "✦", "WebGL", "✦",
  "Next.js", "✦", "Creative Dev", "✦", "UI/UX", "✦", "Performance", "✦",
];

const MarqueeSection = () => {
  return (
    <div className="py-12 md:py-16 border-t border-b border-border overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`mx-4 md:mx-6 font-display text-2xl md:text-4xl font-bold ${
              item === "✦" ? "text-primary text-lg md:text-2xl" : "text-foreground/20"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeSection;
