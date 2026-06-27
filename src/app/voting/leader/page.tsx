"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { type Part } from "@/constants/teams";
import { votePartLeader, getPartLeaderCandidates } from "@/api/vote";
import { useAuthStore } from "@/store/authStore";
import ErrorModal from "@/components/ErrorModal";

export default function VotingLeader() {
  const [candidates, setCandidates] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);
  const router = useRouter();

  const userPart = useAuthStore((state) => state.user?.part?.toLowerCase()) as
    | Part
    | undefined;
  const userName = useAuthStore((state) => state.user?.name);
  const part: Part = userPart ?? "frontend";
  const title = part === "backend" ? "BE - LEADER" : "FE - LEADER";

  useEffect(() => {
    getPartLeaderCandidates(part).then((res) => {
      if (res.data) {
        setCandidates(res.data.candidates.map((c) => c.name));
      }
    });
  }, [part]);

  const handleVote = async () => {
    if (!selected || isLoading) return;
    setVoteError(null);
    setIsLoading(true);

    try {
      await votePartLeader(selected);
      console.log("파트장 투표 성공(api 연동 완료)", selected);
      localStorage.setItem("voted_leader", "1");
      router.push(`/voting/result/leader?part=${part.toUpperCase()}`);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as {
          response: { status: number; data?: { error?: { code?: string } } };
        };
        const status = axiosErr.response.status;
        const code = axiosErr.response.data?.error?.code;
        console.error("파트장 투표 실패", status, ", code:", code, axiosErr.response.data);

        if (status === 409 || code === "V005") {
          setVoteError("이미 투표하셨습니다.");
        } else if (status === 410 || code === "V006") {
          setVoteError("이미 마감된 투표입니다.");
        } else if (code === "V002") {
          setVoteError("본인 파트의 후보에게만 투표할 수 있습니다.");
        } else if (code === "V003") {
          setVoteError("본인에게는 투표할 수 없습니다.");
        } else if (code === "U002") {
          setVoteError("해당 후보를 찾을 수 없습니다.");
        } else {
          setVoteError("투표 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        console.error("파트장 투표 (예상치 못한 에러):", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      onClick={() => setSelected(null)}
      className="relative min-h-screen bg-linear-to-b from-[#FFFFFF] via-[#D2E6FD] to-[#FFFFFF]"
    >
      <div className="absolute top-40 left-6 md:top-51 md:left-72">
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
          <p className="relative text-xl font-bold md:text-2xl">{title}</p>
        </div>
      </div>

      <ul className="absolute top-100 left-40 w-50 h-80 md:top-68 md:left-200 md:w-46 md:h-102.5 grid grid-cols-2 content-between justify-items-center">
        {candidates.map((name) => (
          <li key={name}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (userName && name === userName) {
                  setVoteError("본인에게는 투표할 수 없습니다.");
                  return;
                }
                setVoteError(null);
                setSelected(name);
              }}
              className={`relative text-label1 cursor-pointer px-2 py-2 md:px-6 whitespace-nowrap ${
                selected === name ? "z-10" : ""
              }`}
            >
              {selected === name && (
                <span
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-22.5 h-22.5 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(170,210,255,0.9) 0%, rgba(170,210,255,0) 70%)",
                  }}
                />
              )}
              <span className="relative">{name}</span>
            </button>
          </li>
        ))}
      </ul>

      {voteError && (
        <ErrorModal message={voteError} onClose={() => setVoteError(null)} />
      )}
      <button
        type="button"
        disabled={!selected || isLoading}
        onClick={handleVote}
        className={`absolute top-40 right-6 left-auto w-32 h-20 md:top-41 md:left-132 md:right-auto md:w-44.25 md:h-27 border-[3px] border-[#E8EEFF] flex items-center justify-center text-label1 disabled:cursor-default ${
          selected && !isLoading
            ? "bg-[rgba(249,250,251,0.80)] cursor-pointer"
            : "bg-transparent"
        }`}
      >
        <span className="absolute -top-1.25 -left-1.25 w-2.5 h-2.5 bg-[#E3E8F5]" />
        <span className="absolute -top-1.25 -right-1.25 w-2.5 h-2.5 bg-[#E3E8F5]" />
        <span className="absolute -bottom-1.25 -left-1.25 w-2.5 h-2.5 bg-[#E3E8F5]" />
        <span className="absolute -bottom-1.25 -right-1.25 w-2.5 h-2.5 bg-[#E3E8F5]" />
        {selected && (
          <span className="relative">
            {isLoading ? "투표 중..." : "투표하기 >"}
          </span>
        )}
      </button>
    </main>
  );
}
