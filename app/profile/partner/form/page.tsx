"use client"

import { infoUser } from '@/utils/common/userContext'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { cpfMask } from '@/utils/functions/cpf-mask'
import { cellphoneMask } from '@/utils/functions/cellphone-mask'
import { isValidCPF } from '@/utils/functions/cpf-validator'
import { rgMask } from '@/utils/functions/rg-mask'
import { toast } from 'react-toastify'
import { CIDADES_BRASIL } from '@/constants/json-citys'
import ToastMessage from '@/components/config/ToastMessage'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '@/graphql/queries'

const page = () => {

  // Data Info
  const [step, setStep] = useState(1)
  const { data, getUserInfo } = infoUser()
  const router = useRouter()

  // Information States
  const [cellphone, setCellphone] = useState<string>("")
  const [cpf, setCpf] = useState<string>("")
  const [rg, setRg] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [state, setState] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [name, setName] = useState<string>(data.firstname)
  const [lastName, setLastName] = useState<string>(data.lastname)

  // Input Masks 
  const [cpfFormated, setCpfFormated] = useState<string>("")
  
  const nextStep = async () => {
    let currentStep = step
    setStep(currentStep + 1)
  }

  const lastStep = async () => {
    let currentStep = step
    setStep(currentStep - 1)
  }

  const [cidadesList, setCidadesList] = useState<string[]>([])

  // Mask Functions 
  const buscaCidadesPorEstado = (estado: string) => {
    var estadoSelecionado: any = CIDADES_BRASIL.estados.find((sigla) => sigla.sigla === estado); // Vai procurar no json estados, um estado com o sigla igual ao estado Selecionado
    var cidades = estadoSelecionado.cidades
    return cidades;
  }

  const handleChangeEstado = (e: any) => {
    const estado = e.target.value;
    setState(estado); // Vai retonar SP por exemplo
    const cidadesDoEstado = buscaCidadesPorEstado(estado); // Vai buscar as cidades que pertencem aquela sigla
    setCidadesList(cidadesDoEstado);
  }

  const verifyCPF = async (cpf: string) => {
    const valid: boolean | any = await isValidCPF(cpf)

    const formatedCPF: string = await cpfMask(cpf)
    setCpfFormated(formatedCPF)

    if (valid) {
      setCpf(formatedCPF)
    } else {
      if (!valid) {
        toast.error("CPF Inválido")
      }
    }
    
  }

  const verifyCellphone = async (value: string) => {
    const formatedCellphone: string = await cellphoneMask(value)
    setCellphone(formatedCellphone)
  }

  const verifyRG = async (value: string) => {
    const formatedRG: string = await rgMask(value)
    setRg(formatedRG)
  }

  // GraphQL Configuration
  const [updateUser] = useMutation(UPDATE_USER)

  const signPartnership = async () => {
    try {
      if (data && data.getUser.id != undefined) {
        await updateUser({
          variables: {
            id: data.getUser.id
          }
        })
        toast.success("Processo de parceria realizado com sucesso!")
        await getUserInfo()
      }
    } catch (error) {
      toast.error("ERRO! Não foi possível concluir o processo de parceria")
    }
  }


  return data ? (
    <div className='min-h-[62vh] sm:p-[5%] p-[2%] max-w-[1250px] w-full flex flex-col items-center'>
      <ToastMessage />
      <h1 className='text-3xl font-bold'>Preencha o Formulário <br />para ser um Parceiro</h1>
      <form onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault()
        signPartnership()
      }} className='max-w-[800px] w-full mt-[75px]'>
        {step === 1 ? (
          <>
            <label htmlFor="telefone" className='text-lg'>Celular do Dono (com DDD)</label>
            <input type="text" name="telefone" id="telefone" maxLength={15} minLength={11} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' value={cellphone} autoComplete='off' placeholder='Qual é o celular do restaurante' onChange={(e) => verifyCellphone(e.target.value)} required />

            <div className='flex items-center gap-6'>
              <div className='w-full'>
                <label htmlFor="nome" className='text-lg'>Nome</label>
                <input type="text" name="nome" id="nome" minLength={2} maxLength={55} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' value={name || ""} placeholder='Nome do dono' onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className='w-full'>
                <label htmlFor="sobrenome" className='text-lg'>Sobrenome</label>
                <input type="text" name="sobrenome" id="sobrenome" minLength={2} maxLength={55} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' value={lastName || ""} placeholder='Sobrenome do dono' onChange={(e) => setLastName(e.target.value)} required />
              </div>
            </div>

            <label htmlFor="cpf" className='text-lg'>CPF</label>
            <input type="text" name="cpf" id="cpf" minLength={11} maxLength={14} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' value={cpfFormated} placeholder='Qual é o CPF do dono do restaurante?' onChange={(e) => verifyCPF(e.target.value)} required />

            <label htmlFor="rg" className='text-lg'>RG</label>
            <input type="text" name="rg" id="rg" minLength={8} maxLength={11} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' value={rg} placeholder='Qual é o RG do dono do restaurante?' onChange={(e) => verifyRG(e.target.value)} required />

            <div className='flex items-center gap-6'>
              <div className='w-full'>
                <label htmlFor="state" className='text-lg'>Estado</label>
                <select name="state" id="state" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' onChange={handleChangeEstado} required>
                  <option value="">Selecione um estado</option>
                  {CIDADES_BRASIL.estados.map((estado: any) => (
                    <option key={estado.sigla} value={estado.sigla}>
                      {estado.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className='w-full'>
                <label htmlFor="city" className='text-lg'>Cidade</label>
                <select name="city" id="city" className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' onChange={(e) => setCity(e.target.value)} required>
                  <option value="">Selecione uma cidade</option>
                  {cidadesList.map((cidade: any) => (
                    <option key={cidade} value={cidade}>
                      {cidade}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label htmlFor="street" className='text-lg'>Endereço</label>
            <input type="text" name="street" id="street" minLength={2} maxLength={55} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8' autoComplete='off' placeholder='Exemplo: Bairro ou Rua do restaurante' onChange={(e) => setAddress(e.target.value)} required />

            {cpf != "" && name != "" && lastName != "" && cellphone != "" && state !== "" && city !== "" && address !== "" ? <button type='submit' className='mt-12 w-full bg-[#f1656a] rounded-xl p-4 text-center text-white font-bold cursor-pointer'>Avançar</button> : 
            
            <button className='mt-12 w-full bg-[#dddddd] rounded-xl p-4 text-center text-[#717171] font-bold cursor-not-allowed'>Avançar</button>
            }
          </>
        ) : (
          <></>
        )}
      </form>
    </div>
  ) : (
    <></>
  )
}

export default page