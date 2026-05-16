import Image from "next/image";

export default function MemberCard({
  name,
  isLeader,
}: {
  name: string;
  isLeader?: boolean;
}) {
  return (
    <div className="bg-[#D9D9D9] rounded-lg p-3 flex flex-row items-center gap-3 md:w-64 md:h-29.25">
      <Image
        src="/icons/icon-profile.svg"
        alt=""
        width={48}
        height={48}
        className="rounded-full shrink-0"
      />
      <div className="flex flex-col gap-1.5">
        {isLeader && <p className="text-caption1 border-b">PART LEADER</p>}
        <p className="text-body2">{name}</p>
      </div>
    </div>
  );
}
