
"use client";
import { useEffect, useState, useRef } from "react";
import anime from "animejs";

const SmallAnimatedText: React.FC = () => {
  const phrases = [
    {
      part3: "Con nuestras terapias virtuales, transformamos",
      part4: "tu vida y te acompañamos en cada paso de tu ",
      part5: "camino hacia la sanación.",
    },
    {
      part3: "Nuestras terapias virtuales te permiten cuidar",
      part4: "de tu bienestar desde la comodidad de tu ",
      part5: "hogar cuando más lo necesites",
    },
    {
      part3: "Transforma tu vida con nuestras",
      part4: "terapias diseñadas para ayudarte",
      part5: "a sanar y crecer.",
    },
    {
      part3: "8 de cada 10 peruanos no reciben ",
      part4: "la atención mental que necesitan.",
      part5: " ",
    },
  ];

  const [currentPhrase, setCurrentPhrase] = useState<number>(0);
  const isAnimating = useRef<boolean>(false);

  useEffect(() => {
    const smallanimateText = () => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      // Selecciona las partes animadas y envuelve cada letra en un <span>
      const part3Wrapper = document.querySelector(".animated-part3");
      const part4Wrapper = document.querySelector(".animated-part4");
      const part5Wrapper = document.querySelector(".animated-part5");

      if (part3Wrapper && part4Wrapper && part5Wrapper) {
        part3Wrapper.innerHTML = phrases[currentPhrase].part3
          .split("")
          .map((letter) => `<span class='letter'>${letter}</span>`)
          .join("");

        part4Wrapper.innerHTML = phrases[currentPhrase].part4
          .toLowerCase()
          .split("")
          .map((letter) => `<span class='letter'>${letter}</span>`)
          .join("");

        part5Wrapper.innerHTML = phrases[currentPhrase].part5
          .toLowerCase()
          .split("")
          .map((letter) => `<span class='letter'>${letter}</span>`)
          .join("");
      }

      // Ejecuta la animación con anime.js
      anime
        .timeline({ loop: false, autoplay: true })
        .add({
          targets: ".animated-part3 .letter",
          scale: [4, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: "easeOutExpo",
          duration: 800,
          delay: (el, i) => 70 * i,
        })
        .add({
          targets: ".animated-part4 .letter",
          scale: [4, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: "easeOutExpo",
          duration: 800,
          delay: (el, i) => 70 * i,
          offset: 0,
        })
        .add({
          targets: ".animated-part5 .letter",
          scale: [4, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: "easeOutExpo",
          duration: 800,
          delay: (el, i) => 70 * i,
          offset: 0,
        });
    };

    // Llama a la animación inicial
    smallanimateText();

    // Cambia la frase actual cada 5 segundos
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 5000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [currentPhrase, phrases]);

  return (
    <p className="text-sm sm:text-base md:text-lg lg:text-xl">
      <span className="animated-part3 text-white"></span>{" "}
      <span className="animated-part4 text-white block"></span>{" "}
      <span className="animated-part5 text-white block"></span>
    </p>
  );
};

export default SmallAnimatedText;