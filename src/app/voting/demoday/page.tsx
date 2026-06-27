"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { voteDemoDay, getDemoDayCandidates } from "@/api/vote";
import { useAuthStore } from "@/store/authStore";
import ErrorModal from "@/components/ErrorModal";

export default function VotingDemoday() {
  const [teams, setTeams] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);
  const router = useRouter();
  const userTeam = useAuthStore((state) => state.user?.team);

  useEffect(() => {
    getDemoDayCandidates().then((res) => {
      if (res.data) {
        setTeams(res.data.candidates.map((c) => c.team));
      }
    });
  }, []);

  const handleVote = async () => {
    if (!selected || isLoading) return;
    setVoteError(null);
    setIsLoading(true);

    try {
      await voteDemoDay(selected);
      console.log("데모데이 투표 성공(api 연동 완료)", selected);
      localStorage.setItem("voted_demoday", "1");
      router.push("/voting/result/demoday");

    } catch (err: unknown) {
      //에러 타입 별로 정리
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as {
          response: { status: number; data?: { error?: { code?: string } } };
        };
        const status = axiosErr.response.status;
        const code = axiosErr.response.data?.error?.code;
        console.error("데모데이 투표 실패 ", status, ", code:", code, axiosErr.response.data);

        if (status === 409 || code === "V005") {
          localStorage.setItem("voted_demoday", "1");
          router.push("/voting/result/demoday");
          return;
        } else if (status === 410 || code === "V006") {
          setVoteError("이미 마감된 투표입니다.");
        } else if (code === "V004") {
          setVoteError("본인 팀에는 투표할 수 없습니다.");
        } else if (code === "V001") {
          setVoteError("유효하지 않은 팀입니다.");
        } else {
          setVoteError("투표 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        console.error("[데모데이 투표] 예상치 못한 에러:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      onClick={() => setSelected(null)}
      className="relative min-h-screen bg-linear-to-b from-[#FFFFFF] via-[#D2E6FD] to-[#FFFFFF] flex flex-col pt-40 pb-20 pl-20 md:pt-52.5 md:pb-62 md:pl-87"
    >
      <div className="absolute bottom-12 right-8 md:bottom-40 md:right-120">
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
      </div>

      <div className="absolute bottom-20 right-4 md:bottom-66 md:left-192 md:right-auto">
        <svg
          className="w-37.5 h-37.5 md:w-49.25 md:h-49.25"
          viewBox="0 0 197 197"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M122.926 38.0869L123.296 38.6377L123.947 38.5098L166.884 30.1152L158.49 73.0527L158.362 73.7041L158.913 74.0742L195.207 98.5L158.913 122.926L158.362 123.296L158.49 123.947L166.884 166.884L123.947 158.49L123.296 158.362L122.926 158.913L98.5 195.207L74.0742 158.913L73.7041 158.362L73.0527 158.49L30.1152 166.884L38.5098 123.947L38.6377 123.296L38.0869 122.926L1.79199 98.5L38.0869 74.0742L38.6377 73.7041L38.5098 73.0527L30.1152 30.1152L73.0527 38.5098L73.7041 38.6377L74.0742 38.0869L98.5 1.79199L122.926 38.0869Z"
            fill={selected ? "#EAF4FF" : "#5DA9FF"}
            fillOpacity={selected ? 0.8 : 1}
            stroke="#5DA9FF"
            strokeWidth="2"
          />
        </svg>

        {voteError && (
          <ErrorModal message={voteError} onClose={() => setVoteError(null)} />
        )}
        <button
          type="button"
          disabled={!selected || isLoading}
          onClick={handleVote}
          className={`absolute inset-0 flex items-center justify-center text-label1 disabled:cursor-default ${
            selected && !isLoading ? "cursor-pointer" : ""
          }`}
        >
          {selected && <>{isLoading ? "투표 중..." : "투표하기 >"}</>}
        </button>
      </div>
      <ul className="flex flex-col items-center gap-4.25 md:flex-1 md:justify-between md:gap-0 md:w-46">
        {teams.map((team: string) => (
          <li key={team}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (userTeam && team.toLowerCase() === userTeam.toLowerCase()) {
                  setVoteError("본인 팀에는 투표할 수 없습니다.");
                  return;
                }
                setVoteError(null);
                setSelected(team);
              }}
              className={`relative text-label1 cursor-pointer px-6 py-2 ${
                selected === team ? "z-10" : ""
              }`}
            >
              {selected === team && (
                <span
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-22.5 h-22.5 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(170,210,255,0.9) 0%, rgba(170,210,255,0) 70%)",
                  }}
                />
              )}
              <span className="relative">{team}</span>
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
