"use client";

import { useState } from "react";
import Image from "next/image";
import MemberCard from "@/components/MemberCard";
import { MEMBERS, type Part } from "@/constants/members";
import { useAuthStore } from "@/store/authStore";

const PARTS: Part[] = ["PM", "DESIGN", "FRONTEND", "BACKEND"];

const PART_LABELS: Record<Part, string> = {
  PM: "PM",
  DESIGN: "DESIGN",
  FRONTEND: "FRONT -\nEND",
  BACKEND: "BACK -\nEND",
};

const PART_LABELS_MOBILE: Record<Part, string> = {
  PM: "PM",
  DESIGN: "DESIGN",
  FRONTEND: "FRONT-END",
  BACKEND: "BACK-END",
};

function getInitialPart(userPart: string | undefined): Part {
  const upper = userPart?.toUpperCase();
  if (upper === "FRONTEND" || upper === "BACKEND") {
    return upper;
  }
  return "FRONTEND";
}

export default function Members() {
  const userPart = useAuthStore((state) => state.user?.part);
  const [selected, setSelected] = useState<Part>(() => getInitialPart(userPart));

  return (
    <main className="w-full">
      <div className="md:hidden pt-6 px-5">
        <div className="relative w-87.25 h-26.5">
          <Image
            src="/figures/figure-small-membertab.svg"
            alt=""
            aria-hidden
            fill
            className="object-contain"
          />
          <div className="absolute top-13.75 left-6.75 w-79 h-11 flex items-center justify-around">
            {PARTS.map((part) => (
              <button
                key={part}
                type="button"
                onClick={() => setSelected(part)}
                className={`text-[13px] leading-tight text-black cursor-pointer ${
                  selected === part ? "font-bold underline" : "font-normal"
                }`}
              >
                {PART_LABELS_MOBILE[part]}
              </button>
            ))}
          </div>
        </div>

        <h1 className="mt-8 text-[32px] font-bold leading-[135%] tracking-[-0.032px] text-black">
          23th MEMBERS
        </h1>

        <div className="mt-4 grid grid-cols-2 gap-x-5.25 gap-y-5 pb-8">
          {MEMBERS[selected]
            .filter((m) => !m.isExecutive)
            .map((m) => (
              <MemberCard
                key={m.name}
                name={m.name}
                school={m.school}
                department={m.department}
              />
            ))}
        </div>
      </div>

      <div className="hidden md:block relative min-h-250">
        <h1 className="absolute top-38.75 left-160 text-[32px] font-bold leading-[135%] tracking-[-0.032px] text-black">
          23th MEMBERS
        </h1>
        <div className="absolute top-59 left-160 grid grid-cols-2 gap-x-5.25 gap-y-5">
          {MEMBERS[selected]
            .filter((member) => !member.isExecutive)
            .map((member) => (
              <MemberCard
                key={member.name}
                name={member.name}
                school={member.school}
                department={member.department}
              />
            ))}
        </div>
        <div className="absolute top-45.75 left-24.25 flex flex-col items-start justify-between w-38.75 h-72 p-5 border border-black">
          <span className="absolute -right-17.75 -bottom-24 w-37.25 h-44 bg-[#F2F4F6] -z-10" />
          {PARTS.map((part) => (
            <button
              key={part}
              type="button"
              onClick={() => setSelected(part)}
              className={`text-left text-xl leading-[135%] tracking-[-0.02px] text-black cursor-pointer whitespace-pre-line ${
                selected === part ? "font-bold underline" : "font-normal"
              }`}
            >
              {PART_LABELS[part]}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
