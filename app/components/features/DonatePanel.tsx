import { memo } from "react";
import type { Contributor } from "~/types";

const DonatePanel = memo(function DonatePanel(props: {
  contributors: Contributor[];
  goal: number;
  raised: number;
  pct: number;
  donateSum: number;
  setDonateSum: (n: number) => void;
  onDonate: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="text-sm font-mono text-neutral-300">contributors — scrollable</div>
      <div className="max-h-64 overflow-y-auto pr-2">
        <ul className="space-y-2">
          {props.contributors.map((c, idx) => (
            <li key={idx} className="flex items-center justify-between gap-3 rounded border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-200">
              <span className="truncate font-mono">{c.name}</span>
              <span className="font-mono text-emerald-300">${c.amount.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* progress bar visible only here */}
      <div className="rounded-md border border-white/10 bg-white/5 p-3">
        <div className="mb-2 flex items-center justify-between text-xs text-neutral-300">
          <span>Funding progress</span>
          <span>${props.raised.toLocaleString()} / {props.goal.toLocaleString()} ({props.pct}%)</span>
        </div>
        <div className="h-2 w-full rounded bg-neutral-800">
          <div className="h-2 rounded bg-emerald-400" style={{ width: `${props.pct}%`, transition: "width 400ms ease-out" }} />
        </div>
      </div>

      {/* donate form */}
      <form
        onSubmit={(e) => { e.preventDefault(); props.onDonate(); }}
        className="flex items-center gap-2 font-mono"
      >
        <input
          type="number"
          min={1}
          value={props.donateSum}
          onChange={(e) => props.setDonateSum(parseInt(e.target.value || "0", 10))}
          className="w-28 rounded border border-white/10 bg-black/30 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-1 focus:ring-fuchsia-400/50"
        />
        <button type="submit" className="rounded border border-fuchsia-400/40 bg-fuchsia-500/10 px-3 py-2 text-xs text-fuchsia-200 hover:border-fuchsia-300/70 hover:bg-fuchsia-400/10">
          donate
        </button>
      </form>
    </div>
  );
});

export default DonatePanel;