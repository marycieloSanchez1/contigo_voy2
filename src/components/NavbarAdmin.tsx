"use client";
import React from "react";
import { NavbarGeneral } from "./DesktopNav";

const navItems = [
  {
    name: "Crear Usuarios",
    link: "/admin/create",
  },
  {
    name: "Crear Servicios",
    link: "/admin/createServices",
  },
  {
    name: "Crear Especialidades",
    link: "/admin/createSpecialties",
  },
];

const NavbarAdmin = () => {
  return <NavbarGeneral navItems={navItems} />;
};

export default NavbarAdmin;