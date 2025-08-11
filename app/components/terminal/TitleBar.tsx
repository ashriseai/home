import { memo } from "react";

/***********************************
 * Presentational components
 ***********************************/
const TitleBar = memo(function TitleBar() {
  return (
    <div className="flex items-center gap-2 border-b border-white/10 bg-neutral-900/70 px-4 py-2">
      <span className="h-3 w-3 rounded-full bg-red-500/70" />
      <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
      <span className="h-3 w-3 rounded-full bg-green-400/70" />
      <span className="ml-3 text-xs text-neutral-300/80">ashrise@phoenix:~</span>
    </div>
  );
});

export default TitleBar;