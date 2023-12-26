"use client";

import MainProfile from "@/components/Profile/MainProfile";
import ToastMessage from "@/components/config/ToastMessage";
import UploadImage from "@/components/config/UploadImage";
import { UPDATE_USER_INFO } from "@/graphql/mutations";
import { infoUser } from "@/utils/common/userContext";
import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const { data: session, status } = useSession();
  const { data, getUserInfo } = infoUser();

  // Update Info States  
  const [userPhoto, setUserPhoto] = useState<string>(data.getUser.photo || "");
  const [changeUserPhoto, setChangeUserPhoto] = useState<boolean>(false);

  const [firstname, setFirstname] = useState<string>(
    data.getUser.firstname || ""
  );
  const [lastname, setLastname] = useState<string>(data.getUser.lastname || "");

  const [bio, setBio] = useState<string>(data.getUser.bio || "");

  // Edit User Profile Info Function
  const [updateUserInfo] = useMutation(UPDATE_USER_INFO);
  
  const editProfileInfo = async () => {
    try {
      if (firstname !== "" && lastname !== "" && userPhoto !== "" && data.getUser.id !== undefined) {
        await updateUserInfo({
          variables: {
            id: data.getUser.id,
            firstname: firstname,
            lastname: lastname,
            name: `${firstname} ${lastname}`,
            bio: bio,
            photo: userPhoto
          }
        })
        await getUserInfo()
        toast.success("Seu perfil foi atualizado")
      }
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
          className="flex flex-col gap-2 w-full"
        >
          <div className="w-full flex justify-between gap-10 items-center">
            <Image
              src={userPhoto}
              alt="User Profile Photo"
              width={60}
              height={60}
              className="rounded-full cursor-pointer w-[60px] h-[60px]"
            />
            <div
              className="w-full text-[#f1656a] border border-[#f1656a] text-sm py-2 rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => setChangeUserPhoto(!changeUserPhoto)}
            >
              Editar Foto de Perfil
            </div>
          </div>

          {changeUserPhoto && (
            <UploadImage
              currentFoto=""
              show={setChangeUserPhoto}
              setState={setUserPhoto}
              text="Envie uma imagem para o seu perfil"
            />
          )}

          <div className="w-full flex justify-between gap-6 mt-10">
            <div className="w-full flex flex-col">
              <label htmlFor="firstname">Primeiro nome</label>
              <input
                defaultValue={firstname}
                type="text"
                name="firstname"
                id="firstname"
                className="w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8"
                autoComplete="off"
                placeholder="Seu primeiro nome"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>

            <div className="w-full flex flex-col">
              <label htmlFor="lastname">Sobrenome</label>
              <input
                defaultValue={lastname}
                type="text"
                name="lastname"
                id="lastname"
                className="w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8"
                autoComplete="off"
                placeholder="Seu sobrenome"
                onChange={(e) => setLastname(e.target.value)}
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
              defaultValue={bio || ""}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Digite algo relevante sobre você"
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
