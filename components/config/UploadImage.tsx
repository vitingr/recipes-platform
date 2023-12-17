"use client"

import { UploadProps } from '@/types'
import React, { ChangeEvent, useState } from 'react'
import Popup from '../Popup'

const UploadImage = ({ setState, currentFoto, text }: UploadProps) => {

  const [image, setImage] = useState<string>("")

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {

    e.preventDefault()

    const file = e.target.files?.[0]

    if (!file) return

    if (!file.type.includes("image")) {
      alert("Só é possível enviar imagens")
      return
    }

    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      setState(result)
      setImage(result)
    }
  }

  return (
    <Popup title='Enviar Imagem'>
      <div className='w-full h-[300px] border border-dashed border-neutral-300 p-6 mt-10 flex flex-col items-center justify-center'>
        {!image ? (
          <label htmlFor="image">{text}</label>
        ) : (
          <img className='w-full max-h-[300px]' src={image} alt="Image" />
        )}
        <input type="file" name="image" id="image" accept='image/*' onChange={(e) => handleChangeImage(e)} className='absolute z-30 w-[500px] opacity-0 h-[400px] cursor-pointer' />
      </div>
    </Popup>
  )
}

export default UploadImage