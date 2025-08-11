import { memo } from "react";

const FantasyConsoleSplash = memo(function FantasyConsoleSplash() {
    return (
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-neutral-900/70 p-4 font-mono">
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(transparent,transparent_2px,rgba(255,255,255,0.3)_2px)] bg-[length:100%_3px]" />
            <pre className="text-[12px] leading-[1.15] whitespace-pre">{String.raw`
      ."""-._
     /  _  _ \
    /  (o)(o) \   ASHRISE
   /_____..___ \   Fantasy Console v0.1
  /  \__/\__/  \  > booting phoenix-core
 /________________\
   \  /  \  /
    \/____\/
      `}</pre>
            <div className="mt-2 text-amber-200">hint: use buttons on the left</div>
        </div>
    );
});

export default FantasyConsoleSplash;