import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="w-full sm:p-[5%] p-[2%] max-w-[1250px] flex flex-col items-center bg-white rounded-xl shadow-sm shadow-neutral-200 mt-10">
      <Image
        src={"/assets/logo.png"}
        alt="Logo"
        width={150}
        height={100}
        className="mt-10 mb-12"
      />

      <section className="w-full mt-12">
        <h1 className="font-semibold text-3xl">Sobre a Tastebite</h1>
        <p className="text-[#717171] text-justify mt-2">
          Bem-vindo ao Tastebite, o seu destino culinário para explorar e
          compartilhar receitas deliciosas! Nós acreditamos que a comida tem o
          poder de unir as pessoas, inspirar a criatividade e criar memórias
          duradouras. No Tastebite, buscamos celebrar a diversidade de sabores
          ao redor do mundo, conectando entusiastas culinários e proporcionando
          uma experiência gastronômica única a cada usuário.
        </p>
      </section>

      <section className="w-full mt-12">
        <h1 className="font-semibold text-3xl">
          Receitas Para Todos os Gostos
        </h1>
        <p className="text-[#717171] text-justify mt-2">
          No Tastebite, você encontrará uma ampla variedade de receitas para
          todos os gostos e preferências. Desde pratos tradicionais e comfort
          food até opções mais ousadas e inovadoras, nossa plataforma é um
          tesouro de inspiração culinária.
        </p>
      </section>

      <section className="w-full mt-12">
        <h1 className="font-semibold text-3xl">
          Compartilhamento Colaborativo
        </h1>
        <p className="text-[#717171] text-justify mt-2">
          Acreditamos no poder do compartilhamento colaborativo. Conecte-se com
          outros entusiastas culinários, compartilhe suas próprias receitas
          favoritas e descubra novas iguarias recomendadas pela comunidade
          Tastebite.
        </p>
      </section>

      <section className="w-full mt-12">
        <h1 className="font-semibold text-3xl">Ferramentas Intuitivas</h1>
        <p className="text-[#717171] text-justify mt-2">
          Desenvolvemos ferramentas intuitivas para tornar a experiência de
          encontrar e seguir receitas fácil e divertida. Nossa plataforma é
          projetada para se adaptar às suas necessidades, oferecendo recursos
          como listas de compras personalizadas e instruções passo a passo.
        </p>
      </section>

      <section className="w-full mt-12">
        <h1 className="font-semibold text-3xl">Comunidade Tastebite</h1>
        <p className="text-[#717171] text-justify mt-2">
          Explore, experimente e compartilhe sua paixão pela culinária conosco!
          Junte-se à comunidade Tastebite hoje e embarque em uma jornada
          culinária emocionante. Descubra novas receitas, faça amigos que
          compartilham seu amor pela comida e inspire-se a criar pratos
          incríveis. Seja bem-vindo ao Tastebite, onde cada receita conta uma
          história!
        </p>
      </section>
    </div>
  );
};

export default page;
