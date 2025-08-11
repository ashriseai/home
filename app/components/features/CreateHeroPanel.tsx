import { memo } from "react";

const CreateHeroPanel = memo(function CreateHeroPanel(props: {
    form: { avatar: string; name: string; bio: string };
    setForm: React.Dispatch<React.SetStateAction<{ avatar: string; name: string; bio: string }>>;
    onCreate: () => void;
}) {
    return (
        <div className="space-y-3">
            <div className="text-sm font-mono text-neutral-300">Create your Hero</div>
            <input
                placeholder="avatar url (optional)"
                value={props.form.avatar}
                onChange={(e) => props.setForm((f) => ({ ...f, avatar: e.target.value }))}
                className="w-full rounded border border-white/10 bg-black/30 px-3 py-2 font-mono text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
            />
            <input
                placeholder="nickname *"
                value={props.form.name}
                onChange={(e) => props.setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded border border-white/10 bg-black/30 px-3 py-2 font-mono text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
            />
            <textarea
                placeholder="bio / description"
                value={props.form.bio}
                onChange={(e) => props.setForm((f) => ({ ...f, bio: e.target.value }))}
                className="h-28 w-full resize-none rounded border border-white/10 bg-black/30 px-3 py-2 font-mono text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
            />
            <div className="flex justify-end">
                <button onClick={props.onCreate} className="rounded border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-xs font-mono text-emerald-200 hover:border-emerald-300/70 hover:bg-emerald-400/10">
                    create
                </button>
            </div>
        </div>
    );
});

export default CreateHeroPanel;