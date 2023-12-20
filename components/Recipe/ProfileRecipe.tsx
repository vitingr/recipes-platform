import { RecipeProps } from '@/types'
import Link from 'next/link'
import React from 'react'
import { TiStarFullOutline } from 'react-icons/ti'

const ProfileRecipe = ({ recipe }: { recipe: RecipeProps }) => {
  return (
    <div className='shadow-sm shadow-neutral-400 w-[275px] h-[300px] rounded-xl'>
      <div style={{ backgroundImage: `url(${recipe.photo})` }} className='w-full h-[100px] bg-cover bg-no-repeat rounded-t-xl bg-center'>
      </div>
      <div className='p-4'>
        <h1 className='text-center text-lg font-semibold'>{recipe.title}</h1>
        <div className='w-full flex gap-1 justify-center mt-2 items-center'>
          <TiStarFullOutline size={16} className="gold-icon" />
          <span className='text-sm'>{recipe.qtdLikes}</span>
        </div>
        <p className='text-center text-sm text-[#717171] mt-6'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente molestiae reprehenderit earum nisi
        </p>
        <Link href={`/recipe/${recipe.id}`} className='w-full flex justify-center mt-6 text-sm cursor-pointer text-[#f1656a]'>
          Ver receita
        </Link>
      </div>
    </div>
  )
}

export default ProfileRecipe