"use client";

import SwiperRecipes from "@/components/config/SwiperRecipes";
import ToastMessage from "@/components/config/ToastMessage";
import { GET_ALL_RECIPES } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");

  // Search Recipe Function
  const handleSearchRecipe = async () => {
    try {
      if (search !== "") {
        router.push(`/home/search/${search}`);
      } else {
        toast.error("Primeiramente digite algo para buscar");
      }
    } catch (error) {
      toast.error("Não foi possível retornar um resultado para a sua busca");
    }
  };

  // Get Recipe Data Queries
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
    if (recipeLoading === false) {
      getAllRecipes();
      console.log(recipeData);
    }
  }, [recipeLoading]);

  return (
    <div className="min-h-[62vh] w-full flex flex-col items-center">
      <ToastMessage />
      <section className="w-full max-w-[750px] bg-[#f1f2f4] p-6 rounded-xl flex gap-6 sm:flex-nowrap flex-wrap">
        <Image
          src={"/assets/image.jpg"}
          alt="main image"
          className="selection:bg-transparent"
          width={400}
          height={400}
        />
        <div className="mt-4">
          <h2 className="uppercase">DESERT, DESERT, DESERT, VEGETARIAN</h2>
          <h1 className="cursive text-4xl mt-10">
            Bangkok Coconut and Strawberry Cake Recipe
          </h1>
          <p className="text-[#717171] mt-10 text-justify">
            The literal translantion of Nicié Goreng is "fried rice" in
            indonesian and Malasyians - and that's exactly what it is! It's
            mainly rice with just a little bit of meat and just onion for the
            vegetables. The thing that distinguishes it from other Fried Rice
            dishes is the sauce which is made with kecap manis.
          </p>
          <div className="py-2 mt-20 text-[#f1656a] w-full text-center cursor-pointer">
            Ver mais
          </div>
        </div>
      </section>

      <section className="w-full mt-[10em] flex flex-col items-center bg-white max-w-[1350px] p-[2%] sm:p-[5%]">
        <h1 className="text-4xl font-bold text-center">
          O que você está procurando?
        </h1>
        <p className="sm:text-xl text-lg mt-2 text-[#717171] text-center">
          Procure por aqui qual é a receita do seu prato favorito
        </p>
        <form className="flex justify-between items-center sm:gap-8 gap-4 sm:w-[550px] w-[350px] mt-20 p-6 border boder-neutral-200 rounded-xl">
          <form
            onSubmit={async (e: React.SyntheticEvent) => {
              e.preventDefault();
              await handleSearchRecipe();
            }}
            className="flex items-center w-full gap-4"
          >
            <IoSearch
              size={20}
              className="gray-icon cursor-pointer"
              onClick={() => handleSearchRecipe()}
            />
            <input
              type="text"
              name="search"
              id="search"
              className="w-full outline-none border-b border-neutral-200 py-1 px-2 text-sm"
              placeholder="Busque uma receita aqui"
              maxLength={60}
              minLength={2}
              autoComplete="off"
            />
          </form>
          <button className="sm:text-base text-sm px-2 py-1 sm:px-4 sm:py-2 w-[175px] bg-[#f1656a] text-white rounded-xl">
            Buscar Receita
          </button>
        </form>
      </section>

      <section className="pt-20 mt-20 border-t border-neutral-200 mb-20 w-full max-w-[1350px] p-[2%] sm:p-[5%]">
        <h1 className="text-3xl font-semibold">Como funciona</h1>
        <div className="flex w-full gap-10 justify-center mt-14 sm:flex-nowrap flex-wrap">
          <div className="p-6 rounded-xl bg-white shadow-neutral-200 shadow-sm max-w-[250px] w-full cursor-default">
            <Image
              src={"/assets/main1.png"}
              alt="Main Section Image"
              width={200}
              height={200}
              className="max-w-[200px] max-h-[200px] w-full h-full rounded-lg selection:bg-transparent"
            />
            <h1 className="text-xl font-semibold text-center mt-4">
              Escolha sua receita
            </h1>
            <p className="text-[#717171] text-sm text-center mt-2">
              Escolha uma das nossas magníficas receitas
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-neutral-200 shadow-sm max-w-[250px] w-full cursor-default">
            <Image
              src={"/assets/main2.png"}
              alt="Main Section Image"
              width={200}
              height={200}
              className="max-w-[200px] max-h-[200px] w-full h-full rounded-lg selection:bg-transparent"
            />
            <h1 className="text-xl font-semibold text-center mt-4">
              Escolha sua receita
            </h1>
            <p className="text-[#717171] text-sm text-center mt-2">
              Escolha uma das nossas magníficas receitas
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-neutral-200 shadow-sm max-w-[250px] w-full cursor-default">
            <Image
              src={"/assets/main3.png"}
              alt="Main Section Image"
              width={200}
              height={200}
              className="max-w-[200px] max-h-[200px] w-full h-full rounded-lg selection:bg-transparent"
            />
            <h1 className="text-xl font-semibold text-center mt-4">
              Escolha sua receita
            </h1>
            <p className="text-[#717171] text-sm text-center mt-2">
              Escolha uma das nossas magníficas receitas
            </p>
          </div>
        </div>
      </section>

      <div className="custom-shape-divider-bottom-1703340920">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <section className="flex items-center justify-center pt-20 mb-20 p-10 w-full min-h-[62vh] bg-cover bg-center bg-no-repeat bg-[#f6f6f6]">
        <div className="w-full flex justify-center max-w-[850px] items-center sm:flex-nowrap flex-wrap">
          <Image
            src={"/assets/main4.png"}
            alt="Main Image"
            width={500}
            height={500}
            className="max-w-[500px] max-h-[500px] w-full h-full"
          />
          <div>
            <h1 className="text-3xl font-semibold">
              We Deliver Anywhere in the Tri-State Area
            </h1>
            <p className="mt-6 text-[#717171] text-justify">
              Each Freshly meal is perfectly sized for 1 person to enjoy at 1
              sitting. Our fully-prepared meals a re delivered fresh, and ready
              to eat in 3 minutes
            </p>
            <p className="mt-6 italic">Nossas receitas são incríveis</p>
            <div className="flex gap-6 items-center justify-between mt-10 w-full pb-14">
              <div className="bg-[#f1656a] text-white p-3 rounded-xl w-full text-center cursor-pointer">
                Contact Us
              </div>
              <div className="border border-neutral-600 text-neutral-600 p-3 rounded-xl w-full text-center cursor-pointer">
                View Menu
              </div>
            </div>
          </div>
        </div>
        <div className="shapedividers_com-4841" />
      </section>
      <div className="custom-shape-divider-top-1703340812 sm:block hidden">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

      <section className="pt-20 mt-20 border-t border-neutral-200 mb-20 w-full p-[2%] sm:p-[5%] max-w-[1350px]">
        <h1 className="text-3xl font-semibold">Receitas do momento</h1>
        {recipeData && recipeData.recipes && (
          <SwiperRecipes recipes={recipeData.recipes} />
        )}
      </section>
    </div>
  );
}
