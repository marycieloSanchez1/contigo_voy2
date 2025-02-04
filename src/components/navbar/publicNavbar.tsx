"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  NavbarBrand,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { Menu } from 'lucide-react';
import Image from "next/image";

const navItems = [
  { name: "Sobre Nosotros", link: "/" },
  { name: "Servicios", link: "/services" },
  { name: "Contáctanos", link: "/contact" },
  { name: "Preguntas Frecuentes", link: "/faq" },
  { name: "Blog", link: "/blog" },
];

const PublicNavbar: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <div className="flex items-center">
        <NavbarBrand>
          <Link href="/">
            <Image
              src="/LOGO.png"
              alt="logo"
              width={100}
              height={25}
              className="w-32 h-auto sm:w-48 sm:h-auto"
            />
          </Link>
        </NavbarBrand>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-4">
        <motion.div
          onMouseLeave={() => setHovered(null)}
          className="flex items-center gap-2"
        >
          {navItems.map((navItem, idx) => (
            <NavbarItem key={idx}>
              <Link
                href={navItem.link}
                onMouseEnter={() => setHovered(idx)}
                className={cn(
                  "relative px-3 sm:px-4 py-1 sm:py-2 rounded-full transition-colors hover:bg-[#634AE2] hover:text-white text-[#634AE2] text-sm sm:text-base",
                )}
              >
                {hovered === idx && (
                  <motion.div
                    layoutId="hovered"
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <span className="relative z-10 font-medium">
                  {navItem.name}
                </span>
              </Link>
            </NavbarItem>
          ))}
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex items-center gap-2 sm:gap-4">
        <NavbarItem className="sm:hidden">
          <Dropdown>
            <DropdownTrigger>
              <Button
                isIconOnly
                variant="light"
                aria-label="Open menu"
                className="p-2 sm:p-3"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Navigation menu">
              {navItems.map((item, index) => (
                <DropdownItem key={index} >
                  <Link href={item.link} className="w-full text-[#634AE2] text-sm sm:text-base">
                    {item.name}
                  </Link>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        <NavbarItem>
          <Link href="/login">
            <button className="bg-white text-[#634AE2] text-sm sm:text-base border-2 border-[#634AE2] hover:bg-[#634AE2] hover:text-white transition-colors duration-300 rounded-full py-1 sm:py-2 px-3 sm:px-4 font-medium">
              Iniciar Sesión
            </button>
          </Link>
        </NavbarItem>

        <NavbarItem className="hidden sm:flex">
          <Link href="/register">
            <button className="bg-[#634AE2] text-white text-sm sm:text-base border-2 border-[#634AE2] hover:bg-white hover:text-[#634AE2] transition-colors duration-300 rounded-full py-1 sm:py-2 px-3 sm:px-4 font-medium">
              Registrarse
            </button>
          </Link>
        </NavbarItem>
      </div>
    </>
  );
};

export default PublicNavbar;

