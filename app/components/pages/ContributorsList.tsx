type ContributorItem = { nickname: string; address: string; amount: number };
function ContributorsList() {

  const items: ContributorItem[] = [
    { nickname: "0xNova", address: "So1N0vA111111111111111111111111111111111111", amount: 500 },
    { nickname: "cyberLumi", address: "LuMi2222222222222222222222222222222222222222", amount: 220 },
    { nickname: "mi", address: "Mi33333333333333333333333333333333333333333", amount: 150 },
    { nickname: "wotori", address: "WoToRi4444444444444444444444444444444444444", amount: 100 },
  ];

  return (
    <section className="p-6 font-mono">
      <ul className="space-y-2">
        {items.map((c) => (
          <li key={c.address} className="flex items-center justify-between rounded-md border border-white/10 bg-neutral-950/60 px-3 py-2">
            <span className="text-emerald-200">{c.nickname}</span>
            <span className="text-neutral-400 truncate max-w-[40%]">{c.address}</span>
            <span className="text-cyan-300 tabular-nums">{c.amount.toLocaleString()} ◎</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ContributorsList;