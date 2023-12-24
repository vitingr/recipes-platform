"use client";

import { GET_ALL_RECIPES, GET_ALL_USERS } from "@/graphql/queries";
import { RecipeProps, UserProps } from "@/types";
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

  const { data: usersData, loading: usersLoading } = useQuery(GET_ALL_USERS);

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
      recipeLoading === false &&
      usersLoading === false
    ) {
      getAllRecipes();
    }
  }, [session, recipeLoading]);

  return (
    recipeData &&
    recipeData.recipes &&
    usersData &&
    usersData.users && (
      <div className="h-full flex-col items-center gap-10 2xl:flex hidden w-full max-w-[400px]">
        <section className="w-full bg-white rounded-xl p-6 border border-neutral-100 shadow-neutral-200 shadow-sm">
          <h1 className="text-2xl font-semibold mb-8">Perfis Famosos</h1>
          {usersData.users.slice(0, 5).map((user: UserProps, index: number) => (
            <div className="flex gap-4 items-center mb-6" key={index}>
              <Image
                src={user.photo}
                alt="Profile Picture"
                width={40}
                height={40}
                className="max-w-[40px] max-h-[40px] w-full h-full rounded-full"
              />
              <div className="flex flex-col justify-center">
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-[#717171]">{user.bio}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="w-full  bg-white rounded-xl p-6 border border-neutral-200 shadow-neutral-100 shadow-sm">
          <h1 className="text-2xl font-semibold mb-8">Receitas do Momento</h1>
          {recipeData.recipes
            .slice(0, 5)
            .map((recipe: RecipeProps, index: number) => (
              <div
                className="w-full flex justify-between gap-4 items-center mb-6 pb-6 border-b border-neutral-100"
                key={index}
              >
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
                <Link
                  href={`/recipe/${recipe.id}`}
                  className="bg-[#f1656a] text-white text-sm w-[125px] px-2 py-1 text-center rounded-full"
                >
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
