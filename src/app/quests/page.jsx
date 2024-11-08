import Image from "next/image";

export default function Page() {
  return (
    <section className="bg-campfire h-screen w-screen bg-contain bg-no-repeat bg-bottom">
      <div className="w-full flex flex-col items-center justify-center">
        <Image
          src="/assets/Quests.svg"
          height={270}
          width={270}
          alt="quests-logo"
        ></Image>
        <h1 className="text-4xl font-bold absolute translate-y-[6.5rem]">
          QUESTS
        </h1>
      </div>
    </section>
  );
}
