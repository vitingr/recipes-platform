import { RecipeProps } from '@/types'
import React from 'react'

const Recipe = ({ recipe }: { recipe: RecipeProps }) => {
  return (
    <div>
      {JSON.stringify(recipe)}
    </div>
  )
}

export default Recipe