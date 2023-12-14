"use client"

import { CREATE_USER, GET_USER } from '@/graphql/queries'
import { UserContextProps, UserProps } from '@/types'
import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import React, { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext<UserContextProps | any>(undefined)

export const UserProvider = ({
  children
}: {
  children: React.ReactNode
}) => {

  const { data: session, status } = useSession()
  const [data, setData] = useState<UserProps[]>([])

  const [createUser] = useMutation(CREATE_USER)

  const { data: userData, loading: userLoading, error: userError, refetch: refetchUser } = useQuery(GET_USER, {
    variables: {
      email: session?.user?.email
    },
    skip: !session?.user?.email, // Skip the query if email is not available
  })

  const getUserInfo = async () => {
    try {
      // Check if the query is loading yet
      if (userLoading === false) {
        // If user doesnt exists, create a new one
        if (userData === undefined) {

          // Initial Params
          const name = session?.user?.name;
          const firstname = name?.split(" ")[0];
          const lastname = name?.split(" ")[1];

          // Async graphql query to create a new user
          await createUser({
            variables: {
              name: name,
              firstname: firstname,
              lastname: lastname,
              email: session?.user?.email || "",
              photo: session?.user?.image || "",
            },
          })
          // Refresh data to get the current user info
          await refetchUser()
        } else {
          setData(userData)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user?.email !== undefined && status === "authenticated" && userLoading === false) {
      getUserInfo()
    }
  }, [session, userLoading])

  return (
    <UserContext.Provider value={{ data, setData, getUserInfo }}>
      {children}
    </UserContext.Provider>
  )
}

export const infoUser = () => useContext(UserContext)