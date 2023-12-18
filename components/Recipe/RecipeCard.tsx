import { RecipeProps } from '@/types'
import React from 'react'
import { TiStarFullOutline } from 'react-icons/ti'

const RecipeCard = ({ content }: { content: RecipeProps }) => {
  return (
    <div className='w-[250px] h-[325px] bg-white p-2 border border-neutral-200 rounded-xl cursor-pointer'>
      <div className='w-full h-[75px] rounded-lg bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${content.photo})` }} />
      <div className='mt-2 p-4 break-all'>
        <h1 className='text-center font-semibold uppercase'>{content.title}</h1>
        <div className='flex justify-center gap-1'>
          <TiStarFullOutline size={12} className="gray-icon" />
          <p className='text-xs'>{content.qtdLikes} curtidas</p>
        </div>
        <p className='text-sm text-[#717171] mt-4 text-center mb-6'>{content.description || "ojdwodjwodwjodwjodwjodwjodwjodwjodwjodwjodwjodwjodwjodwjodwjodwjdowjdwodjwodjwdowjdow"}</p>
        <div className='flex flex-col gap-1'>
          <span className='text-[#717171] text-xs'>
            {content.ingredients.length > 0 ? `* ${content.ingredients.length} ingrediente` : `* ${content.ingredients.length} ingredientes`}
          </span>
          <span className='text-[#717171] text-xs'>
            {content.methods.length > 0 ? `* ${content.methods.length} etapa` : `* ${content.methods.length} etapas`}
          </span>
        </div>
        <button className='text-white bg-[#f1656a] w-full rounded-lg py-1 text-sm mt-6'>
          Ver Receita
        </button>
      </div>
    </div>
  )
}

export default RecipeCard