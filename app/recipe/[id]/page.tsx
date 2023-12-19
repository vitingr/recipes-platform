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
        refetchRecipe
      }
    }
  }, [session, query, recipeLoading])

  return session?.user?.email && recipeData ? (
    <div className='w-full sm:p-[5%] p-[2%] max-w-[1250px] flex flex-col'>
      <section className='flex gap-2 items-center'>
        <span className='text-[#f1656a] text-sm'>Home</span>
        <IoChevronForward size={13} className="gray-icon" />
        <span className='text-[#f1656a] text-sm'>Receitas</span>
        <IoChevronForward size={13} className="gray-icon" />
        <span className='text-sm'>{recipeData.recipe.title}</span>
      </section>

      <section className='w-full flex flex-col place-items-center mt-[75px]'>
        <h1 className='text-3xl font-semibold'>{recipeData.recipe.title}</h1>
        <h5 className='text-sm italic'>{recipeData.recipe.type || "teste"}</h5>
      </section>

      {/* FOTINHA DA RECEITA DE CRIA */}

      <section className='w-full'>
        <div className='flex gap-2 items-center'>
          <Image src={recipeData.recipe.creatorPhoto} alt='Creator Picture' width={35} height={35} className='rounded-full' />
          <div className='flex flex-col justify-center'>
            <h2 className='transition-all duration-300 hover:text-[#f1656a] cursor-pointer'>Criado por {recipeData.recipe.creatorName}</h2>
            <p className='text-xs text-[#717171]'>{recipeData.recipe.creatorId}</p>
          </div>
        </div>
        <p className='text-justify text-[#717171]'>{recipeData.recipe.description}</p>
      </section>

      <section className='mt-[5em]'>
        <h1 className='text-xl font-semibold mt-[2em]'>Ingredientes</h1>
        {recipeData.recipe.ingredients((ingredient: string, index: number) => (
          <div key={index}>
            teste
          </div>
        ))}

        <h1 className='text-xl font-semibold mt-[2em]'>Instruções</h1>
        {recipeData.recipe.methods.map((method: string, index: number) => (
          <div key={index}>
            teste
          </div>
        ))}
      </section>

      <section className='mt-[5em]'>
        {/* SEÇÃO DE COMPARTILHAR, FAVORITAR, ETC... */}
      </section>

      <section className='mt-[7em] flex flex-col items-center'>
        <h2 className='text-xl font-semibold text-center'>Comentários</h2>
        <textarea name="comment" id="comment" cols={5} rows={2} className='resize-none mt-[3em] w-full outline-none py-3 px-6 border border-neutral-200 rounded-xl text-[#717171] mb-8' autoComplete='off' placeholder='Digite algo sobre essa receita' onChange={(e) => setComment(e.target.value)}></textarea>
      </section>
    </div>
  ) : (
    <Loader />
  )
}

export default page