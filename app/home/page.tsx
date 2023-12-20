"use client";

import Loader from "@/components/Loader";
import HolidayCard from "@/components/Recipe/HolidayCard";
import RecipeCard from "@/components/Recipe/RecipeCard";
import SwiperRecipes from "@/components/config/SwiperRecipes";
import ToastMessage from "@/components/config/ToastMessage";
import { holidayCards } from "@/constants/holiday-cards";
import { GET_ALL_RECIPES } from "@/graphql/queries";
import { HolidayProps, RecipeProps } from "@/types";
import { infoUser } from "@/utils/common/userContext";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const page = () => {
  const { data: session, status } = useSession();
  const { data, getUserInfo } = infoUser();

  const {
    data: recipeData,
    loading: recipeLoading,
    refetch: refetchRecipes,
  } = useQuery(GET_ALL_RECIPES);

  const getAllRecipes = async () => {
    try {
      if (recipeLoading === false) {
        if (recipeData.recipes.length === 0) {
          await refetchRecipes();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      session?.user?.email !== undefined &&
      status === "authenticated" &&
      recipeLoading === false
    ) {
      getAllRecipes();
      console.log(recipeData);
    }
  }, [session, recipeLoading]);

  return recipeData?.recipes?.length > 0 ? (
    <div className="w-full sm:p-[5%] p-[2%] max-w-[1850px] flex flex-col items-center">
      <ToastMessage />
      <section className="w-full flex flex-col">
        <h1 className="text-3xl font-bold">Explorar receitas</h1>
        <SwiperRecipes recipes={recipeData.recipes} />
        {/* <div className='mt-20 bg-[#f1656a] text-white rounded-full font-semibold py-2 w-[125px] text-center'>
          Ver mais
        </div> */}
      </section>

      <section className="w-full mt-[10em]">
        <h1 className="text-3xl font-bold">Receitas Temáticas</h1>

        <div className="flex gap-16 w-full justify-center flex-wrap mt-16">
          {holidayCards.map((holiday: HolidayProps, index: number) => (
            <HolidayCard
              key={index}
              title={holiday.title}
              image={holiday.image}
            />
          ))}
        </div>
      </section>

      <section>//</section>
    </div>
  ) : (
    <Loader />
  );
};

export default page;
