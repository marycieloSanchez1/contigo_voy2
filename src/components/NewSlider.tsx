"use client";

import { useState, useEffect, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import anime from "animejs";
import "../app/globals.css";

const Probar = () => {
  const sections = [
    {
      phrase: "Estamos contigo <br> y para ti",
      smallPhrase:
        "Con nuestras terapias virtuales, transformamos <br> tu vida y te acompañamos en cada paso de tu <br> camino hacia la sanación.",
      button: true,
      background: "/carruselImages/estamoparati.webp",
    },
    {
      phrase: "Apoyo a un <br> click de distancia",
      smallPhrase:
        "Nuestras terapias virtuales te permiten cuidar <br> de tu bienestar desde la comodidad de tu <br>hogar cuando más lo necesites.",
      button: true,
      background: "/carruselImages/clickpos.webp",
    },
    {
      phrase: "Tu bienestar emocional <br> inicia aqui",
      smallPhrase:
        "Transforma tu vida con nuestras <br> terapias diseñadas para ayudarte <br> a sanar y crecer.",
      button: true,
      background: "/carruselImages/bienestar.webp",
    },
    {
      phrase: "No dejemos que el <br> silencio sea el enemigo",
      smallPhrase:
        "8 de cada 10 peruanos no reciben <br> la atención mental que necesitan. <br>",
      button: true,
      background: "/carruselImages/silencio.webp",
    },
  ];

  const [currentPhrase, setCurrentPhrase] = useState<number>(0);
  const isAnimating = useRef<boolean>(false);

  useEffect(() => {
    const animateText = () => {
      if (isAnimating.current) return;
      isAnimating.current = true;
  
      const part1Wrapper = document.querySelector(".animated-part1");
      if (part1Wrapper) {
        part1Wrapper.innerHTML = sections[currentPhrase].phrase
          .split(" ")
          .map((word) => `<span class='word'>${word}</span>`)
          .join(" ");
  
        anime
          .timeline({ loop: false, autoplay: true })
          .add({
            targets: ".animated-part1 .word",
            scale: [4, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 8000,
            delay: (el, i) => 70 * i,
          })
          .finished.then(() => {
            isAnimating.current = false;
          });
      }
    };
  
    animateText();
  }, [currentPhrase]); 

  const handleSlideChange = (splide: any) => {
    setCurrentPhrase(splide.index);
  };

  return (
    <div className="max-h-[800px] relative">
      <div className="h-full">
        <Splide
          options={{
            type: "fade",
            height: "100%",
            pagination: true,
            arrows: false,
            autoplay: true,
            interval: 10000,
            pauseOnHover: false,
            rewind: true,
          }}
          onMove={handleSlideChange}
        >
          {sections.map((section, index) => (
            <SplideSlide key={index} id={`slide-${index}`}>
              <div
                className="h-[800px] flex flex-col justify-center items-start text-left text-white px-4 md:px-16 relative"
                style={{
                  backgroundImage: `linear-gradient(#634AE27A, #634AE27A), url(${sections[currentPhrase].background})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex gap-4 p-6 flex-col md:flex-row justify-center items-center ">
                  <div className="flex-1 lg:w-2/3 flex-col space-y-5 flex">
                    <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold animated-part1">
                    <span dangerouslySetInnerHTML={{ __html: sections[currentPhrase].phrase }} />

                      
                    </h1>
                    <p
                      className="text-sm sm:text-base md:text-lg pb-14 lg:text-xl"
                      dangerouslySetInnerHTML={{
                        __html: sections[currentPhrase].smallPhrase,
                      }}

                      
                    />
                      {section.button && (
                  <button className="bg-[#634AE2] max-w-[188px] p-3 text-white  rounded-[30px] hover:bg-purple-700 ">
                    Reservar Cita
                  </button>
                )}
                  </div>
                  
                </div>
              
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default Probar;
