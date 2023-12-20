import { HolidayProps } from "@/types";
import React from "react";

const HolidayCard = ({ image, title }: HolidayProps) => {
  return (
    <div
      className="flex justify-center items-center w-[300px] h-[200px] rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(70.62deg, rgb(55 39 43 / 74%) 14.78%, rgb(24 16 18 / 75%) 71.74%), url(${image})`,
      }}
    >
      <h1 className="text-white text-3xl font-bold">{title}</h1>
    </div>
  );
};

export default HolidayCard;
