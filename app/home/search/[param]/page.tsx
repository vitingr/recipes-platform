"use client";

import RecipeCard from "@/components/Recipe/RecipeCard";
import { SEARCH_RECIPE } from "@/graphql/queries";
import { RecipeProps } from "@/types";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const page = () => {
  const pathname = usePathname().split("/");
  const query = pathname[3];

  const { data: SearchData, loading: SearchLoading } = useQuery(SEARCH_RECIPE, {
    variables: {
      string: query,
    },
    skip: !query,
  });

  return (
    SearchData &&
    SearchLoading === false && (
      <div className="w-full sm:h-auto min-h-[62vh] p-[5%] max-w-[1250px] flex flex-col bg-white rounded-xl shadow-sm shadow-neutral-200">
        <section className="w-full flex flex-col">
          <h1 className="text-2xl text-[#717171]">
            Receitas Encontradas por{" "}
            <span className=" text-2xl">"{query}"</span>
          </h1>
        </section>

        <section className="w-full flex gap-6 flex-wrap mt-16">
          {SearchData.searchRecipe.length > 0 ? (
            <>
              {SearchData.searchRecipe.map(
                (recipe: RecipeProps, index: number) => (
                  <RecipeCard key={index} content={recipe} />
                )
              )}
            </>
          ) : (
            <div className="w-full flex flex-col items-center">
              <Image
                src={"/assets/pie.png"}
                alt="Apple Pie Icon"
                width={100}
                height={100}
                className="w-[100px] h-[100px] selection:bg-transparent cursor-default"
              />
              <h2 className="text-xl mt-6 text-[#717171] text-center">
                Não conseguimos encontrar o que você está buscando...
              </h2>
            </div>
          )}
        </section>
      </div>
    )
  );
};

export default page;
