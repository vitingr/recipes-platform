import { RecipeProps } from "@/types";
import Link from "next/link";
import React from "react";
import { TiStarFullOutline } from "react-icons/ti";

const RecipeCard = ({ content }: { content: RecipeProps }) => {
  return (
    <Link href={`/recipe/${content.id}`}>
      <div className="w-[250px] h-[325px] bg-white p-2 border border-neutral-200 rounded-xl cursor-pointer">
        <div
          className="w-full h-[75px] rounded-lg bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${content.photo})` }}
        />
        <div className="mt-2 p-4 break-all">
          <h1 className="text-center font-semibold uppercase">
            {content.title}
          </h1>
          <div className="flex justify-center gap-1">
            <TiStarFullOutline size={12} className="gray-icon" />
            <p className="text-xs">{content.qtdLikes} curtidas</p>
          </div>
          <p className="text-sm text-[#717171] mt-4 text-center mb-6">
            {content.description ||
              "ojdwodjwodwjodwjodwjodwjodwjodwjodwjodwjodwjodwjodwjodwjodwjodwjdowjdwodjwodjwdowjdow"}
          </p>
          <div className="flex flex-col gap-1">
            <span className="text-[#717171] text-xs">
              {content.ingredients.length > 1
                ? `* ${content.ingredients.length} ingredientes`
                : `* ${content.ingredients.length} ingrediente`}
            </span>
            <span className="text-[#717171] text-xs">
              {content.methods.length > 1
                ? `* ${content.methods.length} etapas`
                : `* ${content.methods.length} etapa`}
            </span>
          </div>
          <button className="text-white bg-[#f1656a] w-full rounded-lg py-1 text-sm mt-6">
            Ver Receita
          </button>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
