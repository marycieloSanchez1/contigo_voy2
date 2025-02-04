"use client";
import React, { useEffect, useRef, useState } from "react";
import { Panel } from "./PanelUser";
import { DataUser } from "./DataUser";
import { ThemeToggle } from "./Themetoggle";
import { Link } from "lucide-react";

const navItems = [
  {
    name: "Home",
    link: "/user/home",
  },
  {
    name: "citas",
    link: "/user/citas",
  },
];

const NavbarUser = () => {
  const [estado, setEstado] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      panelRef.current &&
      !panelRef.current.contains(event.target as Node) &&
      userRef.current &&
      !userRef.current.contains(event.target as Node)
    ) {
      setEstado(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex flex-row">
      <div className="w-60 h-screen fixed p-4">
        <div className="bg-red-500 w-full h-full rounded-2xl">
          Hola mundo como estas
        </div>
      </div>
      <div className="flex-1 ml-60 fixed mt-4">
        <div>
          <nav className="bg-red-300 px-4 h-[8vh] flex items-center fixed z-10 top-4 w-[calc(100vw-240px)]">
            <div className="flex items-center justify-between w-full">
              <div>hola mundo</div>
              <div className="flex items-center gap-x-5">
                <DataUser ref={userRef} estado={estado} setEstado={setEstado} />
                <ThemeToggle />
              </div>
            </div>
          </nav>
          <div className="mt-[8vh]">
            <Panel ref={panelRef} estado={estado} setEstado={setEstado} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarUser;
