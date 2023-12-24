import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { RecipeProps } from "@/types";
import RecipeCard from "../Recipe/RecipeCard";

const SwiperRecipes = ({ recipes }: { recipes: RecipeProps[] }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={8}
      scrollbar={{ draggable: true, hide: true, el: "no-scrollbar" }}
      className="mt-16 w-full no-scrollbar"
      breakpoints={{
        500: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 5,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 5,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 5,
        },
        // 1328: {
        //   slidesPerView: 4,
        //   spaceBetween: 5,
        // },
        // 1712: {
        //   slidesPerView: 4,
        //   spaceBetween: 5,
        // },
      }}
    >
      {recipes.map((recipe: RecipeProps, index: number) => (
        <SwiperSlide key={index}>
          <RecipeCard content={recipe} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperRecipes;
