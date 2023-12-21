"use client";

import MainProfile from "@/components/Profile/MainProfile";
import ProfileRecipe from "@/components/Recipe/ProfileRecipe";
import { GET_USER_CREATED_RECIPES } from "@/graphql/queries";
import { RecipeProps } from "@/types";
import { infoUser } from "@/utils/common/userContext";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const page = () => {
  const { data, getUserInfo } = infoUser();
  const { data: session, status } = useSession();

  const { data: recipeData, loading: recipeLoading } = useQuery(
    GET_USER_CREATED_RECIPES,
    {
      variables: {
        id: data.getUser.id,
      },
      skip: !data.getUser.id || data.getUser.id === undefined,
    }
  );

  useEffect(() => {
    if (
      session?.user?.email !== undefined &&
      status === "authenticated" &&
      recipeLoading === false
    ) {
      console.log(recipeData);
    }
  }, [recipeLoading]);

  return (
    <>
      <MainProfile>
        <h1 className="mb-16 mt-4 text-2xl font-semibold cursor-default transition-all duration-200 hover:text-[#f1656a]">
          Minhas Receitas Criadas
        </h1>
        <div className="flex flex-wrap gap-6 w-full">
          {recipeData &&
            recipeData.getUserRecipes &&
            recipeData.getUserRecipes.map(
              (recipe: RecipeProps, index: number) => (
                <ProfileRecipe recipe={recipe} key={index} />
              )
            )}
        </div>
      </MainProfile>
    </>
  );
};

export default page;
