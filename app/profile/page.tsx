"use client";

import Popup from "@/components/Popup";
import UserBio from "@/components/Popups/UserBio";
import MainProfile from "@/components/Profile/MainProfile";
import ProfileRecipe from "@/components/Recipe/ProfileRecipe";
import ToastMessage from "@/components/config/ToastMessage";
import { GET_USER_CREATED_RECIPES } from "@/graphql/queries";
import { RecipeProps } from "@/types";
import { infoUser } from "@/utils/common/userContext";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { toast } from "react-toastify";

const page = () => {
  const { data: session, status } = useSession();
  const { data } = infoUser();

  const [bio, setBio] = useState<string>("");

  // Edit User Profile Info Function
  const editProfileInfo = async () => {
    try {
      console.log("Profile edited");
    } catch (error) {
      toast.error(
        "Não foi possível editar as informações do Perfil do usuário!"
      );
    }
  };

  return (
    <MainProfile>
      <ToastMessage />
      <h1 className="mb-8 mt-4 text-2xl font-semibold cursor-default transition-all duration-300 hover:text-[#f1656a]">
        Informações Pessoais
      </h1>
      <div className="w-full flex justify-center items-center">
        <form
          onSubmit={async (e: React.SyntheticEvent) => {
            e.preventDefault();
            await editProfileInfo();
          }}
          className="flex justify-center flex-wrap gap-2 w-full"
        >
          <div className="w-full flex justify-between gap-6">
            <div className="w-full flex flex-col">
              <label htmlFor="firstname">Primeiro nome</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                className="w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8"
                autoComplete="off"
                placeholder="Seu primeiro nome"
              />
            </div>

            <div className="w-full flex flex-col">
              <label htmlFor="lastname">Sobrenome</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8"
                autoComplete="off"
                placeholder="Seu sobrenome"
              />
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="bio">Bio do Perfil</label>
            <textarea
              name="bio"
              id="bio"
              cols={32}
              rows={10}
              className="w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-300 rounded-lg text-[#717171] mt-1  mb-8 resize-none"
              autoComplete="off"
              value={data.getUser.bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Digite algo relevante sobre você"
              defaultValue={data.getUser.bio}
            ></textarea>
          </div>

          <button className="w-full bg-[#f1656a] text-white py-3 px-4 rounded-xl max-w-[800px]">
            Editar Informações
          </button>
        </form>
      </div>
    </MainProfile>
  );
};

export default page;
