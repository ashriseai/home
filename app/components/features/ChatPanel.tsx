import { memo, useCallback, useState } from "react";
import { XP_PER_LEVEL, type ChatMessage, type Hero } from "~/types";
import { cn } from "~/utils";

interface ChatPanelProps {
  hero: Hero;
  messages: ChatMessage[];
  onBack: () => void;
  onSend: (text: string) => void;
  chatRef: React.RefObject<HTMLDivElement | null>;
}

const ChatPanel = memo(function ChatPanel(props: ChatPanelProps) {
  const [val, setVal] = useState("");
  const send = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      const text = val.trim();
      if (!text) return;
      props.onSend(text);
      setVal("");
    },
    [val, props]
  );

  const progress = props.hero.xp % XP_PER_LEVEL;

  return (
    <div className="flex h-[22rem] flex-col overflow-hidden rounded-lg border border-white/10 bg-neutral-900/70">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <div className="flex items-center gap-2 font-mono text-sm text-neutral-200">
          <img src={props.hero.avatar} className="h-6 w-6 rounded object-cover" />
          {props.hero.name}
          <span className="text-neutral-400">— {props.hero.bio}</span>
          <span className="ml-2 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-neutral-200">Lvl {props.hero.level}</span>
        </div>
        <button className="font-mono text-xs rounded border border-white/10 px-2 py-1 text-neutral-300 hover:bg-white/5" onClick={props.onBack}>
          back
        </button>
      </div>

      <div className="border-b border-white/10 bg-black/20 px-3 py-2">
        <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
          <span>progress</span>
          <span>{progress}/100</span>
        </div>
        <div className="mt-1 h-1.5 w-full rounded bg-neutral-800">
          <div className="h-1.5 rounded bg-emerald-400" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div ref={props.chatRef} className="flex-1 space-y-2 overflow-y-auto p-3">
        {props.messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={cn(
                "max-w-[85%] whitespace-pre-wrap rounded-md px-3 py-2 text-sm",
                m.role === "user"
                  ? "bg-emerald-500/10 border border-emerald-400/30 text-emerald-100"
                  : "bg-white/5 border border-white/10 text-neutral-200"
              )}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={send} className="flex items-center gap-2 border-t border-white/10 px-3 py-2">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="type to talk-to-rise..."
          className="min-w-0 flex-1 rounded border border-white/10 bg-black/30 px-3 py-2 font-mono text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
        />
        <button type="submit" className="font-mono text-xs rounded-md border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-emerald-200 hover:border-emerald-300/70 hover:bg-emerald-400/10">
          send
        </button>
      </form>
    </div>
  );
});

export default ChatPanel;