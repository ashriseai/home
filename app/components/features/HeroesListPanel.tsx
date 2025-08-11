import { memo } from "react";
import type { Hero } from "~/types";

const HeroesListPanel = memo(function HeroesListPanel(props: {
  heroes: Hero[];
  onSelect: (h: Hero) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-mono text-neutral-300">Your Heroes — click to chat</div>
      <ul className="space-y-2">
        {props.heroes.map((h) => (
          <li key={h.id} className="flex items-center justify-between gap-3 rounded border border-white/10 bg-white/5 px-3 py-2">
            <div className="flex min-w-0 items-center gap-3">
              <img src={h.avatar} alt={h.name} className="h-8 w-8 rounded object-cover" />
              <div className="min-w-0">
                <div className="truncate font-mono text-neutral-100">{h.name}</div>
                <div className="truncate font-mono text-xs text-neutral-400">{h.bio}</div>
              </div>
            </div>
            <button onClick={() => props.onSelect(h)} className="rounded border border-cyan-400/40 px-2 py-1 font-mono text-xs text-cyan-200 hover:bg-cyan-500/10">
              talk
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default HeroesListPanel;