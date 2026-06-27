type Props = {
  rank: number;
  color: string;
};

export default function RankBadge({ rank, color }: Props) {
  return (
    <div className="relative flex items-center justify-center w-21.5 h-21.5 rounded-full bg-white border-2 border-[#191F28]">
      <div
        className="absolute w-8 h-8 rounded-full blur-xl"
        style={{ backgroundColor: color }}
      />
      <span className="relative text-center text-3xl font-bold leading-[135%] tracking-[-0.028px] text-black">
        {rank}위
      </span>
    </div>
  );
}
