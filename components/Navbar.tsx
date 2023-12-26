"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  IoMenuOutline,
  IoTicketOutline,
  IoSettingsOutline,
  IoStorefrontOutline,
  IoAdd,
  IoHomeOutline,
} from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { RiShakeHandsLine } from "react-icons/ri";
import { BsTicketPerforated } from "react-icons/bs";
import { VscSignOut } from "react-icons/vsc";
import { infoUser } from "@/utils/common/userContext";
import { BsPerson } from "react-icons/bs";
import { GoSearch } from "react-icons/go";

const Navbar = () => {
  const { data: session } = useSession();
  const { data } = infoUser();

  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <header className="w-full bg-white p-6 fixed flex justify-center selection:text-white selection:bg-[#f1656a]">
      <nav className="w-full max-w-[1600px] flex justify-around gap-2 items-center">
        <Image
          src={"/assets/logo.png"}
          alt="logo"
          width={120}
          height={60}
          className="selection:bg-transparent cursor-pointer"
        />

        <ul className="sm:flex justify-center items-center gap-16 hidden">
          <Link href={"/"}>
            <li className="duration-300 transition-all hover:text-[#3e3e3e] text-[#717171]">
              Início
            </li>
          </Link>
          <Link href={"/home"}>
            <li className="duration-300 transition-all hover:text-[#3e3e3e] text-[#717171]">
              Receitas
            </li>
          </Link>
          <Link href={"/profile/partner"}>
            <li className="duration-300 transition-all hover:text-[#3e3e3e] text-[#717171]">
              Seja Parceiro
            </li>
          </Link>
          <Link href={"/about"}>
            <li className="duration-300 transition-all hover:text-[#3e3e3e] text-[#717171]">
              Sobre
            </li>
          </Link>
          <Link href={"/"}>
            <li className="duration-300 transition-all hover:text-[#3e3e3e] text-[#717171]">
              Contatos
            </li>
          </Link>
        </ul>

        {session?.user?.email ? (
          <div className="flex gap-8 items-center">
            <GoSearch size={22.5} className="cursor-pointer gray-icon" />
            <Link href={"/profile"}>
              <BsPerson size={22.5} className="cursor-pointer gray-icon" />
              {/* <Image
                src={session?.user?.image || ""}
                alt="Profile Image"
                width={40}
                height={40}
                className="rounded-full cursor-pointer selection:bg-transparent"
              /> */}
            </Link>
            <IoMenuOutline
              size={22.5}
              className="cursor-pointer gray-icon"
              onClick={() => setShowMenu(!showMenu)}
            />
            {/* <button onClick={() => signOut()} className='py-2 text-sm text-[#f1656a] border border-[#f1656a] rounded-xl w-[100px]'>Sair</button> */}
          </div>
        ) : (
          <div className="flex gap-8">
            <button
              onClick={() => signIn()}
              className="py-2 text-sm bg-[#f1656a] text-white rounded-xl w-[100px]"
            >
              Entrar
            </button>
            <button
              onClick={() => signIn()}
              className="py-2 text-sm text-[#f1656a] border border-[#f1656a] rounded-xl w-[100px]"
            >
              Cadastrar
            </button>
          </div>
        )}

        {showMenu ? (
          <div className="z-20 fixed right-0 bg-[#fff] shadow-md h-[650px] w-[350px] border border-[#f7f7f7] translate-y-2 transition-all rounded-lg sm:mt-[700px] mt-[650px] lg:left-[64%]">
            <div className="p-10">    
              <h1 className="text-3xl font-bold text-center">
                Olá, {session?.user?.name}
              </h1>
            </div>
            <div className="w-full flex gap-4 p-6 bg-[#f7f7f7] items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/6075/6075725.png"
                className="w-[50px] h-[50px] selection:bg-transparent"
                alt="Cellphone Image"
              />
              <div>
                <h4 className="text-sm font-bold">Baixe suas receitas</h4>
                <p className="text-sm text-[#717171]">
                  Baixe as suas receitas favoritas no seu celular, para
                  acessá-las quando desejar, sem precisar de internet.
                </p>
                <h2 className="mt-6 text-[#f1656a] font-bold text-sm">
                  Ativar
                </h2>
              </div>
            </div>
            <div className="p-10 gap-8 w-full flex flex-col">
              <Link
                href={"/"}
                className="flex w-full justify-between items-center gap-8 cursor-pointer"
                id="home"
              >
                <IoHomeOutline size={30} className="gray-icon" />
                <h3 className="text-[#717171] w-full text-lg">Início</h3>
              </Link>
              <Link
                href={"/home"}
                className="flex w-full justify-between items-center gap-8 cursor-pointer"
                id="purchases"
              >
                <IoTicketOutline size={30} className="gray-icon" />
                <h3 className="text-[#717171] w-full text-lg">
                  Explorar Receitas
                </h3>
              </Link>
              <Link
                href={"/profile/favouritesRecipes"}
                className="flex w-full justify-between items-center gap-8 cursor-pointer"
                id="coupons"
              >
                <AiOutlineHeart size={30} className="gray-icon" />
                <h3 className="text-[#717171] w-full text-lg">
                  Receitas Favoritas
                </h3>
              </Link>
              {data.getUser.partner ? (
                <Link
                  href="/home/createRecipe"
                  className="flex w-full justify-between items-center gap-8 cursor-pointer"
                >
                  <IoAdd size={30} className="gray-icon" />
                  <h3 className="text-[#717171] w-full text-lg">
                    Adicionar uma Receita
                  </h3>
                </Link>
              ) : (
                <Link
                  href="/profile/partner"
                  className="flex w-full justify-between items-center gap-8 cursor-pointer"
                >
                  <RiShakeHandsLine size={30} className="gray-icon" />
                  <h3 className="text-[#717171] w-full text-lg">
                    Quero ser Parceiro
                  </h3>
                </Link>
              )}
              <Link
                href={"/profile"}
                className="flex w-full justify-between items-center gap-8 cursor-pointer"
                id="profile"
              >
                <IoSettingsOutline size={30} className="gray-icon" />
                <h3 className="text-[#717171] w-full text-lg">Meu Perfil</h3>
              </Link>
              <div
                className="flex w-full justify-between items-center gap-8 cursor-pointer"
                onClick={() => signOut()}
              >
                <VscSignOut size={30} className="gray-icon" />
                <h3 className="text-[#717171] w-full text-lg">Sair</h3>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
