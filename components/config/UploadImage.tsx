"use client";

import { UploadProps } from "@/types";
import React, { ChangeEvent, useState } from "react";
import Popup from "../Popup";
import Image from "next/image";

const UploadImage = ({ setState, currentFoto, text, show }: UploadProps) => {
  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      alert("Só é possível enviar imagens");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // State vai armazar o valor da variável
      setState(result);
      // Show vai armazenar a propriedade de mostrar o Popup na tela do usuário
      show(false);
    };
  };

  return (
    <Popup title="Enviar Imagem" state={show}>
      <div className="w-full h-[300px] border border-dashed border-neutral-300 p-6 mt-10 flex flex-col items-center justify-center">
        {!currentFoto  ? (
          <label htmlFor="image">{text}</label>
        ) : (
          <Image
            width={500}
            height={300}
            src={currentFoto}
            alt="Image"
            className="w-full max-h-[300px]"
          />
        )}
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={(e) => handleChangeImage(e)}
          className="absolute z-30 w-[500px] opacity-0 h-[300px] cursor-pointer"
        />
      </div>
    </Popup>
  );
};

export default UploadImage;
