"use client";

import ToastMessage from "@/components/config/ToastMessage";
import UploadImage from "@/components/config/UploadImage";
import { CREATE_RECIPE } from "@/graphql/mutations";
import { infoUser } from "@/utils/common/userContext";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import IngredientInput from "@/components/Recipe/IngredientInput";
import Image from "next/image";
import { RECIPE_TYPES } from "@/constants/recipe-types";

type RecipeTypeProps = {
  name: string;
  value: string;
};

const page = () => {
  // Get User Info
  const { data } = infoUser();
  const router = useRouter();

  const [showSendImage, setShowSendImage] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [recipeType, setRecipeType] = useState<string>("");

  const [image, setImage] = useState<string>("");

  // Steps
  const [qtdIngredients, setQtdIngredients] = useState<number>(0);
  const [methodStep, setMethodStep] = useState<number>(0);

  // Method Steps
  const [firstStep, setFirstStep] = useState<string>("");
  const [secondStep, setSecondStep] = useState<string>("a");
  const [thirdStep, setThirdStep] = useState<string>("a");
  const [fourthStep, setFourthStep] = useState<string>("a");
  const [fifthStep, setFifthStep] = useState<string>("a");

  // Ingredients
  const initialIngredients = ["", "", "", "", "", ""];
  const [ingredients, setIngredients] = useState<string[]>(initialIngredients);

  const InitialQuantities = [0, 0, 0, 0, 0, 0];
  const [quantityIngredients, setQuantityIngredients] =
    useState<number[]>(InitialQuantities);

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleIngredientQuantityChange = (index: number, value: number) => {
    const newQuantity = [...quantityIngredients];
    newQuantity[index] = value;
    setQuantityIngredients(newQuantity);
  };

  // Incrementing Functions
  const addNewMethodStep = async () => {
    const currentNumStep = methodStep;
    setMethodStep(currentNumStep + 1);
  };

  const addNewIngredient = async () => {
    const currentQtdIngredients = qtdIngredients;
    setQtdIngredients(qtdIngredients + 1);
  };

  // Create Recipe Function
  const [createRecipe] = useMutation(CREATE_RECIPE);

  const createNewRecipe = async () => {
    try {
      await createRecipe({
        variables: {
          title: title,
          description: description,
          ingredients: [
            `${quantityIngredients[0].toString()}g - ${ingredients[0]}`,
            `${quantityIngredients[1].toString()}g - ${ingredients[1]}`,
            `${quantityIngredients[2].toString()}g - ${ingredients[2]}`,
            `${quantityIngredients[3].toString()}g - ${ingredients[3]}`,
            `${quantityIngredients[4].toString()}g - ${ingredients[4]}`,
            `${quantityIngredients[5].toString()}g - ${ingredients[5]}`,
          ],
          methods: [firstStep, secondStep, thirdStep, fourthStep, fifthStep],
          creatorId: data.getUser.id as string,
          creatorPhoto: data.getUser.photo as string,
          creatorName: data.getUser.name as string,
          type: recipeType,
          photo: image,
        },
      });
      toast.success("Receita criada com sucesso!");
      router.push("/home");
    } catch (error) {
      console.log(error);
      toast.error("ERRO! Não foi possível adicionar a sua receita");
    }
  };

  return data.getUser.id ? (
    <div className="w-full sm:p-[5%] p-[2%] max-w-[1050px] flex flex-col items-center bg-white shadow-sm shadow-neutral-200 rounded-xl">
      <ToastMessage />
      <h1 className="text-center text-3xl font-bold">Adicionar uma Receita</h1>
      <form
        onSubmit={async (e: React.SyntheticEvent) => {
          e.preventDefault();
          await createNewRecipe();
        }}
        className="w-full mt-[75px] max-w-[1200px]"
      >
        <h2 className="w-full font-semibold text-xl mb-10 py-2 bg-[#fafafa] border border-neutral-200 px-4">
          Apresente sua Receita
        </h2>
        <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-6 items-center">
          {image != "" ? (
            <Image
              src={image}
              alt="Recipe Image"
              width={300}
              height={235}
              className="w-[300px] h-[235px] cursor-pointer"
              onClick={() => setShowSendImage(true)}
            />
          ) : (
            <div
              className="w-full sm:w-[300px] p-6 border border-neutral-300 border-dashed h-[235px] flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-neutral-100 -mt-8"
              onClick={() => setShowSendImage(true)}
            >
              <p className="text-neutral-400 text-sm text-center">
                Adicione uma foto da sua receita
              </p>
            </div>
          )}
          {showSendImage && (
            <UploadImage
              currentFoto={""}
              setState={setImage}
              text="Envie uma imagem do seu prato"
              show={setShowSendImage}
            />
          )}
          <div className="w-full">
            <textarea
              name="descricao"
              id="descricao"
              cols={30}
              rows={10}
              placeholder="Adicione uma descrição para a sua receita"
              className="w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-300 rounded-lg mt-1 text-[#717171] mb-8 resize-none"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        <label htmlFor="title">
          Nome da Receita <span className="text-[#f1656a]">*</span>
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8"
          autoComplete="off"
          placeholder="Dê um nome para a sua receita"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="type">
          Tipo de Receita <span className="text-[#f1656a]">*</span>
        </label>
        <select
          name="type"
          id="type"
          className="w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8"
          onChange={(e) => setRecipeType(e.target.value)}
        >
          <option value="">Selecione o tipo da receita</option>
          {RECIPE_TYPES.map((type: RecipeTypeProps, index: number) => (
            <option value={type.value} key={index}>
              {type.name}
            </option>
          ))}
        </select>

        <section className="w-full flex flex-col items-center">
          <h2 className="w-full font-semibold text-xl text-left py-2 bg-[#fafafa] border border-neutral-200 px-4 mt-10 mb-10">
            Ingredientes
          </h2>

          {qtdIngredients > 0 && (
            <IngredientInput
              index={0}
              quantityState={handleIngredientQuantityChange}
              ingredientState={handleIngredientChange}
            />
          )}

          {qtdIngredients > 1 && (
            <IngredientInput
              index={1}
              quantityState={handleIngredientQuantityChange}
              ingredientState={handleIngredientChange}
            />
          )}

          {qtdIngredients > 2 && (
            <IngredientInput
              index={2}
              quantityState={handleIngredientQuantityChange}
              ingredientState={handleIngredientChange}
            />
          )}

          {qtdIngredients > 3 && (
            <IngredientInput
              index={3}
              quantityState={handleIngredientQuantityChange}
              ingredientState={handleIngredientChange}
            />
          )}

          {qtdIngredients > 4 && (
            <IngredientInput
              index={4}
              quantityState={handleIngredientQuantityChange}
              ingredientState={handleIngredientChange}
            />
          )}

          {qtdIngredients > 5 && (
            <IngredientInput
              index={5}
              quantityState={handleIngredientQuantityChange}
              ingredientState={handleIngredientChange}
            />
          )}

          {!showSendImage && (
            <div className="cta" onClick={() => addNewIngredient()}>
              <span>Adicionar Ingrediente</span>
              <svg viewBox="0 0 13 10" height="10px" width="15px">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </div>
          )}
        </section>

        <section className="w-full mt-[10em]">
          <h2 className="w-full font-semibold text-xl mb-10 py-2 bg-[#fafafa] border border-neutral-200 px-4 mt-10">
            Modo de Preparo
          </h2>

          {methodStep > 0 && (
            <>
              <label htmlFor="first-step">1ª Etapa</label>
              <input
                type="text"
                name="first-step"
                id="first-step"
                className="w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8"
                autoComplete="off"
                placeholder="Explique essa etapa"
                onChange={(e) => setFirstStep(e.target.value)}
              />
            </>
          )}

          {methodStep > 1 && (
            <>
              <label htmlFor="second-step">2ª Etapa</label>
              <input
                type="text"
                name="second-step"
                id="second-step"
                className="w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8"
                autoComplete="off"
                placeholder="Explique essa etapa"
                onChange={(e) => setSecondStep(e.target.value)}
              />
            </>
          )}

          {methodStep > 2 && (
            <>
              <label htmlFor="third-step">3ª Etapa</label>
              <input
                type="text"
                name="third-step"
                id="third-step"
                className="w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8"
                autoComplete="off"
                placeholder="Explique essa etapa"
                onChange={(e) => setThirdStep(e.target.value)}
              />
            </>
          )}

          {methodStep > 3 && (
            <>
              <label htmlFor="fourth-step">4ª Etapa</label>
              <input
                type="text"
                name="fourth-step"
                id="fourth-step"
                className="w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8"
                autoComplete="off"
                placeholder="Explique essa etapa"
                onChange={(e) => setFourthStep(e.target.value)}
              />
            </>
          )}

          {methodStep > 4 && (
            <>
              <label htmlFor="fifth-step">5ª Etapa</label>
              <input
                type="text"
                name="fifth-step"
                id="fifth-step"
                className="w-full outline-none pl-4 pr-4 pt-2 pb-2 border border-neutral-200 rounded-lg mt-1 text-[#717171] mb-8"
                autoComplete="off"
                placeholder="Explique essa etapa"
                onChange={(e) => setFifthStep(e.target.value)}
              />
            </>
          )}

          {!showSendImage ? (
            <div className="w-full flex justify-center">
              {methodStep >= 5 ? (
                <></>
              ) : (
                <div className="cta" onClick={() => addNewMethodStep()}>
                  <span>Adicionar Nova Etapa</span>
                  <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
        </section>

        <section className="w-full flex justify-center items-center">
          {firstStep !== "" && description !== "" ? (
            <button
              type="submit"
              className="mt-24 w-full bg-[#f1656a] rounded-xl max-w-[650px] p-3 text-center text-white font-bold cursor-pointer"
            >
              Criar Receita
            </button>
          ) : (
            <></>
          )}
        </section>
      </form>
    </div>
  ) : (
    <Loader />
  );
};

export default page;
