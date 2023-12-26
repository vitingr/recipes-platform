"use client";

import MainProfile from "@/components/Profile/MainProfile";
import ProfileRecipe from "@/components/Recipe/ProfileRecipe";
import { GET_ALL_RECIPES } from "@/graphql/queries";
import { RecipeProps } from "@/types";
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

  return (
    recipeData &&
    recipeData.recipes &&
    data.getUser &&
    data.getUser.id &&
    recipeLoading === false && (
      <MainProfile>
        <h1 className="mb-16 mt-4 text-2xl font-semibold cursor-default transition-all duration-300 hover:text-[#f1656a]">
          Minhas Receitas Favoritas
        </h1>
        <div className="flex flex-wrap gap-6 w-full">
          {recipeData.recipes.map((recipe: RecipeProps, index: number) => (
            <div key={index}>
              {recipe.likes.includes(data.getUser.id) && (
                <ProfileRecipe recipe={recipe} key={index} />
              )}
            </div>
          ))}
        </div>
      </MainProfile>
    )
  );
};

export default page;
