"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./Themetoggle";
import { DataUser } from "./DataUser";
import { Panel } from "./PanelUser";
import { MobileNavbar } from "./MobileNavbar";

export const NavbarGeneral = ({ navItems }: any) => {
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
    <div>
      <nav className="bg-background h-[10vh] flex items-center fixed w-full z-10 top-0">
        <div className="w-full p-6 flex items-center justify-between">
          <Link href="/">
            <h1 className="font-bold text-3xl">
              Contigo<span className="text-primary">Voy</span>{" "}
            </h1>
          </Link>
          <div className="flex items-center gap-x-5">
            <DesktopNav navItems={navItems} />
            <DataUser ref={userRef} estado={estado} setEstado={setEstado} />
            <ThemeToggle />
          </div>
        </div>
      </nav>
      <Panel ref={panelRef} estado={estado} setEstado={setEstado} />
    </div>
  );
};

export const DesktopNav = ({ navItems }: any) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const pathname = usePathname();
  return (
    <>
      <div className="lg:hidden">
        <MobileNavbar navItems={navItems} />
      </div>
      <motion.div
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "relative z-[60] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full px-4 py-2 lg:flex",
          "inset-x-0 h-16"
        )}
      >
        <div className="flex items-center gap-6">
          <div className="hidden flex-1 flex-row items-center justify-center space-x-0 text-sm text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex gap-1">
            {navItems.map((navItem: any, idx: number) => (
              <div key={idx}>
                {navItem.isButton ? (
                  <Link href={navItem.link}>
                    <button
                      className={`text-sm sm:text-base border-2 transition-colors duration-300 rounded-full py-1 sm:py-2 px-3 sm:px-4 
                                  ${
                                    pathname === navItem.link
                                      ? "bg-[#634AE2] text-white"
                                      : "text-[#634AE2] border-[#634AE2] hover:bg-[#634AE2] hover:text-white"
                                  }`}
                      onMouseEnter={() => setHovered(null)}
                    >
                      {navItem.name}
                    </button>
                  </Link>
                ) : (
                  <Link
                    onMouseEnter={() => setHovered(idx)}
                    className={`relative px-4 py-2 text-muted-foreground ${
                      pathname === navItem.link || hovered === idx
                        ? "bg-[#634AE2] rounded-full"
                        : ""
                    }`}
                    key={idx}
                    href={navItem.link}
                  >
                    {hovered === idx && (
                      <motion.div
                        layoutId="hovered"
                        className="absolute inset-0 h-full w-full rounded-full bg-[#634AE2]"
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-20 text-white text-base",
                        hovered === idx || pathname === navItem.link
                          ? "text-white"
                          : "text-[#634AE2] dark:text-primary"
                      )}
                    >
                      {navItem.name}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};