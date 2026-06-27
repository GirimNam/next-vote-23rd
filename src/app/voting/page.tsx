"use client";

import { useRouter } from "next/navigation";
import type { Part } from "@/constants/teams";
import { useAuthStore } from "@/store/authStore";

export default function Voting() {
  const router = useRouter();
  const userPart = useAuthStore((state) => state.user?.part?.toLowerCase()) as
    | Part
    | undefined;
  const part: Part = userPart ?? "frontend";
  const partLabel = part === "backend" ? "BE" : "FE";

  const handleLeaderClick = () => {
    if (localStorage.getItem("voted_leader")) {
      router.push(`/voting/result/leader?part=${part.toUpperCase()}`);
    } else {
      router.push("/voting/leader");
    }
  };

  const handleDemodayClick = () => {
    if (localStorage.getItem("voted_demoday")) {
      router.push("/voting/result/demoday");
    } else {
      router.push("/voting/demoday");
    }
  };

  return (
    <main className="relative min-h-screen bg-linear-to-b from-[#FFFFFF] via-[#D2E6FD] to-[#FFFFFF]">
      <button
        type="button"
        onClick={handleLeaderClick}
        className="absolute top-40 left-6 md:top-51 md:left-72 cursor-pointer"
      >
        <div className="relative flex items-center justify-center w-76.25 h-39.5">
          <img
            src="/figures/figure-ellipse-15.svg"
            alt=""
            aria-hidden
            className="absolute top-[calc(50%+0.5rem)] left-1/2 -translate-x-1/2 -translate-y-1/2 w-82.25 h-43.5 pointer-events-none"
          />
          <img
            src="/figures/figure-ellipse-8.svg"
            alt=""
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-74.5 h-39 pointer-events-none"
          />
          <img
            src="/figures/figure-star-8.svg"
            alt=""
            aria-hidden
            className="absolute -top-12 -left-11 w-33 h-33 pointer-events-none"
          />
          <p className="relative text-xl font-bold md:text-2xl">
            {partLabel} - LEADER
          </p>
        </div>
      </button>

      <button
        type="button"
        onClick={handleDemodayClick}
        className="absolute bottom-12 right-8 md:bottom-40 md:right-120 cursor-pointer"
      >
        <div className="relative flex items-center justify-center w-76.25 h-39.5">
          <img
            src="/figures/figure-ellipse-15.svg"
            alt=""
            aria-hidden
            className="absolute top-[calc(50%+0.5rem)] left-1/2 -translate-x-1/2 -translate-y-1/2 w-82.25 h-43.5 pointer-events-none"
          />
          <img
            src="/figures/figure-ellipse-8.svg"
            alt=""
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-74.5 h-39 pointer-events-none"
          />
          <img
            src="/figures/figure-star-8.svg"
            alt=""
            aria-hidden
            className="absolute -bottom-9 -right-9 w-27.25 h-27 pointer-events-none"
          />
          <p className="relative text-xl font-bold md:text-2xl">DEMO-DAY</p>
        </div>
      </button>

      <svg
        className="absolute bottom-20 right-4 w-37.5 h-37.5 md:bottom-66 md:left-192 md:right-auto md:w-49.25 md:h-49.25 pointer-events-none"
        viewBox="0 0 197 197"
        fill="none"
        aria-hidden
      >
        <path
          d="M122.926 38.0869L123.296 38.6377L123.947 38.5098L166.884 30.1152L158.49 73.0527L158.362 73.7041L158.913 74.0742L195.207 98.5L158.913 122.926L158.362 123.296L158.49 123.947L166.884 166.884L123.947 158.49L123.296 158.362L122.926 158.913L98.5 195.207L74.0742 158.913L73.7041 158.362L73.0527 158.49L30.1152 166.884L38.5098 123.947L38.6377 123.296L38.0869 122.926L1.79199 98.5L38.0869 74.0742L38.6377 73.7041L38.5098 73.0527L30.1152 30.1152L73.0527 38.5098L73.7041 38.6377L74.0742 38.0869L98.5 1.79199L122.926 38.0869Z"
          fill="#5DA9FF"
          stroke="#5DA9FF"
          strokeWidth="2"
        />
      </svg>
    </main>
  );
}
