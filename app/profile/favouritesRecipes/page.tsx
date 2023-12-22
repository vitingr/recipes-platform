"use client"

import MainProfile from '@/components/Profile/MainProfile';
import ProfileRecipe from '@/components/Recipe/ProfileRecipe';
import { GET_ALL_RECIPES } from '@/graphql/queries';
import { RecipeProps } from '@/types';
import { infoUser } from '@/utils/common/userContext';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'

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
  }, [session, status, recipeLoading]);

  return (
    <>
      <MainProfile>
        <h1 className="mb-16 mt-4 text-2xl font-semibold cursor-default transition-all duration-300 hover:text-[#f1656a]">
          Minhas Receitas Favoritas
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
  )
}

export default page