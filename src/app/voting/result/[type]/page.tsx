"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import RankBadge from "@/components/RankBadge";
import VoteCount from "@/components/VoteCount";
import { getPartLeaderResult, getDemoDayResult } from "@/api/vote";

type Ranking = { rank: number; name: string; votes: number };

const RANK_POSITIONS = [
  {
    voteCount: "absolute top-40 left-17 md:top-43 md:left-97.75",
    badge: "absolute top-32 left-10 md:top-35.25 md:left-87",
    color: "#E3E8F5",
    badgeColor: "#1B7BE8",
  },
  {
    voteCount: "absolute top-94 left-28 md:top-104 md:left-170.75",
    badge: "absolute top-86 left-20 md:top-96.25 md:left-160",
    color: "#F2F4F6",
    badgeColor: "#FFEFB1",
  },
  {
    voteCount: "absolute top-148 left-17 md:top-170 md:left-108.75",
    badge: "absolute top-136 left-10 md:top-157.25 md:left-98",
    color: "#F2F9F9",
    badgeColor: "rgba(223, 70, 70, 0.57)",
  },
];

export default function VotingResult({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const searchParams = useSearchParams();
  const part = searchParams.get("part") ?? "FRONTEND";

  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(true);
  const [notClosed, setNotClosed] = useState(false);
  const [typeResolved, setTypeResolved] = useState<string | null>(null);

  useEffect(() => {
    params.then(({ type }) => {
      if (type !== "leader" && type !== "demoday") {
        notFound();
      }
      setTypeResolved(type);
    });
  }, [params]);

  useEffect(() => {
    if (!typeResolved) return;

    const fetchResult = async () => {
      try {
        if (typeResolved === "leader") {
          const res = await getPartLeaderResult(part);
          if (res.data)
            setRankings(
              res.data.rankings
                .slice(0, 3)
                .map((r) => ({ rank: r.rank, name: r.name, votes: r.votes })),
            );
        } else {
          const res = await getDemoDayResult();
          if (res.data)
            setRankings(
              res.data.rankings
                .slice(0, 3)
                .map((r) => ({ rank: r.rank, name: r.team, votes: r.votes })),
            );
        }
      } catch (err: unknown) {
        if (err && typeof err === "object" && "response" in err) {
          const axiosErr = err as { response: { status: number } };
          if (axiosErr.response.status === 423) {
            setNotClosed(true);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [typeResolved, part]);

  const top3 = RANK_POSITIONS.map((pos, i) => ({
    ...pos,
    name: rankings[i]?.name ?? "-",
    votes: rankings[i]?.votes ?? 0,
    rank: i + 1,
  }));

  return (
    <main className="min-h-215 md:min-h-225 bg-linear-to-b from-[#FFFFFF] via-[#D2E6FD] to-[#FFFFFF]">
      <div className="relative min-h-215 md:min-h-225 md:w-240 md:mx-auto md:-translate-x-32">
      <div className="absolute top-62 left-31 w-35 h-36 md:top-66.5 md:left-130 md:w-56.5 md:h-57.5 border border-black" />
      <div className="absolute top-118 left-20 w-48 h-30 md:top-132.25 md:left-151.25 md:w-73 md:h-45.5 border border-black" />
      <Image
        src="/figures/figure-star-8.svg"
        alt=""
        aria-hidden
        width={212}
        height={212}
        className="absolute top-76 left-2 w-33 h-33 md:top-90.75 md:left-71.5 md:w-53 md:h-53 pointer-events-none"
      />
      <Link
        href="/voting"
        className="absolute top-190 right-6 md:top-166.75 md:left-187.75 md:right-auto text-xl font-extrabold leading-[135%] tracking-[-0.02px] text-black"
      >
        메인으로 가기 &gt;
      </Link>
      <svg
        className="absolute top-50 right-3 w-28 h-28 md:top-48.5 md:left-196.25 md:right-auto md:w-36 md:h-36 pointer-events-none"
        viewBox="0 0 197 197"
        fill="none"
        aria-hidden
      >
        <path
          d="M122.926 38.0869L123.296 38.6377L123.947 38.5098L166.884 30.1152L158.49 73.0527L158.362 73.7041L158.913 74.0742L195.207 98.5L158.913 122.926L158.362 123.296L158.49 123.947L166.884 166.884L123.947 158.49L123.296 158.362L122.926 158.913L98.5 195.207L74.0742 158.913L73.7041 158.362L73.0527 158.49L30.1152 166.884L38.5098 123.947L38.6377 123.296L38.0869 122.926L1.79199 98.5L38.0869 74.0742L38.6377 73.7041L38.5098 73.0527L30.1152 30.1152L73.0527 38.5098L73.7041 38.6377L74.0742 38.0869L98.5 1.79199L122.926 38.0869Z"
          fill="rgba(223, 70, 70, 0.57)"
        />
      </svg>

      {!loading && notClosed && (
        <p className="absolute top-80 left-1/2 -translate-x-1/2 text-xl font-bold text-gray-500 text-center">
          아직 투표가 마감되지 않았습니다.
        </p>
      )}

      {!loading &&
        !notClosed &&
        top3.map((item) => (
          <div key={item.rank}>
            <div className={item.voteCount}>
              <VoteCount
                name={item.name}
                votes={item.votes}
                color={item.color}
              />
            </div>
            <div className={item.badge}>
              <RankBadge rank={item.rank} color={item.badgeColor} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
