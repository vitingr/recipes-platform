import { CommentProps } from "@/types";
import Image from "next/image";
import React from "react";

const Comment = ({ comment }: { comment: CommentProps }) => {
  return (
    <div className="w-full flex items-start gap-2 pb-8 mb-8 border-b border-neutral-100">
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
      </div>
    </div>
  );
};

export default Comment;
