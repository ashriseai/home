import React from "react";
import { memo } from "react";

const TerminalLogs = memo(
  React.forwardRef<HTMLDivElement, { lines: string[] }>(function TerminalLogs({ lines }, ref) {
    return (
      <div ref={ref} className="h-[22rem] overflow-y-auto pr-2">
        <pre className="font-mono text-[13px] leading-relaxed">
          {lines.map((l, i) => (
            <div
              key={i}
              className={l.trimStart().startsWith("$") ? "text-yellow-400 font-bold" : "text-emerald-300"}
            >
              {l}
            </div>
          ))}
        </pre>
      </div>
    );
  })
);

export default TerminalLogs;