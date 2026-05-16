export type Part = "frontend" | "backend";

export type TeamName = "Ditda" | "JobDri" | "Groupeat" | "IPX" | "CONX";

export const TEAM_NAMES: TeamName[] = [
  "Ditda",
  "JobDri",
  "Groupeat",
  "IPX",
  "CONX",
];

export const TEAM_MEMBERS: Record<Part, Record<TeamName, string[]>> = {
  frontend: {
    Ditda: ["박유민", "권오진"],
    JobDri: ["이윤서", "구민교"],
    Groupeat: ["이승연", "황영준"],
    IPX: ["남기림", "김민서"],
    CONX: ["김홍엽", "오유진"],
  },
  backend: {
    Ditda: ["임종훈", "안준석"],
    JobDri: ["황신애", "최우혁"],
    Groupeat: ["김동욱", "최승원"],
    IPX: ["오지송", "김태익"],
    CONX: ["김태희", "김도현"],
  },
};
