type Props = {
  name: string;
  school?: string;
  department?: string;
};

export default function MemberCard({
  name,
  school = "CEOS UNIV",
  department = "Computer Science",
}: Props) {
  return (
    <div className="relative w-42 h-20 md:w-64 md:h-29.25 rounded-lg bg-[#D9D9D9]">
      <img
        src="/icons/icon-profile.svg"
        alt=""
        aria-hidden
        className="absolute top-3.75 left-2 w-12.5 h-12.5 md:top-3 md:left-3 md:w-19.25 md:h-19.25"
      />
      <span className="absolute top-10 left-15.5 w-25 md:top-12.25 md:left-29.25 md:w-29.75 h-px bg-[#B0B8C1]" />
      <span className="absolute top-4.5 left-15.5 w-25 md:top-auto md:bottom-17.75 md:left-29.25 md:w-29.75 text-center text-[11px] md:text-sm font-bold leading-[140%] tracking-[-0.014px] text-[#4E5968]">
        {name}
      </span>
      <span className="absolute top-11.5 left-15.5 w-25 md:top-15 md:left-29.25 md:w-29.75 text-center text-[9px] md:text-xs font-medium leading-[135%] tracking-[-0.012px] text-[#F9FAFB] whitespace-pre-line">
        {`${school}\n${department}`}
      </span>
    </div>
  );
}
