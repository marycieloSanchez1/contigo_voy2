"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function TherapyServices() {

  const [isOpen, setIsOpen] = useState(false);
  const services = [
    {
      icon: "/images/childTherapy.webp",
      title: "Terapia para niños",
    },
    {
      icon: "/images/TeenTherapy.webp",
      title: "Terapia adolescente",
    },
    {
      icon: "/images/adultTherapy.webp",
      title: "Terapia de parejas",
    },
    {
      icon: "/images/coupleTherapy.webp",
      title: "Terapia para adultos",
    },
    {
      icon: "/images/familyTherapy.webp",
      title: "Terapia familiar",
    },
  ];

  return (
    <div className="max-w-full px-0 mb-4 mx-auto py-16 ">
    <motion.h2
      className="text-4xl font-bold mt-[65px] text-center text-[#634AE2] mb-16 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Servicios
      </motion.h2>

      <div className="flex gap-[0.4px] md:flex-row flex-col">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex-1 bg-[#634AE2] p-3 text-white duration-400 flex flex-col 
            hover:flex-[1.2] hover:shadow-[0_7px_29px_0px_rgba(99,74,226,0.2)]
            md:w-auto w-full md:hover:flex-[1.2] "
          >
            <div className="flex flex-col items-end mb-[25px]">
              <Image
                src={service.icon}
                alt={service.title}
                width={63}
                height={63}
              />
            </div>
            <h3 className="mt-3 mb-[46px] text-xl font-bold">
              {service.title}
            </h3>
            <div className="flex flex-col items-end mt-auto mb-5">
              <button
                onClick={() => setIsOpen(true)}
                className="group flex items-center space-x-2 text-sm hover:text-purple-200 transition-colors"
              >
                 <span className="relative group ">
                  Ver más
                  <span className="absolute bottom-0 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full duration-500"></span>
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="2xl"
        scrollBehavior="inside"
        backdrop="blur"
      >
        <ModalContent>
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white p-6 rounded-lg">
            <ModalHeader>
              <h3 className="text-2xl font-bold">Terapia para niños</h3>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-6">
              <p className="text-lg font-medium">
                  Dirigido a niños de 3 a 12 años.
                </p>
                
                <div>
                <h4 className="text-xl font-semibold mb-2">
                    Terapia para niños
                  </h4>
                  <p className="text-purple-100">
                  Potencia el bienestar emocional de tu hijo. Empleamos una
                    intervención dinámica, basada en el juego, para potenciar el
                    bienestar integral del niño. La terapia contempla el entorno
                    familiar y el ámbito escolar.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {[
                    "Resolución de conflictos",
                    "Habilidades sociales",
                    "Traumas por separación de padres",
                    "Inteligencia emocional",
                    "Duelos y miedos",
                    "Autoestima",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <Button
                  className="w-full bg-white text-purple-600 hover:bg-purple-100 transition-colors font-semibold py-2 rounded-lg mt-6"
                  onClick={() => setIsOpen(false)}
                >
                  Reservar cita
                </Button>
              </div>
            </ModalBody>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

