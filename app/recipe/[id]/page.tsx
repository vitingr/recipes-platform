"use client"

import Loader from '@/components/Loader'
import { GET_RECIPE_DATA } from '@/graphql/queries'
import { infoUser } from '@/utils/common/userContext'
import { useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoChevronForward } from "react-icons/io5";
import { BiBowlHot } from "react-icons/bi";
import { MdWhatsapp, MdFacebook } from "react-icons/md";
import { AiOutlineInstagram, AiOutlineLink } from "react-icons/ai";

const page = () => {

  // Get User Data
  const { data: session, status } = useSession()
  const { data, getUserInfo } = infoUser()

  const pathname = usePathname().split("/")
  const query = pathname[2]

  const [comment, setComment] = useState<string>("")

  // Get Recipe Data
  const { data: recipeData, loading: recipeLoading, refetch: refetchRecipe } = useQuery(GET_RECIPE_DATA, {
    variables: {
      id: query
    },
    skip: !query
  })

  useEffect(() => {
    if (session?.user?.email !== undefined && status === "authenticated" && query !== undefined && recipeLoading === false) {
      console.log(recipeData)
      if (recipeData === undefined) {
        refetchRecipe()
      }
    }
  }, [session, query, recipeLoading])

  return session?.user?.email && recipeData ? (
    <div className='w-full sm:p-[5%] p-[2%] max-w-[1250px] flex flex-col bg-white rounded-xl shadow-sm shadow-neutral-200'>
      <section className='flex gap-2 items-center'>
        <span className='text-[#f1656a] text-sm cursor-pointer'>Home</span>
        <IoChevronForward size={13} className="gray-icon" />
        <span className='text-[#f1656a] text-sm cursor-pointer'>Receitas</span>
        <IoChevronForward size={13} className="gray-icon" />
        <span className='text-sm cursor-pointer'>{recipeData.recipe.title}</span>
      </section>

      <section className='w-full mt-[50px]'>
        <div className='flex gap-2 items-center'>
          <Image src={recipeData.recipe.creatorPhoto} alt='Creator Picture' width={35} height={35} className='rounded-full' />
          <div className='flex flex-col justify-center'>
            <h2 className='transition-all duration-300 hover:text-[#f1656a] cursor-pointer'>Criado por {recipeData.recipe.creatorName}</h2>
            <p className='text-xs text-[#717171]'>{recipeData.recipe.creatorId}</p>
          </div>
        </div>
        <p className='text-justify text-[#717171]'>{recipeData.recipe.description}</p>
      </section>

      <section className='w-full flex flex-col place-items-center mt-[50px] sm:mt-[25px]'>
        <h1 className='text-3xl font-semibold'>{recipeData.recipe.title}</h1>
        <h5 className='text-sm italic'>{recipeData.recipe.type || "teste"}</h5>
      </section>

      <section className='mt-[3em]'>
        <h1 className='text-xl font-semibold mt-[2em]'>Fotos</h1>
        <Image src={recipeData.recipe.photo} alt='Recipe Photo' width={100} height={100} className='w-full h-full max-w-[100px] max-h-[100px] rounded-lg cursor-zoom-in transition-all duration-300 hover:scale-105' />
      </section>

      <section className='mt-[1em]'>
        <h1 className='text-xl font-semibold mt-[2em]'>Ingredientes</h1>
        <div className='flex flex-col mt-4'>
          {recipeData.recipe.ingredients.map((ingredient: string, index: number) => (
            <div key={index} className='flex gap-2'>
              <BiBowlHot size={17} className="gray-icon" />
              <p className='text-[#717171]'>{ingredient}</p>
            </div>
          ))}
        </div>

        <h1 className='text-xl font-semibold mt-[2em]'>Modo de Preparo</h1>
        <div className='flex flex-col mt-4 max-w-[500px]'>
          {recipeData.recipe.methods.map((step: string, index: number) => (
            <div key={index} className='py-4 mb-2 border-b border-neutral-100 flex gap-3 items-center'>
              <span className='rounded-full border border-[#f1656a] text-[#f1656a] w-5 h-5 flex items-center justify-center text-xs cursor-grab'>{index}</span>
              <p className='text-sm text-[#717171]'>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='mt-[5em] flex gap-4 justify-between'>
        <h1 className='text-xl font-semibold w-full'>Compartilhe essa Receita</h1>
        <div className='flex gap-4 w-full justify-end'>
          <MdWhatsapp size={22} className="gray-icon-animated cursor-pointer" />
          <MdFacebook size={22} className="gray-icon-animated cursor-pointer" />
          <AiOutlineInstagram size={22} className="gray-icon-animated cursor-pointer" />
          <AiOutlineLink size={22} className="gray-icon-animated cursor-pointer" />
        </div>
      </section>

      <section className='mt-[1em] flex flex-col items-center'>
        <h2 className='text-xl font-semibold text-center pt-[3em] mt-[3em] border-t border-neutral-200 w-full'>Comentários</h2>
        <textarea name="comment" id="comment" cols={5} rows={2} className='resize-none mt-[3em] w-full outline-none py-3 px-6 border border-neutral-200 rounded-xl text-[#717171] mb-8' autoComplete='off' placeholder='Digite algo sobre essa receita' onChange={(e) => setComment(e.target.value)}></textarea>
      </section>
    </div>
  ) : (
    <Loader />
  )
}

export default page