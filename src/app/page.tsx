"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden flex items-center">
      <h1 className="text-6xl font-extrabold ml-8 md:ml-64 text-black z-10">
        2026 <br className="md:hidden" />
        CEOS <br className="md:hidden" />
        AWARDS
      </h1>

      <Image
        src="/figures/figure-big-stars.svg"
        alt=""
        width={709}
        height={500}
        className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-28"
      />
      <Image
        src="/figures/figure-stars.svg"
        alt=""
        width={268}
        height={189}
        className="block md:hidden absolute top-1/4 right-0"
      />

      <Link
        href="/login"
        className="absolute bottom-20 right-8 md:right-44 text-3xl font-bold text-black flex items-center gap-1 cursor-pointer"
      >
        투표하러 가기 &gt;
      </Link>
    </main>
  );
}
