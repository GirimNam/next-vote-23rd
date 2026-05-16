import NavBar from "@/components/NavBar";

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar className="w-full mt-0 md:flex md:justify-center md:mt-9" />
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
}
