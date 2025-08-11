import type { Route } from "./+types/home";
import { Intro } from "../components/terminal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ash Rise" },
    { name: "description", content: "The place where ideas are reborn and empowered." },
  ];
}

export default function Home() {
  return <Intro />;
}
