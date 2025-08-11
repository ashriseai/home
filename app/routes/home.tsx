import type { Route } from "./+types/home";
import { useState } from "react";
import { Terminal } from "../components/terminal";
import HeaderMenu from "~/components/header";
import HeroesGrid from "~/components/pages/HeroesGrid";
import ContributorsList from "~/components/pages/ContributorsList";
import RegisterForm from "~/components/pages/RegisterForm";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Ash Rise" },
    { name: "description", content: "The place where ideas are reborn and empowered." },
  ];
}

type MenuKey = "terminal" | "heroes" | "contributors" | "register";

export default function Home() {
  const [selected, setSelected] = useState<MenuKey>("terminal");

  return (
    <section className="relative isolate h-screen overflow-hidden bg-black text-gray-100">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:100%_3px]" />
      <HeaderMenu selected={selected} onSelect={setSelected} />
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-12 h-[calc(100vh-3rem)] overflow-y-auto">
        {selected === "terminal" && (
          <div className="flex items-center justify-center min-h-full">
            <Terminal embedded />
          </div>
        )}
        {selected === "heroes" && (
          <HeroesGrid />
        )}
        {selected === "contributors" && (
          <ContributorsList />
        )}
        {selected === "register" && <RegisterForm />}
      </div>
    </section>
  );
}
