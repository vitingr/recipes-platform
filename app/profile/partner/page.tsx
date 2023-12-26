import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-[62vh] sm:p-[5%] p-[2%] max-w-[1250px] w-full flex flex-col items-center">
      <Image
        src={"/assets/logo.png"}
        alt="Logo"
        width={215}
        height={125}
        className="mb-10"
      />

      <section className="mt-20 max-w-[850px] w-full flex flex-col items-center">
        <h1 className="text-3xl font-semibold">
          1. Ser Parceiro é Muito Fácil
        </h1>
        <p className="text-center text-[#717171] mt-2">
          Bem-vindo à nossa comunidade de apaixonados por culinária! Se você
          adora criar receitas incríveis e compartilhar seu conhecimento
          gastronômico, temos uma oportunidade especial para você se tornar um
          parceiro em nossa plataforma de compartilhamento de receitas.
          Tornar-se um parceiro é fácil e gratificante. Siga os passos abaixo e
          comece a compartilhar suas delícias culinárias com o mundo.
        </p>
        <Image
          alt="Partner Image"
          src={"/assets/image1.svg"}
          width={200}
          height={200}
          className="mt-20  mb-8"
        />
      </section>

      <section className="mt-20 max-w-[850px] w-full flex flex-col items-center">
        <h1 className="text-3xl font-semibold">2. Inscreva-se como Parceiro</h1>
        <p className="text-center text-[#717171] mt-2">
          Primeiro passo, cadastre-se como parceiro em nossa plataforma. Acesse
          a seção "Seja um Parceiro" e preencha o formulário de inscrição.
          Queremos conhecê-lo melhor e entender o seu estilo único na cozinha. A
          partir disso você estará liberado para divulgar e compartilhar as suas
          melhores e favoritas receitas com toda nossa comunidade
        </p>
        <Image
          alt="Partner Image"
          src={"/assets/image2.svg"}
          width={200}
          height={200}
          className="mt-20  mb-8"
        />
      </section>

      <section className="mt-20 max-w-[850px] w-full flex flex-col items-center">
        <h1 className="text-3xl font-semibold">3. Envie Suas Receitas:</h1>
        <p className="text-center text-[#717171] mt-2">
          Chegou a hora de mostrar seu talento! Publique suas receitas
          exclusivas, acompanhadas de fotos atraentes. Detalhe cada passo do
          processo para garantir que outros possam reproduzir suas criações com
          sucesso.
        </p>
        <Image
          alt="Partner Image"
          src={"/assets/image3.svg"}
          width={200}
          height={200}
          className="mt-20  mb-8"
        />
      </section>

      <Link
        href={"/profile/partner/form"}
        className="max-w-[650px] mt-20 bg-[#f1656a] w-full text-white rounded-xl text-center px-4 py-3 cursor-pointer"
      >
        Continuar
      </Link>
    </div>
  );
};

export default page;
