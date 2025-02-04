"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CardServicesProps } from "@/interface";
const CardServicesAnimation: React.FC<CardServicesProps> = ({
  title,
  description,
  imageUrl,
  color,
}) => {
  return (
    <div>
      <div className={`card w-64 md:w-[300px] text-white text-center`}>
        <div className="face front">
          <Image src={imageUrl} alt=""/>
          <h3 className="n-expert font-extrabold">{title}</h3>
        </div>
        <div className="face back">
          <h3 className="text-base md:text-xl pt-2  font-semibold">{title}</h3>
          <p className="text-sm md:text-base">{description}</p>
          <div className="link">
            <Button
              className={`w-full bg-transparent text-white hover:bg-white hover:text-black font-semibold border-[1px] border-white`}
            >
              Más Información
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardServicesAnimation;
