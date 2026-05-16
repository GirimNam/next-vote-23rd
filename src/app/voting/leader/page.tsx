"use client";

import { useState } from "react";
import { TEAM_MEMBERS } from "@/constants/teams";

const LEADER_CANDIDATES = [
  ...TEAM_MEMBERS.frontend.Ditda,
  ...TEAM_MEMBERS.frontend.JobDri,
  ...TEAM_MEMBERS.frontend.Groupeat,
  ...TEAM_MEMBERS.frontend.IPX,
  ...TEAM_MEMBERS.frontend.CONX,
];

export default function VotingLeader() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#FFFFFF] via-[#D2E6FD] to-[#FFFFFF]">
      <p className="absolute top-[10rem] left-[2.5rem] text-[1.25rem] font-bold md:top-[12.75rem] md:left-[28.125rem] md:text-[1.5rem]">
        FE - LEADER
      </p>

      <ul className="absolute top-[25rem] left-[10rem] w-[12.5rem] h-[20rem] md:top-[12.75rem] md:left-[46.5625rem] md:w-[11.5rem] md:h-[25.625rem] grid grid-cols-2 content-between justify-items-center">
        {LEADER_CANDIDATES.map((name) => (
          <li key={name}>
            <button
              type="button"
              onClick={() => setSelected(name)}
              className="relative text-label1 cursor-pointer px-2 py-2 md:px-6"
            >
              {selected === name && (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[4.375rem] h-[4.375rem] rounded-full bg-[#AAD2FF] blur-[0.625rem] pointer-events-none" />
              )}
              <span className="relative">{name}</span>
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        disabled={!selected}
        className={`absolute top-[10rem] right-[1.5rem] left-auto w-[8rem] h-[5rem] md:top-[31.625rem] md:left-[68.75rem] md:right-auto md:w-[11.0625rem] md:h-[6.75rem] rounded-lg flex items-center justify-center text-label1 cursor-pointer disabled:cursor-not-allowed ${
          selected ? "bg-white/60" : "bg-transparent"
        }`}
      >
        {selected && <>투표하기 &gt;</>}
      </button>
    </main>
  );
}
