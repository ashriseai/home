function HeaderMenu({
  selected,
  onSelect,
}: {
  selected: "terminal" | "heroes" | "contributors" | "register";
  onSelect: (key: "terminal" | "heroes" | "contributors" | "register") => void;
}) {
  const base =
    "px-3 py-1 rounded-md border border-white/10 bg-neutral-900/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] hover:bg-neutral-900 focus:outline-none focus:ring-1";

  return (
    // fixed top-0 left-0 right-0 z-50
    <nav className="flex items-center justify-between p-3 bg-neutral-950/90 text-gray-100 border-b border-white/10 font-mono text-[13px] tracking-wide "> 
      <div className="flex items-center gap-2 text-neutral-400">
        <span className="opacity-60">ashrise@phoenix:~</span>
        <span className="opacity-40">$</span>
        <span className="text-emerald-300">menu</span>
      </div>
      <ul className="flex items-center gap-2">
        <li>
          <button
            type="button"
            onClick={() => onSelect("terminal")}
            className={`${base} ${selected === "terminal" ? "text-yellow-300 ring-yellow-400" : ""} hover:text-yellow-300 focus:ring-yellow-400`}
            aria-current={selected === "terminal" ? "page" : undefined}
          >
            [ Terminal ]
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => onSelect("heroes")}
            className={`${base} ${selected === "heroes" ? "text-emerald-300 ring-emerald-400" : ""} hover:text-emerald-300 focus:ring-emerald-400`}
            aria-current={selected === "heroes" ? "page" : undefined}
          >
            [ Heroes ]
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => onSelect("contributors")}
            className={`${base} ${selected === "contributors" ? "text-cyan-300 ring-cyan-400" : ""} hover:text-cyan-300 focus:ring-cyan-400`}
            aria-current={selected === "contributors" ? "page" : undefined}
          >
            [ Contributors ]
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => onSelect("register")}
            className={`${base} ${selected === "register" ? "text-pink-300 ring-pink-400" : ""} hover:text-pink-300 focus:ring-pink-400`}
            aria-current={selected === "register" ? "page" : undefined}
          >
            [ Register ]
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderMenu;