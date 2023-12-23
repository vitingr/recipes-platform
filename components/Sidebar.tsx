"use client";

import { GET_ALL_RECIPES } from "@/graphql/queries";
import { RecipeProps } from "@/types";
import { infoUser } from "@/utils/common/userContext";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const Sidebar = () => {
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

  return (
    recipeData &&
    recipeData.recipes && (
      <div className="h-full flex-col items-center gap-10 2xl:flex hidden w-full max-w-[400px]">
        <section className="w-full bg-white rounded-xl p-6">
          <h1 className="text-2xl font-semibold mb-8">Mais Seguidos</h1>
          <div className="flex gap-4 items-center mb-6">
            <Image
              src={"/assets/image.jpg"}
              alt="Profile Picture"
              width={50}
              height={50}
              className="max-w-[50px] max-h-[50px] w-full h-full rounded-full"
            />
            <div className="flex flex-col justify-center">
              <h2 className="font-semibold">Getulio Games</h2>
              <p className="text-sm text-[#717171]">
                wjdwjdiwjdiwjdwijdwijdiwjdwidjwiF
              </p>
            </div>
          </div>
        </section>

        <section className="w-full  bg-white rounded-xl p-6">
          <h1 className="text-2xl font-semibold mb-8">Receitas do Momento</h1>
          {recipeData.recipes
            .slice(0, 5)
            .map((recipe: RecipeProps, index: number) => (
              <div className="w-full flex justify-between gap-4 items-center mb-6 pb-6 border-b border-neutral-100" key={index}>
                <Image
                  src={recipe.photo}
                  alt="Profile Picture"
                  width={50}
                  height={50}
                  className="max-w-[50px] max-h-[50px] h-full rounded-full w-full"
                />
                <div className="flex flex-col justify-center w-full">
                  <h2 className="font-semibold">{recipe.title}</h2>
                  <p className="text-sm text-[#717171]">
                    {recipe.type} jodwjodwjodwjodwjodwj odw
                  </p>
                </div>
                <Link href={`/recipe/${recipe.id}`} className="bg-[#f1656a] text-white text-sm w-[125px] px-2 py-1 text-center rounded-full">
                  Ver mais
                </Link>
              </div>
            ))}
        </section>
      </div>
    )
  );
};

export default Sidebar;
