"use client"

import ToastMessage from '@/components/config/ToastMessage'
import UploadImage from '@/components/config/UploadImage'
import { CREATE_RECIPE } from '@/graphql/mutations'
import { infoUser } from '@/utils/common/userContext'
import { useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'

const page = () => {

  // Get User Info
  const { data } = infoUser()
  const { data: session, status } = useSession()
  const router = useRouter()

  const [sendImage, setSendImage] = useState<boolean>(false)

  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const [image, setImage] = useState<string>("")

  // Steps
  const [qtdIngredients, setQtdIngredients] = useState<number>(0)
  const [methodStep, setMethodStep] = useState<number>(0)

  // Method Steps
  const [firstStep, setFirstStep] = useState<string>("")
  const [secondStep, setSecondStep] = useState<string>("a")
  const [thirdStep, setThirdStep] = useState<string>("a")
  const [fourthStep, setFourthStep] = useState<string>("a")
  const [fifthStep, setFifthStep] = useState<string>("a")

  // Incrementing Functions
  const addNewMethodStep = async () => {
    const currentNumStep = methodStep
    setMethodStep(currentNumStep + 1)
  }

  // Create Recipe Function
  const [createRecipe] = useMutation(CREATE_RECIPE)

  const createNewRecipe = async () => {
    try {
      await createRecipe({
        variables: {
          title: title,
          description: description,
          ingredients: ["teste"],
          methods: [firstStep, secondStep, thirdStep, fourthStep, fifthStep],
          creatorId: data.getUser.id as string,
          creatorPhoto: data.getUser.photo  as string,
          creatorName: data.getUser.name as string,
          type: "teste",
          photo: "/assets/image.jpg",
        }
      })
      toast.success("Receita criada com sucesso!")
      router.push("/home")

    } catch (error) {
      console.log(error)
      toast.error("ERRO! Não foi possível adicionar a sua receita")
    }
  }

  return data.getUser.id ? (
    <div className='w-full sm:p-[5%] p-[2%] max-w-[1850px] flex flex-col items-center'>
      <ToastMessage />
      <h1 className='text-center text-3xl font-bold'>Adicionar uma Receita</h1>
      <form onSubmit={async (e: React.SyntheticEvent) => {
        e.preventDefault()
        await createNewRecipe()
      }} className='w-full mt-[75px] max-w-[1200px]'>

        <h2 className='w-full font-semibold text-xl mb-10'>Apresente sua Receita</h2>
        <div className='w-full flex justify-between gap-6 items-center'>
          <div className='w-[300px] p-6 border border-neutral-300 border-dashed h-[235px] flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-neutral-100 -mt-8' onClick={() => setSendImage(true)}>
            {sendImage ? (<UploadImage currentFoto='' setState={setImage} text='Envie uma imagem do seu prato' />) : (<></>)}
            <p className='text-neutral-400 text-sm'>Adicione uma foto da sua receita</p>
          </div>
          <div className='w-full'>
            <textarea name="descricao" id="descricao" cols={30} rows={10} placeholder='Adicione uma descrição para a sua receita' className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-300 rounded-lg mt-1 text-[#717171] mb-8 resize-none' onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
        </div>

        <h2 className='w-full font-semibold text-xl mb-10'>Qual o nome da sua receita</h2>
        <label htmlFor="title">Nome da Receita</label>
        <input type="text" name="title" id="title" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Dê um nome para a sua receita' onChange={(e) => setTitle(e.target.value)} />

        <section className='w-full flex flex-col items-center'>
          <h2 className='w-full font-semibold text-xl text-left'>Ingredientes</h2>

          {!sendImage ? (
            <div className="cta">
              <span>Adicionar Ingrediente</span>
              <svg viewBox="0 0 13 10" height="10px" width="15px">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </div>
          ) : (<></>)}
        </section>

        <section className='w-full mt-[10em]'>
          <h2 className='w-full font-semibold text-xl mb-10'>Modo de Preparo</h2>

          {methodStep > 0 ? (
            <>
              <label htmlFor="first-step">1ª Etapa</label>
              <input type="text" name="first-step" id="first-step" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Explique essa etapa' onChange={(e) => setFirstStep(e.target.value)} />
            </>
          ) : (<></>)}

          {methodStep > 1 ? (
            <>
              <label htmlFor="second-step">2ª Etapa</label>
              <input type="text" name="second-step" id="second-step" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Explique essa etapa' onChange={(e) => setSecondStep(e.target.value)} />
            </>
          ) : (<></>)}

          {methodStep > 2 ? (
            <>
              <label htmlFor="third-step">3ª Etapa</label>
              <input type="text" name="third-step" id="third-step" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Explique essa etapa' onChange={(e) => setThirdStep(e.target.value)} />
            </>
          ) : (<></>)}

          {methodStep > 3 ? (
            <>
              <label htmlFor="fourth-step">4ª Etapa</label>
              <input type="text" name="fourth-step" id="fourth-step" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Explique essa etapa' onChange={(e) => setFourthStep(e.target.value)} />
            </>
          ) : (<></>)}

          {methodStep > 4 ? (
            <>
              <label htmlFor="fifth-step">5ª Etapa</label>
              <input type="text" name="fifth-step" id="fifth-step" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Explique essa etapa' onChange={(e) => setFifthStep(e.target.value)} />
            </>
          ) : (<></>)}

          {!sendImage ? (
            <div className='w-full flex justify-center'>
              {methodStep >= 5 ? (<></>) : (
                <div className="cta" onClick={() => addNewMethodStep()}>
                  <span>Adicionar Nova Etapa</span>
                  <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </div>
              )}
            </div>
          ) : (<></>)}
        </section>

        <section className='w-full flex justify-center items-center'>
          {firstStep !== "" && description !== "" ? (
            <button type='submit' className='mt-24 w-full bg-[#f1656a] rounded-xl max-w-[650px] p-3 text-center text-white font-bold cursor-pointer'>
              Criar Receita
            </button>
          ) : (
            <></>
          )}
        </section>

      </form >
    </div >
  ) : (
    <Loader />
  )
}

export default page
