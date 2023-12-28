import React from "react";

type IngredientInputProps = {
  index: number;
  ingredientState: any;
  quantityState: any;
};

const IngredientInput = ({
  index,
  ingredientState,
  quantityState,
}: IngredientInputProps) => {
  return (
    <div className="flex justify-between w-full gap-6 items-center">
      <div className="w-full">
        <label htmlFor="ingredient-name">{(index + 1).toString()}ª Ingrediente</label>
        <input
          type="text"
          name="ingredient-name"
          id="ingredient-name"
          className="w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8"
          autoComplete="off"
          placeholder="Nome do Ingrediente"
          onChange={(e) => ingredientState(index, e.target.value)}
        />
      </div>
      <div className="w-[250px]">
        <label htmlFor="ingredient-quantity">Quantidade utilizada</label>
        <input
          type="number"
          name="ingredient-quantity"
          id="ingredient-quantity"
          className="w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8"
          autoComplete="off"
          placeholder="Valor em grama (g)"
          onChange={(e) => quantityState(index, e.target.value)}
        />
      </div>
    </div>
  );
};

export default IngredientInput;
