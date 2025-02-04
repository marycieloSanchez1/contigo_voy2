"use client";
import React from "react";
import ContactForm from "@/components/ContacForm";
import FormContacto from "@/components/FormContacto";


const ContactUs = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center "
      style={{
        backgroundImage: `linear-gradient(#634AE27A, #634AE27A), url('/SB.webp')`,
      }}
    >
      <div className="container mx-auto px-4 md:px-12 lg:px-36 py-12 ">
        <div className="grid lg:grid-row-2 gap-8 items-center">
          <div className="text-white space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
              <p className="mb-4">¡La solución que buscas,</p>
              <p className="mb-12" >empieza aquí!</p>
            </h1>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ">
              Contáctanos
            </h3>
          </div>
          <div className="w-full  md:w-96 lg:w-96 flex justify-center lg:justify-start">
            <ContactForm />
            {/* <FormContacto /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
