export type Part = "PM" | "DESIGN" | "FRONTEND" | "BACKEND";

export interface Member {
  name: string;
  isExecutive: boolean;
  isLeader: boolean;
  school?: string;
  department?: string;
}

export const MEMBERS: Record<Part, Member[]> = {
  PM: [
    { name: "김채원", isExecutive: false, isLeader: false },
    { name: "문현승", isExecutive: false, isLeader: false },
    { name: "변성우", isExecutive: false, isLeader: false },
    { name: "안민용", isExecutive: false, isLeader: false },
    { name: "안서연", isExecutive: false, isLeader: false },
    { name: "안세빈", isExecutive: false, isLeader: false },
    { name: "오유준", isExecutive: false, isLeader: false },
    { name: "이소은", isExecutive: false, isLeader: false },
    { name: "이정원", isExecutive: false, isLeader: false },
    { name: "조아현", isExecutive: false, isLeader: false },
    { name: "현종혁", isExecutive: true, isLeader: true },
    { name: "박준영", isExecutive: true, isLeader: false },
    { name: "이우혁", isExecutive: true, isLeader: false },
    { name: "이혜린", isExecutive: true, isLeader: false },
    { name: "조은호", isExecutive: true, isLeader: false },
    { name: "허유진", isExecutive: true, isLeader: false },
  ],
  DESIGN: [
    { name: "강예린", isExecutive: false, isLeader: false },
    { name: "고다현", isExecutive: false, isLeader: false },
    { name: "권지민", isExecutive: false, isLeader: false },
    { name: "김미소", isExecutive: false, isLeader: false },
    { name: "김은홍", isExecutive: false, isLeader: false },
    { name: "김정원", isExecutive: false, isLeader: false },
    { name: "문수인", isExecutive: false, isLeader: false },
    { name: "오상헌", isExecutive: false, isLeader: false },
    { name: "우유민", isExecutive: false, isLeader: false },
    { name: "이우림", isExecutive: false, isLeader: false },
    { name: "박서령", isExecutive: true, isLeader: true },
    { name: "노성주", isExecutive: true, isLeader: false },
    { name: "성유정", isExecutive: true, isLeader: false },
    { name: "윤시연", isExecutive: true, isLeader: false },
    { name: "정시빈", isExecutive: true, isLeader: false },
    { name: "정은선", isExecutive: true, isLeader: false },
    { name: "천영현", isExecutive: true, isLeader: false },
  ],
  FRONTEND: [
    { name: "구민교", isExecutive: false, isLeader: false },
    { name: "권오진", isExecutive: false, isLeader: false },
    { name: "김민서", isExecutive: false, isLeader: false },
    { name: "김홍엽", isExecutive: false, isLeader: false },
    { name: "남기림", isExecutive: false, isLeader: false },
    { name: "박유민", isExecutive: false, isLeader: false },
    { name: "오유진", isExecutive: false, isLeader: false },
    { name: "이승연", isExecutive: false, isLeader: false },
    { name: "이윤서", isExecutive: false, isLeader: false },
    { name: "황영준", isExecutive: false, isLeader: false },
    { name: "원채영", isExecutive: true, isLeader: true },
    { name: "김류원", isExecutive: true, isLeader: false },
    { name: "김윤성", isExecutive: true, isLeader: false },
    { name: "손주완", isExecutive: true, isLeader: false },
  ],
  BACKEND: [
    { name: "김도현", isExecutive: false, isLeader: false },
    { name: "김동욱", isExecutive: false, isLeader: false },
    { name: "김태익", isExecutive: false, isLeader: false },
    { name: "김태희", isExecutive: false, isLeader: false },
    { name: "안준석", isExecutive: false, isLeader: false },
    { name: "오지송", isExecutive: false, isLeader: false },
    { name: "임종훈", isExecutive: false, isLeader: false },
    { name: "최승원", isExecutive: false, isLeader: false },
    { name: "최우혁", isExecutive: false, isLeader: false },
    { name: "황신애", isExecutive: false, isLeader: false },
    { name: "변호영", isExecutive: true, isLeader: true },
    { name: "신 혁", isExecutive: true, isLeader: false },
    { name: "이수아", isExecutive: true, isLeader: false },
    { name: "이연호", isExecutive: true, isLeader: false },
    { name: "이윤지", isExecutive: true, isLeader: false },
    { name: "이준영", isExecutive: true, isLeader: false },
  ],
};
