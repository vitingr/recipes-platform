"use client";

import Loader from "@/components/Loader";
import { GET_RECIPE_COMMENTS, GET_RECIPE_DATA } from "@/graphql/queries";
import { infoUser } from "@/utils/common/userContext";
import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import { BiBowlHot } from "react-icons/bi";
import { MdWhatsapp, MdFacebook } from "react-icons/md";
import { AiOutlineInstagram, AiOutlineLink } from "react-icons/ai";
import ToastMessage from "@/components/config/ToastMessage";
import { toast } from "react-toastify";
import {
  CREATE_COMMENT,
  DISLIKE_RECIPE,
  LIKE_RECIPE,
} from "@/graphql/mutations";
import Comment from "@/components/Comment";
import { CommentProps } from "@/types";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import ExpandImage from "@/components/ExpandImage";

const page = () => {
  // Get User Data
  const { data: session, status } = useSession();
  const { data, getUserInfo } = infoUser();

  const pathname = usePathname().split("/");
  const query = pathname[2];

  const [comment, setComment] = useState<string>("");
  const [expandImage, setExpandImage] = useState<boolean>(false);

  // Like and Dislike Recipe Query
  const [likeRecipe] = useMutation(LIKE_RECIPE);
  const [dislikeRecipe] = useMutation(DISLIKE_RECIPE);

  // Get Recipe Data Query
  const {
    data: recipeData,
    loading: recipeLoading,
    refetch: refetchRecipe,
  } = useQuery(GET_RECIPE_DATA, {
    variables: {
      id: query,
    },
    skip: !query,
  });

  // Get Commentaries Data Query
  const {
    data: recipeComments,
    loading: commentsLoading,
    refetch: refetchComments,
  } = useQuery(GET_RECIPE_COMMENTS, {
    variables: {
      id: query,
    },
    skip: !query,
  });

  // Create Comment Query
  const [createComment] = useMutation(CREATE_COMMENT);

  const createNewComment = async () => {
    try {
      if (comment != "") {
        await createComment({
          variables: {
            recipeId: query,
            creatorId: data.getUser.id,
            creatorPhoto: data.getUser.photo,
            creatorName: data.getUser.name,
            content: comment,
          },
        });
        await refetchComments();
        setComment("");
        toast.success("Seu comentário foi adicionado à essa receita");
      } else {
        toast.error("É necessário digitar algo para publicar um comentário");
      }
    } catch (error) {
      toast.error(
        "Não foi possível adicionar o comentário, tente novamente mais tarde."
      );
    }
  };

  const handleLikeRecipe = async () => {
    try {
      await likeRecipe({
        variables: {
          userId: data.getUser.id,
          recipeId: recipeData.recipe.id,
        },
      });
      await refetchRecipe();
    } catch (error) {
      toast.error("Não foi possível favoritar essa receita!");
    }
  };

  const handleDislikeRecipe = async () => {
    try {
      await dislikeRecipe({
        variables: {
          userId: data.getUser.id,
          recipeId: recipeData.recipe.id,
        },
      });
      await refetchRecipe();
    } catch (error) {
      toast.error("Não foi possível remover essa receita dos salvos!");
    }
  };

  useEffect(() => {
    if (
      session?.user?.email !== undefined &&
      status === "authenticated" &&
      query !== undefined &&
      recipeLoading === false &&
      commentsLoading === false
    ) {
      if (recipeData === undefined) {
        refetchRecipe();
      }
    }
  }, [session, query, recipeLoading]);

  return session?.user?.email && recipeData && recipeData.recipe ? (
    <div className="w-full sm:p-[5%] p-[2%] max-w-[1250px] flex flex-col bg-white rounded-xl shadow-sm shadow-neutral-200">
      <ToastMessage />
      <section className="flex gap-2 items-center">
        <span className="text-[#f1656a] text-sm cursor-pointer">Home</span>
        <IoChevronForward size={13} className="gray-icon" />
        <span className="text-[#f1656a] text-sm cursor-pointer">Receitas</span>
        <IoChevronForward size={13} className="gray-icon" />
        <span className="text-sm cursor-pointer">
          {recipeData.recipe.title}
        </span>
      </section>

      <section className="w-full mt-[50px]">
        <div className="flex gap-2 items-center">
          <Image
            src={recipeData.recipe.creatorPhoto}
            alt="Creator Picture"
            width={35}
            height={35}
            className="rounded-full"
          />
          <div className="flex flex-col justify-center">
            <h2 className="transition-all duration-300 hover:text-[#f1656a] cursor-pointer">
              Criado por {recipeData.recipe.creatorName}
            </h2>
            <p className="text-xs text-[#717171]">
              {recipeData.recipe.creatorId}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full flex justify-between items-center mt-[50px] sm:mt-[25px]">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-3xl font-semibold">{recipeData.recipe.title}</h1>
          <h5 className="text-sm italic">
            {recipeData.recipe.type || "teste"}
          </h5>
        </div>
        <div className="flex items-center">
          {recipeData.recipe.qtdLikes === 0 ? (
            <TiStarOutline
              size={25}
              className="gray-icon cursor-pointer"
              onClick={async () => {
                await handleLikeRecipe();
              }}
            />
          ) : (
            <>
              {recipeData.recipe &&
                recipeData.recipe.likes &&
                recipeData.recipe.likes.includes(data.getUser.id) && (
                  <TiStarFullOutline
                    size={25}
                    className="gold-icon cursor-pointer"
                    onClick={async () => {
                      await handleDislikeRecipe();
                    }}
                  />
                )}
            </>
          )}
        </div>
      </section>

      <section className="mt-[2em]">
        <h1 className="text-xl font-semibold mt-[2em] w-full py-2 bg-[#fafafa] border border-neutral-200 px-4">
          Informações
        </h1>
        <div className="flex justify-between w-full gap-4 mt-6 p-4 sm:p-0">
          <Image
            src={recipeData.recipe.photo}
            alt="Recipe Photo"
            width={200}
            height={200}
            className="w-full h-full max-w-[150px] max-h-[150px] rounded-lg cursor-zoom-in transition-all duration-300 hover:scale-105 selection:bg-transparent"
            onClick={() => setExpandImage(!expandImage)}
          />
          <p className="text-justify text-[#717171]">
            {recipeData.recipe.description} Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Rerum impedit accusantium explicabo
            voluptas cupiditate vero! Reprehenderit voluptas enim, sapiente
            cumque similique in quidem. Atque asperiores minus incidunt sed a
            aspernatur.
          </p>
          {expandImage && (
            <ExpandImage
              image={recipeData.recipe.photo}
              state={setExpandImage}
            />
          )}
        </div>
      </section>

      <section className="mt-[1em] flex gap-6 justify-between flex-wrap sm:flex-wrap">
        <div className="w-full">
          <h1 className="text-xl font-semibold mt-[2em] w-full py-2 bg-[#fafafa] border border-neutral-200 px-4">
            Modo de Preparo
          </h1>
          <div className="flex flex-col mt-4 max-w-[500px] p-4 sm:p-0">
            {recipeData.recipe.methods.map((step: string, index: number) => (
              <div
                key={index}
                className="py-4 mb-2 border-b border-neutral-100 flex gap-3 items-center w-full"
              >
                <span className="rounded-full border border-[#f1656a] text-[#f1656a] w-5 h-5 flex items-center justify-center text-xs cursor-grab">
                  {index}
                </span>
                <p className="text-sm text-[#717171]">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-xl font-semibold mt-[2em] w-full py-2 bg-[#fafafa] border border-neutral-200 px-4">
            Ingredientes
          </h1>
          <div className="flex flex-col mt-4 gap-2 p-4 sm:p-0">
            {recipeData.recipe.ingredients.map(
              (ingredient: string, index: number) => (
                <div key={index} className="w-full">
                  {ingredient != "" && (
                    <div className="flex gap-2 py-2 mb-2 border-b border-neutral-100 w-full">
                      <BiBowlHot size={17} className="gray-icon" />
                      <p className="text-[#717171] text-sm">{ingredient}</p>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="mt-[5em] flex gap-4 flex-col sm:flex-row sm:justify-between">
        <h1 className="text-xl font-semibold w-full">
          Compartilhe essa Receita
        </h1>
        <div className="flex gap-4 w-full sm:justify-end">
          <MdWhatsapp size={22} className="gray-icon-animated cursor-pointer" />
          <MdFacebook size={22} className="gray-icon-animated cursor-pointer" />
          <AiOutlineInstagram
            size={22}
            className="gray-icon-animated cursor-pointer"
          />
          <AiOutlineLink
            size={22}
            className="gray-icon-animated cursor-pointer"
          />
        </div>
      </section>

      <section className="mt-[1em] flex flex-col items-center">
        <h2 className="text-xl font-semibold text-center pt-[3em] mt-[3em] w-full mb-12 sm:mb-0">
          Comentários
        </h2>

        {recipeComments &&
          recipeComments.findRecipeCommentaries &&
          recipeComments.findRecipeCommentaries.map(
            (comment: CommentProps, index: number) => (
              <Comment comment={comment} key={index} />
            )
          )}

        <form
          onSubmit={async (e: React.SyntheticEvent) => {
            e.preventDefault();
            await createNewComment();
          }}
          className="w-full"
        >
          <textarea
            name="comment"
            id="comment"
            cols={5}
            rows={2}
            value={comment}
            className="resize-none mt-[3em] w-full outline-none py-3 px-6 border border-neutral-200 rounded-xl text-[#717171] mb-8"
            autoComplete="off"
            placeholder="Digite algo sobre essa receita"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="mr-2 text-white bg-[#f1656a] rounded-full px-4 py-1"
            >
              Publicar
            </button>
          </div>
        </form>
      </section>
    </div>
  ) : (
    <Loader />
  );
};

export default page;
