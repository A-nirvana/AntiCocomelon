"use client";
import {
  Calendar,
  CircleHelp,
  CircleUserRound,
  House,
  Swords,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const Navbar = () => {
  const navLinks = ["/", "/calender", "/explore", "/quests", "/suduku"];
  let curPath = usePathname();
  const [path, setPath] = useState(curPath);

  return (
    <nav className="flex justify-around w-full h-[3rem] fixed bottom-0 pb-16">
      <div>
        <Link onClick={() => setPath(navLinks[0])} href={navLinks[0]}>
          {path == navLinks[0] ? (
            <House className="navOptionIcons" size={35} />
          ) : (
            <House size={35} />
          )}
        </Link>
      </div>
      <div>
        <Link onClick={() => setPath(navLinks[1])} href={navLinks[1]}>
          {path == navLinks[1] ? (
            <Calendar className="navOptionIcons" size={35} />
          ) : (
            <Calendar size={35} />
          )}
        </Link>
      </div>
      <div>
        <Link onClick={() => setPath(navLinks[2])} href={navLinks[2]}>
          {path == navLinks[2] ? (
            <CircleHelp className="navOptionIcons" size={35} />
          ) : (
            <CircleHelp size={35} />
          )}
        </Link>
      </div>
      <div>
        <Link onClick={() => setPath(navLinks[3])} href={navLinks[3]}>
          {path == navLinks[3] ? (
            <Swords className="navOptionIcons" size={35} />
          ) : (
            <Swords size={35} />
          )}
        </Link>
      </div>
      <div>
        <Link onClick={() => setPath(navLinks[4])} href={navLinks[4]}>
          {path == navLinks[4] ? (
            <CircleUserRound className="navOptionIcons" size={35} />
          ) : (
            <CircleUserRound size={35} />
          )}
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
