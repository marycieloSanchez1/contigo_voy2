import { Icons } from "@/icons";
import React from "react";

const redes = [
  {
    nombre: "tiktok",
    icono: Icons.tiktok,
    link: "https://www.tiktok.com/@luisdemaryori",
  },
  {
    nombre: "threads",
    icono: Icons.threads,
    link: "https://twitter.com/luisdemaryori",
  },
  {
    nombre: "instagram",
    icono: Icons.instagram,
    link: "https://www.instagram.com/luisdemaryori/",
  },
  {
    nombre: "facebook",
    icono: Icons.facebook,
    link: "https://www.facebook.com/luis.demaryo.rios",
  },
  {
    nombre: "youtube",
    icono: Icons.youtube,
    link: "https://wa.me/919951020025",
  },
  
];

const RedesSociales = () => {
  return (
    <div>
      <ul className="wrapper">
        {redes.map((rede, index) => (
          <li
          className={`icon ${rede.nombre} w-5 fill-current text-[#634AE2]`}
            key={index}
            onClick={() => window.open(rede.link, "_blank")}
          >
            <span className="tooltip capitalize">{rede.nombre}</span>
            <div
              className="icon-svg"
              dangerouslySetInnerHTML={{ __html: rede.icono }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RedesSociales;
