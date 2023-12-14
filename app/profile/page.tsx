"use client"

import { infoUser } from '@/utils/common/userContext';
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { TiStarFullOutline } from "react-icons/ti";

const page = () => {

  const { data: session } = useSession()

  const {data} = infoUser()

  return (
    <div className='w-full sm:p-[5%] p-[2%] max-w-[1850px] flex flex-col items-center'>
      <div className='border border-neutral-200 shadow-sm max-w-[1850px] w-full rounded-xl'>
        {/* Profile background */}
        <div style={{ backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/006/879/154/large_2x/abstract-and-pattern-background-illustration-with-gradient-color-of-violet-this-luxurious-background-is-suitable-for-presentation-poster-wallpaper-personal-website-ui-and-ux-experiences-etc-free-photo.jpg")` }} className='w-full h-[300px] bg-cover bg-no-repeat rounded-t-xl bg-center'>

        </div>

        {/* Profile Info */}
        <div className='flex gap-24 p-6'>

          {/* Profile Settings */}
          <div className='w-full max-w-[300px] flex flex-col pl-14'>
            <div className='flex flex-col pb-6 border-b border-neutral-200'>
              <Image src={session?.user?.image || ""} alt='Profile image' width={100} height={100} className='rounded-lg selection:bg-transparent -mt-20' />
              <h1 className='text-lg font-semibold mt-4'>{session?.user?.name}</h1>
              <h4 className='text-sm text-[#717171]'>{session?.user?.email}</h4>
              <div className='rounded-full px-2 py-1 text-sm border border-[#f1656a] text-[#f1656a] text-center mt-4 max-w-[100px] cursor-pointer transitiona-all duration-300 hover:bg-[#f1656a] hover:text-white'>
                Editar
              </div>
            </div>

            <ul className='mt-6 list-none flex flex-col gap-3 pb-6 border-b border-neutral-200'>
              <li className='text-sm text-[#717171] cursor-pointer'>Adicionar Bio</li>
              <li className='text-sm text-[#717171] cursor-pointer'>Adicionar Receita</li>
              <li className='text-sm text-[#717171] cursor-pointer'>Receitas criadas</li>
              <li className='text-sm text-[#717171] cursor-pointer'>Compartilhar Perfil</li>
            </ul>

            <div className='mt-6'>
              <h1 className='font-semibold'>Últimas curtidas</h1>
              <ul className='list-none flex flex-col gap-3 mt-6'>
                <li className='text-sm text-[#717171] cursor-pointer'>Adicionar Bio</li>
                <li className='text-sm text-[#717171] cursor-pointer'>Adicionar Receita</li>
                <li className='text-sm text-[#717171] cursor-pointer'>Receitas criadas</li>
                <li className='text-sm text-[#717171] cursor-pointer'>Compartilhar Perfil</li>
              </ul>
            </div>
          </div>

          {/* Profile Recipes */}
          <div className='w-full'>
            <h1 className='mb-16 mt-4 text-2xl font-semibold cursor-default transition-all duration-200 hover:text-[#f1656a]'>Minhas Receitas Favoritas</h1>
            <div className='flex flex-wrap gap-6 w-full'>
            <div className='shadow-sm shadow-neutral-400 w-[275px] h-[300px] rounded-xl'>
              <div style={{ backgroundImage: `url("https://www.receiteria.com.br/wp-content/uploads/receitas-de-sashimi-de-salmao-0.jpg")` }} className='w-full h-[100px] bg-cover bg-no-repeat rounded-t-xl bg-center'>
              </div>
              <div className='p-4'>
                <h1 className='text-center text-lg font-semibold'>Sashimi de Salmão</h1>
                <div className='w-full flex gap-1 justify-center mt-2 items-center'>
                  <TiStarFullOutline size={16} className="gold-icon" />
                  <span className='text-sm'>168</span>
                </div>
                <p className='text-center text-sm text-[#717171] mt-6'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente molestiae reprehenderit earum nisi
                </p>
                <Link href={"/"} className='w-full flex justify-center mt-6 text-sm cursor-pointer text-[#f1656a]'>
                  Ver receita
                </Link>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page