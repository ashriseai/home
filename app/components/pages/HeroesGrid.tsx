type HeroCard = { id: string; name: string; image: string; bio: string };
function HeroesGrid() {
  const heroes: HeroCard[] = [
    { id: "lumi", name: "Lumi", image: "/logo.jpg", bio: "Kind neon guide. Always rising." },
    { id: "quant", name: "Quant", image: "/logo.jpg", bio: "Curious kid. Stats & signals." },
    { id: "ember", name: "Ember", image: "/logo.jpg", bio: "Phoenix spark with glitch magic." },
  ];

  return (
    <section className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {heroes.map((h) => (
          <div key={h.id} className="rounded-lg border border-white/10 bg-neutral-950/70 p-4 shadow-[0_0_20px_rgba(0,255,170,0.05)]">
            <div className="flex items-start gap-3">
              <img src={h.image} alt={h.name} className="h-14 w-14 rounded-md object-cover border border-white/10" />
              <div className="min-w-0">
                <h3 className="font-mono text-[13px] text-emerald-300 truncate">{h.name}</h3>
                <p className="mt-1 text-[12px] text-neutral-300 leading-snug line-clamp-3">{h.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HeroesGrid;