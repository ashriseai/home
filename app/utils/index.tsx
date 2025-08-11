import { useCallback, useRef } from "react";
import { XP_PER_LEVEL } from "~/types";

/***********************************
 * Utils & Hooks
 ***********************************/
export function cn(...xs: Array<string | false | null | undefined>) {
    return xs.filter(Boolean).join(" ");
}

export function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

export function levelFromXp(xp: number) {
    return Math.max(1, 1 + Math.floor(Math.max(0, xp) / XP_PER_LEVEL));
}

export function useAutoScroll<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const scroll = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, []);
    return { ref, scroll } as const;
}