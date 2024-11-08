"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [dayOrNight, setDayOrNight] = useState(0);
  const [name, setName] = useState("");
  const [coins, setCoins] = useState(0);
  useEffect(() => {
    const time = Date.now();
    const hours = new Date(time).getHours();
    console.log(hours)
    if (hours >= 12) {
      setDayOrNight(1);
    }
    if (hours >= 17) {
      setDayOrNight(2);
    }
    setName(localStorage.getItem("name") ?? "kid");
    setCoins(localStorage.getItem("coins") ?? 0);
  }, [])
  return (
    <main className="bg-[#B4E3DC] overflow-hidden">
      <div className={`bg-gradient-to-t ${dayOrNight <= 1 ? "from-[#7EBDAE] to-[#BCDABE22]" : "from-[#7EBDAE99] to-[#678569]"} h-screen w-screen overflow-hidden`}>
        <div className="flex justify-center items-center">
          <Image src="/assets/coins.png" width={300} height={300} alt="200" />
          <p className={dayOrNight<=1?"text-black":"text-white"}>{coins}</p>
        </div>
        <Image src={dayOrNight != 2 ? `/assets/deSan.png` : "/assets/deMun.png"} width={300} height={300} alt="200" className={`w-1/2 ${dayOrNight == 0 ? "" : dayOrNight == 1 ? "ml-[25%]" : "ml-[50%]"} animate-sandemun`} />
        <p className=" mt-8 ml-8 font-semibold text-black font-outfit text-3xl tracking-tighter">Good {dayOrNight == 0 ? "morning" : dayOrNight == 1 ? "afternoon" : "evening"} {name}</p>
        <div className="absolute w-full overflow-hidden bottom-0">
          <Image src="/assets/BG.png" width={400} height={400} alt="200" className="w-full animate-upDown" />
        </div>
        <div className="absolute w-full overflow-hidden bottom-0">
          <Image src="/assets/paral.png" width={400} height={400} alt="200" className="w-full animate-upDown" style={{ animationDelay: "1500ms" }} />
        </div>
        <div className="absolute w-full overflow-hidden bottom-0">           
          <Image src="/assets/foreground.svg" width={400} height={400} alt="200" className="w-full" />
        </div>
      </div>
    </main>
  );
}
