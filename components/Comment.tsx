import { CommentProps } from "@/types";
import Image from "next/image";
import React from "react";
import { SlLike, SlDislike  } from "react-icons/sl";

const Comment = ({ comment }: { comment: CommentProps }) => {
  return (
    <div className="w-full flex items-start gap-2 pb-6 mb-6 border-b border-neutral-200">
      <Image
        src={comment.creatorPhoto}
        alt="Profile Picture"
        width={35}
        height={35}
        className="rounded-full"
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col justify-center">
          <h1 className="font-semibold text-sm">{comment.creatorName}</h1>
          <p className="text-[#717171] text-xs">
            {comment.createdAt.toString()}
          </p>
        </div>
        <p className="text-justify text-sm">{comment.content}</p>
        <div className="flex items-center gap-4 mt-6">
          <SlLike sie={15} className="gray-icon cursor-pointer"/>
          <SlDislike sie={15} className="gray-icon cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};

export default Comment;
