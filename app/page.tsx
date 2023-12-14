import Image from 'next/image'
import { IoSearch } from "react-icons/io5";

export default function Home() {
  return (
    <div className='min-h-[62vh] sm:p-[5%] p-[2%] max-w-[1250px] w-full flex flex-col items-center'>
      <section className='w-full max-w-[750px] bg-[#f1f2f4] p-6 rounded-xl flex gap-6 sm:flex-nowrap flex-wrap'>
        <Image src={"/assets/image.jpg"} alt='main image' className='selection:bg-transparent' width={400} height={400}/>
        <div className='mt-4'>
          <h2 className='uppercase'>DESERT, DESERT, DESERT, VEGETARIAN</h2>
          <h1 className='cursive text-4xl mt-10'>Bangkok Coconut and Strawberry Cake Recipe</h1>
          <p className='text-[#717171] mt-10 text-justify'>The literal translantion of Nicié Goreng is "fried rice" in indonesian and Malasyians - and that's exactly what it is! It's mainly rice with just a little bit of meat and just onion for the vegetables. The thing that distinguishes it from other Fried Rice dishes is the sauce which is made with kecap manis.</p>
          <div className='py-2 mt-20 text-[#f1656a] w-full text-center cursor-pointer'>
            Ver mais
          </div>
        </div>
      </section>

      <section className='w-full mt-[10em] flex flex-col items-center'>
        <h1 className='text-4xl font-bold text-center'>O que você está procurando?</h1>
        <p className='sm:text-xl text-lg mt-2 text-[#717171] text-center'>Procure por aqui qual é a receita do seu prato favorito</p>
        <form className='flex justify-between items-center sm:gap-8 gap-4 sm:w-[550px] w-[350px] mt-20 p-6 border boder-neutral-200 rounded-xl'>
          <div className='flex items-center w-full gap-4'>
            <IoSearch size={20} />
            <input type="text" name="search" id="search" className='w-full outline-none border-b border-neutral-200 py-1 px-2 text-sm' placeholder='Busque uma receita aqui' maxLength={60} minLength={2} autoComplete='off' />
          </div>
          <button className='sm:text-base text-sm px-2 py-1 sm:px-4 sm:py-2 w-[175px] bg-[#f1656a] text-white rounded-xl'>
            Buscar Receita
          </button>
        </form>
      </section>

      <section className='pt-20 mt-20 border-t border-neutral-200 mb-20 w-full'>
        <h1>Receitas do momento</h1>
        <div className='flex gap-6 items-center justify-center mt-16 w-full'>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
        </div>
      </section>
    </div>
  )
}
