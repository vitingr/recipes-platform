import React from 'react'
import Popup from './Popup'
import Image from 'next/image';

type ExpandImage = {
  image: string;
  state: any;
}

const ExpandImage = ({ image, state } : ExpandImage) => {
  return (
    <Popup title='Imagem Ampliada' state={state} >
      <div className='w-full flex justify-center items-center'>
      <Image src={image} alt='Recipe Image' width={500} height={500} className='w-full h-full max-w-[500px] max-h-[500px] object-contain rounded-lg mt-12' />
      </div>
    </Popup>
  )
}

export default ExpandImage