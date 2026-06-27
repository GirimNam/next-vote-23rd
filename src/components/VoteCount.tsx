type Props = {
  name: string;
  votes: number;
  color: string;
};

export default function VoteCount({ name, votes, color }: Props) {
  return (
    <div
      className="flex items-center justify-center w-62.25 h-35 border-2 border-[#191F28] text-center text-[28px] font-bold leading-[135%] tracking-[-0.028px] text-black"
      style={{ backgroundColor: color }}
    >
      {name} | {votes}표
    </div>
  );
}
