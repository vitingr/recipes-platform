"use client";

import Loader from "@/components/Loader";
import { CREATE_USER } from "@/graphql/mutations";
import { GET_USER } from "@/graphql/queries";
import { UserContextProps, UserProps } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<UserContextProps | any>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<UserProps[] | any>([]);

  const [createUser] = useMutation(CREATE_USER);

  const {
    data: userData,
    loading: userLoading,
    refetch: refetchUser,
    error: userError,
  } = useQuery(GET_USER, {
    variables: {
      email: session?.user?.email,
    },
    skip: !session?.user?.email,
  });

  const getUserInfo = async () => {
    try {
      if (userLoading === false) {
        if (userData === undefined) {
          const name = session?.user?.name;
          const firstname = name?.split(" ")[0];
          const lastname = name?.split(" ")[1];

          await createUser({
            variables: {
              name: name,
              firstname: firstname,
              lastname: lastname,
              email: session?.user?.email || "",
              photo: session?.user?.image || "",
            },
          });

          await refetchUser();
        } else {
          setData(userData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      session?.user?.email !== undefined &&
      status === "authenticated" &&
      userLoading === false
    ) {
      getUserInfo();
    }
  }, [session, userLoading]);

  return data.getUser ? (
    <UserContext.Provider value={{ data, setData, getUserInfo }}>
      {children}
    </UserContext.Provider>
  ) : (
    <Loader />
  );
};

export const infoUser = () => useContext(UserContext);
