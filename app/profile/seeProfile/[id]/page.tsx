"use client";

import RecipeCard from "@/components/Recipe/RecipeCard";
import { GET_USER_BY_ID, GET_USER_CREATED_RECIPES } from "@/graphql/queries";
import { RecipeProps } from "@/types";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const pathname = usePathname().split("/");
  const query = pathname[3];

  const { data: userData, loading: userDataLoading } = useQuery(
    GET_USER_BY_ID,
    {
      variables: {
        id: query as string,
      },
      skip: !query,
    }
  );

  const { data: recipesData, loading: recipesDataLoading } = useQuery(
    GET_USER_CREATED_RECIPES,
    {
      variables: {
        id: query,
      },
      skip: !query,
    }
  );

  return (
    userData &&
    recipesData &&
    query !== "" &&
    query !== undefined &&
    recipesDataLoading === false &&
    userDataLoading === false && (
      <div className="w-full sm:p-[5%] p-[2%] max-w-[1250px] flex flex-col bg-white rounded-xl shadow-sm shadow-neutral-200">
        <section className="w-full flex flex-col">
          <h1 className="text-3xl font-bold">Receitas Criadas por</h1>
          <div className="flex gap-4 items-center w-full mt-2">
            <Image
              src={userData.getUserById.photo}
              alt="Profile Image"
              width={35}
              height={35}
              className="w-[40px] h-[40px] rounded-full"
            />
            <div>
              <h2 className="text-base">{userData.getUserById.name}</h2>
              <h4 className="text-[#717171] text-sm">
                {userData.getUserById.email}
              </h4>
            </div>
          </div>
        </section>

        <section className="w-full flex gap-6 flex-wrap mt-16">
          {recipesData.getUserRecipes.map((recipe: RecipeProps, index: number) => (
            <RecipeCard key={index} content={recipe} />
          ))}
        </section>
      </div>
    )
  );
};

export default page;
