"use client";

import Loader from "@/components/Loader";
import HolidayCard from "@/components/Recipe/HolidayCard";
import SwiperRecipes from "@/components/config/SwiperRecipes";
import ToastMessage from "@/components/config/ToastMessage";
import { holidayCards } from "@/constants/holiday-cards";
import { GET_ALL_RECIPES } from "@/graphql/queries";
import { HolidayProps, RecipeProps } from "@/types";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { toast } from "react-toastify";

const page = () => {

  const router = useRouter()

  // Fetch Recipe Data Queries
  const [search, setSearch] = useState<string>("");

  const {
    data: recipeData,
    loading: recipeLoading,
  } = useQuery(GET_ALL_RECIPES);

  // Search Recipe Function
  const handleSearchRecipe = async () => {
    try {
      if (search !== "") {
        router.push(`/home/search/${search}`)
      } else {
        toast.error("Primeiramente digite algo para buscar")
      }
    } catch (error) {
      toast.error("Não foi possível retornar um resultado para a sua busca")
    }
  }

  return recipeData?.recipes?.length > 0 && recipeLoading === false ? (
    <div className="w-full sm:p-[5%] p-[2%] max-w-[1850px] flex flex-col items-center bg-white border border-neutral-100 shadow-sm shadow-neutral-200 rounded-xl">
      <ToastMessage />
      <section className="w-full flex flex-col">
        <h1 className="text-3xl font-bold text-center sm:text-left">Explorar receitas</h1>
        <form onSubmit={async (e: React.SyntheticEvent) => {
          e.preventDefault()
          await handleSearchRecipe()
        }} className="w-full flex items-center gap-6 mt-12 mb-2">
          <input
            type="text"
            name="title"
            id="title"
            className="w-full outline-none px-4 py-2 border-b border-neutral-200 mt-1 text-[#717171]"
            autoComplete="off"
            placeholder="O que você está buscando"
            onChange={(e) => setSearch(e.target.value)}
          />
          <GoSearch size={25} className="gray-icon cursor-pointer" onClick={() => handleSearchRecipe()} />
        </form>
        <div className="w-full flex items-center justify-center">
          <SwiperRecipes recipes={recipeData.recipes} />
        </div>
      </section>

      <section className="w-full mt-[10em]">
        <h1 className="text-3xl font-bold text-center sm:text-left">Receitas Temáticas</h1>

        <div className="flex gap-16 w-full justify-center flex-wrap mt-16">
          {holidayCards.map((holiday: HolidayProps, index: number) => (
            <HolidayCard
              key={index}
              type={holiday.type}
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
