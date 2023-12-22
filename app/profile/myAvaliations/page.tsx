"use client";

import Comment from "@/components/Comment";
import MainProfile from "@/components/Profile/MainProfile";
import { GET_USER_COMMENTS } from "@/graphql/queries";
import { CommentProps } from "@/types";
import { infoUser } from "@/utils/common/userContext";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const page = () => {
  const { data, getUserInfo } = infoUser();
  const { data: session, status } = useSession();

  const { data: avaliationsData, loading: avaliationsLoading } = useQuery(
    GET_USER_COMMENTS,
    {
      variables: {
        id: data.getUser.id,
      },
      skip: !data.getUser.id || data.getUser.id === undefined,
    }
  );

  useEffect(() => {
    if (
      session?.user?.email !== undefined &&
      status === "authenticated" &&
      avaliationsLoading === false
    ) {
      console.log(avaliationsData);
    }
  }, [session, status, avaliationsLoading]);

  return (
      <MainProfile>
        <h1 className="mb-16 mt-4 text-2xl font-semibold cursor-default transition-all duration-300 hover:text-[#f1656a]">
          Meus Comentários e Avaliações
        </h1>
        <div className="flex flex-wrap gap-6 w-full">
          {avaliationsData &&
            avaliationsData.findUserCommentaries &&
            avaliationsData.findUserCommentaries.map(
              (userComment: CommentProps, index: number) => (
                <Comment comment={userComment} key={index} />
              )
            )}
        </div>
      </MainProfile>
  );
};

export default page;
