import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import ActionsBar from "~/components/ui/ActionsBar";
import DonatePanel from "~/components/features/DonatePanel";
import TerminalLogs from "~/components/terminal/TerminalLogs";
import TitleBar from "~/components/terminal/TitleBar";
import { type ChatMessage, type Contributor, type Hero } from "~/types";
import { clamp, levelFromXp, useAutoScroll } from "~/utils";
import CreateHeroPanel from "~/components/features/CreateHeroPanel";
import HeroesListPanel from "~/components/features/HeroesListPanel";
import ChatPanel from "~/components/features/ChatPanel";
import FantasyConsoleSplash from "~/components/features/FantasyConsoleSplash";

export function Terminal({ embedded = false }: { embedded?: boolean }) {
  // Console logs state
  const [lines, setLines] = useState<string[]>([]);
  const { ref: termRef, scroll: scrollTerm } = useAutoScroll<HTMLDivElement>();
  const print = useCallback((text: string) => setLines((p) => [...p, text]), []);

  useEffect(() => {
    print("$ ashrise boot");
    print("> welcome to Ashrise — build heroes, raise funds, talk-to-rise.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollTerm();
  }, [lines, scrollTerm]);

  // Modes
  enum Mode { Donate = "donate", Create = "create", List = "list", Chat = "chat", Console = "console" }
  const [mode, setMode] = useState<Mode>(Mode.Console);

  /************** Donate **************/
  const goal = 10_000;
  const [raised, setRaised] = useState(2_450);
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
  const pct = clamp(Math.round((raised / goal) * 100), 0, 100);

  const onOpenDonate = useCallback(() => {
    setMode(Mode.Donate);
    print("$ donate");
    print("> view contributors and support the project.");
  }, [print]);

  const onDonate = useCallback(() => {
    const val = Math.max(1, Math.round(donateSum));
    setRaised((r) => r + val);
    setContributors((c) => [{ name: "you", amount: val }, ...c]);
    print(`$ donate ${val}`);
    print("> thanks! donation received.");
  }, [donateSum, print]);

  /************** Heroes & Chat **************/
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
  const { ref: chatRef, scroll: scrollChat } = useAutoScroll<HTMLDivElement>();

  // Create Hero form
  const [form, setForm] = useState({ avatar: "", name: "", bio: "" });

  const onOpenCreate = useCallback(() => {
    setMode(Mode.Create);
    print("$ create-hero");
    print("> fill the form on the right: avatar, nickname, bio.");
  }, [print]);

  const onCreateHero = useCallback(() => {
    if (!form.name.trim()) return alert("Nickname is required");
    const id = form.name.toLowerCase().replace(/\s+/g, "-") + "-" + Math.floor(Math.random() * 9999);
    const hero: Hero = {
      id,
      name: form.name.trim(),
      avatar: form.avatar || "/app/logo.jpg",
      bio: form.bio.trim(),
      level: 1,
      xp: 0,
    };
    setHeroes((h) => [hero, ...h]);
    setForm({ avatar: "", name: "", bio: "" });
    setMode(Mode.List);
    print(`$ create-hero ${hero.name}`);
    print("> hero created. use ListHero to start chatting.");
  }, [form, print]);

  const onOpenList = useCallback(() => {
    setMode(Mode.List);
    print("$ list-hero");
    print("> select a hero to start talk-to-rise.");
  }, [print]);

  // XP helpers
  const addXp = useCallback((heroId: string, delta: number) => {
    setHeroes((prev) => prev.map((h) => (h.id === heroId ? { ...h, xp: Math.max(0, h.xp + delta), level: levelFromXp(h.xp + delta) } : h)));
    setActiveHero((curr) => (curr && curr.id === heroId ? { ...curr, xp: Math.max(0, curr.xp + delta), level: levelFromXp(curr.xp + delta) } : curr));
  }, []);

  const onSelectHero = useCallback(
    (h: Hero) => {
      setActiveHero(h);
      setMode(Mode.Chat);
      if (!threads[h.id]) {
        setThreads((t) => ({ ...t, [h.id]: [{ role: "hero", content: `Hi, I'm ${h.name}. ${h.bio}`, ts: Date.now() }] }));
      }
      addXp(h.id, 1); // count greeting as progression
      print(`$ talk ${h.id}`);
      print("> session opened.");
    },
    [threads, addXp, print]
  );

  const onSendToHero = useCallback(
    (text: string) => {
      if (!activeHero || !text.trim()) return;
      const id = activeHero.id;
      setThreads((t) => ({ ...t, [id]: [...(t[id] || []), { role: "user", content: text, ts: Date.now() }] }));
      addXp(id, 1);
      setTimeout(() => {
        setThreads((t) => ({ ...t, [id]: [...(t[id] || []), { role: "hero", content: `🟡 ${activeHero.name}: rising with → ${text.slice(0, 80)}`, ts: Date.now() }] }));
        addXp(id, 1);
        scrollChat();
      }, 400 + Math.random() * 600);
    },
    [activeHero, addXp, scrollChat]
  );

  useEffect(() => {
    scrollChat();
  }, [activeHero, threads, scrollChat]);

  /************** About / Help **************/
  const onAbout = useCallback(() => {
    print("$ about");
    print("> Ashrise — the place where ideas are reborn and empowered.");
    print("> From spark → brand → living agent (hero).");
    print("> Build: CreateHero. Fund: Donate. Play: ListHero → Chat.");
  }, [print]);

  const onHelp = useCallback(() => {
    print("$ help");
    print("> donate — open contributors and send support (shows progress bar).");
    print("> create-hero — open form to create your hero (avatar, nickname, bio).");
    print("> list-hero — show heroes; click one to start chat.");
    print("> about — info about the project.");
    print("> help — this help.");
  }, [print]);

  /************** Render **************/
  const Panel = (
    <>
      <div className="mx-auto overflow-hidden rounded-xl border border-white/10 bg-neutral-950/80 shadow-[0_0_40px_rgba(0,255,170,0.08)] backdrop-blur">
        <TitleBar />

        <div className="grid grid-cols-1 gap-0 md:grid-cols-[1.1fr_0.9fr]">
          {/* Left: console + actions */}
          <div className="p-4 md:p-6">
            <TerminalLogs ref={termRef} lines={lines} />

            <ActionsBar
              onDonate={onOpenDonate}
              onCreate={onOpenCreate}
              onList={onOpenList}
              onAbout={onAbout}
              onHelp={onHelp}
            />
          </div>

          {/* Right: mode panel */}
          <div className="border-t md:border-t-0 md:border-l border-white/10 p-4 md:p-6">
            {mode === Mode.Donate && (
              <DonatePanel
                contributors={contributors}
                goal={goal}
                raised={raised}
                pct={pct}
                donateSum={donateSum}
                setDonateSum={setDonateSum}
                onDonate={onDonate}
              />
            )}

            {mode === Mode.Create && (
              <CreateHeroPanel form={form} setForm={setForm} onCreate={onCreateHero} />
            )}

            {mode === Mode.List && (
              <HeroesListPanel heroes={heroes} onSelect={onSelectHero} />
            )}

            {mode === Mode.Chat && activeHero && (
              <ChatPanel
                hero={activeHero}
                messages={threads[activeHero.id] || []}
                onBack={onOpenList}
                onSend={onSendToHero}
                chatRef={chatRef}
              />
            )}

            {mode === Mode.Console && <FantasyConsoleSplash />}
          </div>
        </div>
      </div>

      <FooterMiniHelp />
    </>
  );

  if (embedded) {
    return (
      <div className="w-full">{Panel}</div>
    );
  }

  return (
    <section className="relative isolate min-h-screen grid place-items-center overflow-hidden bg-black text-gray-100">
      {/* scanline layer */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:100%_3px]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        {Panel}
      </div>
    </section>
  );
}

const FooterMiniHelp = memo(function FooterMiniHelp() {
  return (
    <ul className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] text-neutral-400">
      <li>Donate → contributors & progress</li>
      <li>CreateHero → make your hero</li>
      <li>ListHero → pick & chat</li>
      <li>About / Help → info</li>
    </ul>
  );
});
