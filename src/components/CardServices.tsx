"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardServicesProps } from "@/interface";

const CardServices: React.FC<CardServicesProps> = ({
  title,
  description,
  imageUrl,
  color,
}) => {
  return (
    <Card className={`w-64 md:w-[350px] ${color} text-white text-center`}>
      <CardHeader className="pb-4">
        <CardDescription>
          <Image src={imageUrl} alt="Imagen de servicio" className="rounded-lg" />
        </CardDescription>
        <CardTitle className="text-base md:text-xl pt-2  font-extrabold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs md:text-base">{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full bg-transparent text-white hover:bg-white hover:text-black font-semibold border-[1px] border-white`}
        >
          Más Información
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardServices;
