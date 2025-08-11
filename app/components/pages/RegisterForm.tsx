import React from "react";

export default function RegisterForm() {
  const [form, setForm] = React.useState({
    nickname: "",
    description: "",
    x: "",
    avatar2d: "",
    avatar3d: "",
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up later
    alert(`Registered as ${form.nickname}`);
  }

  const label = "block font-mono text-[12px] text-neutral-400 mb-1";
  const input = "w-full rounded-md border border-white/10 bg-neutral-950/70 px-3 py-2 text-[13px] text-neutral-100 outline-none focus:ring-1 focus:ring-emerald-400";

  return (
    <section className="p-6">
      <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className={label} htmlFor="nickname">Nickname</label>
          <input id="nickname" name="nickname" value={form.nickname} onChange={onChange} className={input} placeholder="Lumi" />
        </div>
        <div>
          <label className={label} htmlFor="description">Description</label>
          <textarea id="description" name="description" value={form.description} onChange={onChange} className={input + ' min-h-[96px]'} placeholder="Kind neon guide..." />
        </div>
        <div>
          <label className={label} htmlFor="x">X (Twitter) link</label>
          <input id="x" name="x" value={form.x} onChange={onChange} className={input} placeholder="https://x.com/your_handle" />
        </div>
        <div>
          <label className={label} htmlFor="avatar2d">2D avatar IPFS hash</label>
          <input id="avatar2d" name="avatar2d" value={form.avatar2d} onChange={onChange} className={input} placeholder="bafy..." />
        </div>
        <div>
          <label className={label} htmlFor="avatar3d">3D avatar IPFS hash</label>
          <input id="avatar3d" name="avatar3d" value={form.avatar3d} onChange={onChange} className={input} placeholder="bafy..." />
        </div>
        <div className="pt-2">
          <button type="submit" className="px-4 py-2 font-mono text-[13px] rounded-md border border-white/10 bg-neutral-900/70 hover:bg-neutral-900 text-emerald-300 focus:outline-none focus:ring-1 focus:ring-emerald-400">
            [ Register ]
          </button>
        </div>
      </form>
    </section>
  );
}