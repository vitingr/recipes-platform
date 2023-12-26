"use client";

import UserBio from "@/components/Popups/UserBio";
import ToastMessage from "@/components/config/ToastMessage";
import { infoUser } from "@/utils/common/userContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MainProfile = ({ children }: { children: React.ReactNode }) => {
  // Get User Data
  const { data: session, status } = useSession();
  const { data } = infoUser();

  const [editBio, setEditBio] = useState<boolean>(false);

  return (
    data.getUser &&
    data.getUser.id && (
      <div className="w-full max-w-[1850px] flex flex-col items-center">
        <ToastMessage />
        <div className="border border-neutral-200 shadow-sm max-w-[1850px] w-full rounded-xl">
          {/* Profile background */}
          <div
            style={{
              backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/006/879/154/large_2x/abstract-and-pattern-background-illustration-with-gradient-color-of-violet-this-luxurious-background-is-suitable-for-presentation-poster-wallpaper-personal-website-ui-and-ux-experiences-etc-free-photo.jpg")`,
            }}
            className="w-full h-[300px] bg-cover bg-no-repeat rounded-t-xl bg-center"
          ></div>

          {/* Profile Info */}
          <div className="flex gap-12 p-6 bg-white">
            {/* Profile Settings */}
            <div className="w-full max-w-[300px] flex flex-col pl-14">
              <div className="flex flex-col pb-6 border-b border-neutral-200">
                <Image
                  src={data.getUser.photo || ""}
                  alt="Profile image"
                  width={100}
                  height={100}
                  className="rounded-3xl selection:bg-transparent -mt-20"
                />
                <h1 className="text-lg font-semibold mt-4">
                  {session?.user?.name}
                </h1>
                <h4 className="text-sm text-[#717171]">
                  {session?.user?.email}
                </h4>
                <Link
                  href={"/profile"}
                  className="rounded-full px-2 py-1 text-sm border border-[#f1656a] text-[#f1656a] text-center mt-4 max-w-[100px] cursor-pointer transitiona-all duration-300 hover:bg-[#f1656a] hover:text-white"
                >
                  Editar
                </Link>
              </div>

              <ul className="mt-6 list-none flex flex-col gap-3 pb-6 border-b border-neutral-200">
                <li
                  className="text-sm text-[#717171] cursor-pointer"
                  onClick={() => setEditBio(true)}
                >
                  Adicionar Bio
                </li>
                <Link
                  href={"/home/createRecipe"}
                  className="text-sm text-[#717171] cursor-pointer"
                >
                  Adicionar Receita
                </Link>
                <Link
                  href={"/profile/createdRecipes"}
                  className="text-sm text-[#717171] cursor-pointer"
                >
                  Receitas criadas
                </Link>
                <Link
                  href={"/profile/favouritesRecipes"}
                  className="text-sm text-[#717171] cursor-pointer"
                >
                  Receitas Favoritas
                </Link>
              </ul>

              <div className="mt-6">
                <h1 className="font-semibold">Últimas curtidas</h1>
                <ul className="list-none flex flex-col gap-3 mt-6">
                  <li className="text-sm text-[#717171] cursor-pointer">
                    Adicionar Bio
                  </li>
                  <Link
                    href={"/home/createRecipe"}
                    className="text-sm text-[#717171] cursor-pointer"
                  >
                    Adicionar Receita
                  </Link>
                  <Link
                    href={"/profile/myAvaliations"}
                    className="text-sm text-[#717171] cursor-pointer"
                  >
                    Minhas avaliações
                  </Link>
                  <Link
                    href={"/profile"}
                    className="text-sm text-[#717171] cursor-pointer"
                  >
                    Compartilhar meu Perfil
                  </Link>
                </ul>
              </div>
            </div>

            <div className="w-full">{children}</div>
          </div>
        </div>

        {editBio && <UserBio editState={setEditBio} />}
      </div>
    )
  );
};

export default MainProfile;
