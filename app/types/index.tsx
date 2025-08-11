/***********************************
 * Types & constants
 ***********************************/
export type Contributor = { name: string; amount: number; note?: string };
export type ChatMessage = { role: "user" | "hero"; content: string; ts: number };
export type Hero = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  status?: "online" | "idle";
  level: number;
  xp: number;
};

export const XP_PER_LEVEL = 100;