import NavBar from "@/components/NavBar";

export default function VotingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-y-auto no-scrollbar">
      <NavBar className="absolute top-0 left-0 w-full z-10 md:flex md:justify-center md:mt-9" />
      {children}
    </div>
  );
}
