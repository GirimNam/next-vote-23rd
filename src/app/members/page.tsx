"use client";

import Image from "next/image";
import { useState } from "react";
import { MEMBERS, Part } from "@/constants/members";
import MemberCard from "./MemberCard";

const TAB_LABELS: Record<Part, string> = {
  PM: "PM",
  DESIGN: "DESIGN",
  FRONTEND: "FRONT - END",
  BACKEND: "BACK - END",
};

export default function Members() {
  const [selectedPart, setSelectedPart] = useState<Part>("FRONTEND");

  const members = MEMBERS[selectedPart].filter((m) => !m.isExecutive);
  const executives = MEMBERS[selectedPart].filter((m) => m.isExecutive);

  return (
    <main className="px-6 py-8 md:flex md:gap-8">
      <div className="relative w-full mb-8 md:hidden">
        <Image
          src="/figures/figure-small-membertab.svg"
          alt=""
          width={349}
          height={106}
          className="w-full"
        />
        <div className="absolute top-[51%] left-[8%] right-0 h-[43%] flex items-center justify-around">
          {(Object.keys(TAB_LABELS) as Part[]).map((part) => (
            <button
              key={part}
              onClick={() => setSelectedPart(part)}
              className={`text-xs cursor-pointer whitespace-nowrap ${
                selectedPart === part ? "font-bold underline" : "font-medium"
              }`}
            >
              {TAB_LABELS[part]}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden md:block relative shrink-0 w-59.25 h-99">
        <Image
          src="/figures/figure-big-membertab.svg"
          alt=""
          fill
          sizes="237px"
        />

        <div className="absolute top-[3%] left-[5%] w-[65%] h-[72%] flex flex-col items-start justify-around pl-6">
          {(Object.keys(TAB_LABELS) as Part[]).map((part) => (
            <button
              key={part}
              onClick={() => setSelectedPart(part)}
              className={`text-sm cursor-pointer whitespace-nowrap ${
                selectedPart === part ? "font-bold underline" : "font-medium"
              }`}
            >
              {TAB_LABELS[part]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-6">23RD MEMBERS</h2>
        <div className="grid grid-cols-2 gap-3 mb-12">
          {members.map((member) => (
            <MemberCard key={member.name} name={member.name} isLeader={member.isLeader} />
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-6">EXECUTIVES</h2>
        <div className="grid grid-cols-2 gap-3">
          {executives.map((member) => (
            <MemberCard key={member.name} name={member.name} isLeader={member.isLeader} />
          ))}
        </div>
      </div>
    </main>
  );
}
