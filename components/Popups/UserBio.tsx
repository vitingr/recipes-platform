"use client"

import React, { useState } from 'react'
import Popup from '../Popup'
import { useMutation } from '@apollo/client'
import { UPDATE_BIO } from '@/graphql/queries'
import { infoUser } from '@/utils/common/userContext'
import ToastMessage from '../config/ToastMessage'
import { toast } from 'react-toastify'

const UserBio = ({ editState }: { editState: any }) => {

  // States Declaration
  const { data, getUserInfo } = infoUser()
  const [bio, setBio] = useState<string>("")

  // Edit User Bio Function
  const [updateBio] = useMutation(UPDATE_BIO)

  const editUserBio = async () => {
    try {
      if (bio != "" && bio) {
        await updateBio({
          variables: {
            id: data.getUser.id,
            bio: bio
          }
        })
        toast.success("Perfil atualizado com sucesso!")
        await getUserInfo()
        editState(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Popup title="Editar Bio" state={editState} handleSubmit={() => {
      setBio("")
    }}>
      <ToastMessage />
      <form onSubmit={async (e: React.SyntheticEvent) => {
        e.preventDefault()
        await editUserBio()
      }} className='mt-14 w-full'>
        <label htmlFor="bio">Adicione uma bio para o seu perfil</label>
        <textarea name="bio" id="bio" cols={32} rows={10} className='w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-300 rounded-lg mt-1 text-[#717171] mb-8 resize-none' autoComplete='off' onChange={(e) => setBio(e.target.value)} placeholder='Digite algo relevante sobre você' defaultValue={data.getUser.bio}></textarea>
        <button type='submit' className='mt-4 w-full bg-[#f1656a] rounded-xl p-4 text-center text-white font-bold cursor-pointer'>
          Editar Perfil
        </button>
      </form>
    </Popup>
  )
}

export default UserBio