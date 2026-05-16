import Image from "next/image";

export default function About() {
  return (
    <main className="px-4 py-8">
      <Image
        src="/figures/figure-about-small.svg"
        alt="About CEOS"
        width={325}
        height={555}
        className="block md:hidden w-full max-w-81.25"
      />
      <Image
        src="/figures/figure-about-big.svg"
        alt="About CEOS"
        width={927}
        height={560}
        className="hidden md:block w-full max-w-231.75"
      />
    </main>
  );
}
