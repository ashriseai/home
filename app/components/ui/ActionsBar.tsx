import { memo } from "react";
import { cn } from "~/utils";

const ActionsBar = memo(function ActionsBar(props: {
  onDonate: () => void;
  onCreate: () => void;
  onList: () => void;
  onAbout: () => void;
  onHelp: () => void;
}) {
  const btn = "font-mono text-xs rounded-md px-3 py-2 border";
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <button onClick={props.onDonate} className={cn(btn, "border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-200 hover:border-fuchsia-300/70 hover:bg-fuchsia-400/10")}>Donate</button>
      <button onClick={props.onCreate} className={cn(btn, "border-emerald-400/40 bg-emerald-500/10 text-emerald-200 hover:border-emerald-300/70 hover:bg-emerald-400/10")}>CreateHero</button>
      <button onClick={props.onList} className={cn(btn, "border-cyan-400/40 bg-cyan-500/10 text-cyan-200 hover:border-cyan-300/70 hover:bg-cyan-400/10")}>ListHero</button>
      <button onClick={props.onAbout} className={cn(btn, "border-amber-400/40 bg-amber-500/10 text-amber-200 hover:border-amber-300/70 hover:bg-amber-400/10")}>About</button>
      <button onClick={props.onHelp} className={cn(btn, "border-indigo-400/40 bg-indigo-500/10 text-indigo-200 hover:border-indigo-300/70 hover:bg-indigo-400/10")}>Help</button>
    </div>
  );
});

export default ActionsBar;