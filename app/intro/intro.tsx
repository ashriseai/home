import { useEffect, useMemo, useRef, useState } from "react";

// =============== Types ===============
 type Contributor = { name: string; amount: number; note?: string };
type Hero = { id: string; name: string; avatar: string; bio: string; status?: "online" | "idle"; level: number; xp: number };
 type ChatMessage = { role: "user" | "hero"; content: string; ts: number };

// =============== Component ===============
export function Intro() {
  // ------------------- Console -------------------
  const [lines, setLines] = useState<string[]>([]);
  const termRef = useRef<HTMLPreElement | null>(null);
  const print = (text: string) => setLines((p) => [...p, text]);

  useEffect(() => {
    // warm-up banner
    print("$ ashrise boot");
    print("> welcome to Ashrise — build heroes, raise funds, talk-to-rise.");
  }, []);

  useEffect(() => {
    termRef.current?.parentElement?.scrollTo({ top: termRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  // ------------------- App State -------------------
  type Mode = "donate" | "create" | "list" | "chat" | "console";
  const [mode, setMode] = useState<Mode>("console");

  // Contributors / donate
  const goal = 10000;
  const [raised, setRaised] = useState(2450);
  const [contributors, setContributors] = useState<Contributor[]>([
    { name: "0xNova", amount: 500, note: "early believer" },
    { name: "cyberLumi", amount: 220 },
    { name: "mi", amount: 150 },
    { name: "wotori", amount: 100 },
    { name: "katana.dev", amount: 95 },
    { name: "beamrider", amount: 75 },
    { name: "solfx", amount: 60 },
    { name: "antares", amount: 50 },
    { name: "quantumkid", amount: 40 },
    { name: "edgecase", amount: 35 },
  ]);
  const [donateSum, setDonateSum] = useState(1);
  const pct = Math.min(100, Math.round((raised / goal) * 100));

  // Heroes & chat
  const seedHeroes = useMemo<Hero[]>(
    () => [
      { id: "lumi", name: "Lumi", avatar: "/logo.jpg", bio: "Kind neon guide. Always rising.", status: "online", level: 1, xp: 0 },
      { id: "quant", name: "Quant", avatar: "/logo.jpg", bio: "Curious kid. Stats & signals.", status: "idle", level: 1, xp: 0 },
    ],
    []
  );
  const [heroes, setHeroes] = useState<Hero[]>(seedHeroes);
  const [activeHero, setActiveHero] = useState<Hero | null>(null);
  const [threads, setThreads] = useState<Record<string, ChatMessage[]>>({});
  const chatRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [activeHero, threads]);

  // ------------------- Commands (buttons) -------------------
  const goDonate = () => {
    setMode("donate");
    print("$ donate");
    print("> view contributors and support the project.");
  };

  const goCreate = () => {
    setMode("create");
    print("$ create-hero");
    print("> fill the form on the right: avatar, nickname, bio.");
  };

  const goList = () => {
    setMode("list");
    print("$ list-hero");
    print("> select a hero to start talk-to-rise.");
  };

  const goAbout = () => {
    print("$ about");
    print("> Ashrise — the place where ideas are reborn and empowered.");
    print("> From spark → brand → living agent (hero).");
    print("> Build: CreateHero. Fund: Donate. Play: ListHero → Chat.");
  };

  const goHelp = () => {
    print("$ help");
    print("> donate — open contributors and send support (shows progress bar).");
    print("> create-hero — open form to create your hero (avatar, nickname, bio).");
    print("> list-hero — show heroes; click one to start chat.");
    print("> about — info about the project.");
    print("> help — this help.");
  };

  // ------------------- Donate actions -------------------
  const onDonate = () => {
    const val = Math.max(1, Math.round(donateSum));
    setRaised((r) => r + val);
    setContributors((c) => [{ name: "you", amount: val }, ...c]);
    print(`$ donate ${val}`);
    print("> thanks! donation received.");
  };

  // ------------------- Create hero actions -------------------
  const [form, setForm] = useState({ avatar: "", name: "", bio: "" });
  const onCreateHero = () => {
    if (!form.name.trim()) return alert("Nickname is required");
    const id = form.name.toLowerCase().replace(/\s+/g, "-") + "-" + Math.floor(Math.random() * 9999);
    const hero: Hero = { id, name: form.name.trim(), avatar: form.avatar || "/app/logo.jpg", bio: form.bio.trim(), level: 1, xp: 0 };
    setHeroes((h) => [hero, ...h]);
    setForm({ avatar: "", name: "", bio: "" });
    setMode("list");
    print(`$ create-hero ${hero.name}`);
    print("> hero created. use ListHero to start chatting.");
  };

  // ------------------- List/Chat actions -------------------
  const addXp = (heroId: string, delta: number) => {
    setHeroes((prev) => prev.map((h) => {
      if (h.id !== heroId) return h;
      const newXp = Math.max(0, (h.xp ?? 0) + delta);
      const newLevel = Math.max(1, 1 + Math.floor(newXp / 100));
      return { ...h, xp: newXp, level: newLevel };
    }));
    setActiveHero((curr) => {
      if (!curr || curr.id !== heroId) return curr;
      const newXp = Math.max(0, (curr.xp ?? 0) + delta);
      const newLevel = Math.max(1, 1 + Math.floor(newXp / 100));
      return { ...curr, xp: newXp, level: newLevel };
    });
  };
  const selectHero = (h: Hero) => {
    setActiveHero(h);
    setMode("chat");
    if (!threads[h.id]) {
      setThreads((t) => ({ ...t, [h.id]: [{ role: "hero", content: `Hi, I'm ${h.name}. ${h.bio}`, ts: Date.now() }] }));
    }
    // count the greeting as one message towards progression
    addXp(h.id, 1);
    print(`$ talk ${h.id}`);
    print("> session opened.");
  };

  const sendToHero = (text: string) => {
    if (!activeHero || !text.trim()) return;
    const id = activeHero.id;
    setThreads((t) => ({ ...t, [id]: [...(t[id] || []), { role: "user", content: text, ts: Date.now() }] }));
    addXp(id, 1);
    window.setTimeout(() => {
      setThreads((t) => ({
        ...t,
        [id]: [...(t[id] || []), { role: "hero", content: `🟡 ${activeHero.name}: rising with → ${text.slice(0, 80)}`, ts: Date.now() }],
      }));
      addXp(id, 1);
    }, 400 + Math.random() * 600);
  };

  // =================== UI ===================
  return (
    <section className="relative isolate min-h-screen grid place-items-center overflow-hidden bg-black text-gray-100">
      {/* scanline layer */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:100%_3px]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        {/* Terminal window */}
        <div className="mx-auto overflow-hidden rounded-xl border border-white/10 bg-neutral-950/80 shadow-[0_0_40px_rgba(0,255,170,0.08)] backdrop-blur">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-neutral-900/70 px-4 py-2">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
            <span className="h-3 w-3 rounded-full bg-green-400/70" />
            <span className="ml-3 text-xs text-neutral-300/80">ashrise@phoenix:~</span>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 gap-0 md:grid-cols-[1.1fr_0.9fr]">
            {/* Left: console */}
            <div className="p-4 md:p-6">
              <div className="h-[22rem] overflow-y-auto pr-2">
                <pre ref={termRef} className="font-mono text-[13px] leading-relaxed">
                  {lines.map((l, i) => (
                    <div key={i} className="text-emerald-300">{l}</div>
                  ))}
                </pre>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button onClick={goDonate} className="font-mono text-xs rounded-md border border-fuchsia-400/40 bg-fuchsia-500/10 px-3 py-2 text-fuchsia-200 hover:border-fuchsia-300/70 hover:bg-fuchsia-400/10">Donate</button>
                <button onClick={goCreate} className="font-mono text-xs rounded-md border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-emerald-200 hover:border-emerald-300/70 hover:bg-emerald-400/10">CreateHero</button>
                <button onClick={goList} className="font-mono text-xs rounded-md border border-cyan-400/40 bg-cyan-500/10 px-3 py-2 text-cyan-200 hover:border-cyan-300/70 hover:bg-cyan-400/10">ListHero</button>
                <button onClick={goAbout} className="font-mono text-xs rounded-md border border-amber-400/40 bg-amber-500/10 px-3 py-2 text-amber-200 hover:border-amber-300/70 hover:bg-amber-400/10">About</button>
                <button onClick={goHelp} className="font-mono text-xs rounded-md border border-indigo-400/40 bg-indigo-500/10 px-3 py-2 text-indigo-200 hover:border-indigo-300/70 hover:bg-indigo-400/10">Help</button>
              </div>
            </div>

            {/* Right: panel (mode dependent) */}
            <div className="border-t md:border-t-0 md:border-l border-white/10 p-4 md:p-6">
              {mode === "donate" && (
                <div className="space-y-4">
                  <div className="text-sm font-mono text-neutral-300">contributors — scrollable</div>
                  <div className="max-h-64 overflow-y-auto pr-2">
                    <ul className="space-y-2">
                      {contributors.map((c, idx) => (
                        <li key={idx} className="flex items-center justify-between gap-3 rounded border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-200">
                          <span className="truncate font-mono">{c.name}</span>
                          <span className="font-mono text-emerald-300">${c.amount.toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Progress bar only here */}
                  <div className="rounded-md border border-white/10 bg-white/5 p-3">
                    <div className="mb-2 flex items-center justify-between text-xs text-neutral-300">
                      <span>Funding progress</span>
                      <span>${raised.toLocaleString()} / {goal.toLocaleString()} ({pct}%)</span>
                    </div>
                    <div className="h-2 w-full rounded bg-neutral-800">
                      <div className="h-2 rounded bg-emerald-400" style={{ width: `${pct}%`, transition: "width 400ms ease-out" }} />
                    </div>
                  </div>

                  {/* Donate input */}
                  <form
                    onSubmit={(e) => { e.preventDefault(); onDonate(); }}
                    className="flex items-center gap-2 font-mono"
                  >
                    <input
                      type="number"
                      min={1}
                      value={donateSum}
                      onChange={(e) => setDonateSum(parseInt(e.target.value || "0", 10))}
                      className="w-28 rounded border border-white/10 bg-black/30 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-1 focus:ring-fuchsia-400/50"
                    />
                    <button type="submit" className="rounded border border-fuchsia-400/40 bg-fuchsia-500/10 px-3 py-2 text-xs text-fuchsia-200 hover:border-fuchsia-300/70 hover:bg-fuchsia-400/10">
                      donate
                    </button>
                  </form>
                </div>
              )}

              {mode === "create" && (
                <div className="space-y-3">
                  <div className="text-sm font-mono text-neutral-300">Create your Hero</div>
                  <input
                    placeholder="avatar url (optional)"
                    value={form.avatar}
                    onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))}
                    className="w-full rounded border border-white/10 bg-black/30 px-3 py-2 font-mono text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
                  />
                  <input
                    placeholder="nickname *"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full rounded border border-white/10 bg-black/30 px-3 py-2 font-mono text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
                  />
                  <textarea
                    placeholder="bio / description"
                    value={form.bio}
                    onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                    className="h-28 w-full resize-none rounded border border-white/10 bg-black/30 px-3 py-2 font-mono text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
                  />
                  <div className="flex justify-end">
                    <button onClick={onCreateHero} className="rounded border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-xs font-mono text-emerald-200 hover:border-emerald-300/70 hover:bg-emerald-400/10">
                      create
                    </button>
                  </div>
                </div>
              )}

              {mode === "list" && (
                <div className="space-y-3">
                  <div className="text-sm font-mono text-neutral-300">Your Heroes — click to chat</div>
                  <ul className="space-y-2">
                    {heroes.map((h) => (
                      <li key={h.id} className="flex items-center justify-between gap-3 rounded border border-white/10 bg-white/5 px-3 py-2">
                        <div className="flex min-w-0 items-center gap-3">
                          <img src={h.avatar} alt={h.name} className="h-8 w-8 rounded object-cover" />
                          <div className="min-w-0">
                            <div className="truncate font-mono text-neutral-100">{h.name}</div>
                            <div className="truncate font-mono text-xs text-neutral-400">{h.bio}</div>
                          </div>
                        </div>
                        <button onClick={() => selectHero(h)} className="rounded border border-cyan-400/40 px-2 py-1 font-mono text-xs text-cyan-200 hover:bg-cyan-500/10">
                          talk
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {mode === "chat" && activeHero && (
                <div className="flex h-[22rem] flex-col overflow-hidden rounded-lg border border-white/10 bg-neutral-900/70">
                  <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                    <div className="flex items-center gap-2 font-mono text-sm text-neutral-200">
                      <img src={activeHero.avatar} className="h-6 w-6 rounded object-cover" />
                      {activeHero.name}
                      <span className="text-neutral-400">— {activeHero.bio}</span>
                      <span className="ml-2 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-neutral-200">Lvl {activeHero.level}</span>
                    </div>
                    <button className="font-mono text-xs rounded border border-white/10 px-2 py-1 text-neutral-300 hover:bg-white/5" onClick={goList}>
                      back
                    </button>
                  </div>
                  <div className="border-b border-white/10 bg-black/20 px-3 py-2">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                      <span>progress</span>
                      <span>{activeHero.xp % 100}/100</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded bg-neutral-800">
                      <div className="h-1.5 rounded bg-emerald-400" style={{ width: `${(activeHero.xp % 100)}%` }} />
                    </div>
                  </div>
                  <div ref={chatRef} className="flex-1 space-y-2 overflow-y-auto p-3">
                    {(threads[activeHero.id] || []).map((m, i) => (
                      <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                        <div className={"max-w-[85%] whitespace-pre-wrap rounded-md px-3 py-2 text-sm " + (m.role === "user" ? "bg-emerald-500/10 border border-emerald-400/30 text-emerald-100" : "bg-white/5 border border-white/10 text-neutral-200")}>{m.content}</div>
                      </div>
                    ))}
                  </div>
                  <HeroInput onSend={sendToHero} />
                </div>
              )}

              {mode === "console" && (
                <div className="relative overflow-hidden rounded-lg border border-white/10 bg-neutral-900/70 p-4 font-mono text-[12px] leading-[1.15] text-cyan-200">
                  <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(transparent,transparent_2px,rgba(255,255,255,0.3)_2px)] bg-[length:100%_3px]" />
                  <pre>{`
      ."""-._
     /  _  _ \
    /  (o)(o) \   ASHRISE
   /_____..___ \   Fantasy Console v0.1
  /  \\__/\\__/  \  > booting phoenix-core
 /________________\
   \\  /  \\  /
    \\/____\\/
                  `}</pre>
                  <div className="mt-2 text-amber-200">hint: use buttons on the left</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer mini-help */}
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] text-neutral-400">
          <li>Donate → contributors & progress</li>
          <li>CreateHero → make your hero</li>
          <li>ListHero → pick & chat</li>
          <li>About / Help → info</li>
        </ul>
      </div>
    </section>
  );
}

// =============== Small components ===============
function HeroInput({ onSend }: { onSend: (text: string) => void }) {
  const [val, setVal] = useState("");
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSend(val); setVal(""); }}
      className="flex items-center gap-2 border-t border-white/10 px-3 py-2"
    >
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="type to talk-to-rise..."
        className="min-w-0 flex-1 rounded border border-white/10 bg-black/30 px-3 py-2 font-mono text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
      />
      <button type="submit" className="font-mono text-xs rounded-md border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-emerald-200 hover:border-emerald-300/70 hover:bg-emerald-400/10">send</button>
    </form>
  );
}
