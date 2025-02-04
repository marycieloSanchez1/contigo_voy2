"use client";

import ChooseUs from "@/components/main/chooseUs";
import TherapyServices from "@/components/main/therapyServices";
import OnlinePsychology from "@/components/main/onlinePsychology";
import Probar from "@/components/NewSlider";
import MainSlider from "@/components/mainslider";

export default function Home() {
  
  return (
    <div className="min-h-screen">
    <MainSlider/>
      <TherapyServices />
      <ChooseUs />
      <OnlinePsychology />
    </div>
  );
}
