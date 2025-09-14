import localFont from "next/font/local";
import topArch from '../../public/Vector 2.svg';
import Image from "next/image"
export const canpileDrawn = localFont({
    src: '../../public/fonts/CanpileDrawn-Regular.otf'
})

export const satoshi = localFont({
    src: '../../public/fonts/Satoshi-Regular.otf'
})

export const satoshiBold = localFont({
    src: '../../public/fonts/Satoshi-Bold.otf'
})



export default function HeroSection() {
  return (
    <section className={`${canpileDrawn.className} py-12 md:py-24 pb-0 text-center flex flex-col items-center bg-gray-50 bg-[url(/herobg.png)] bg-no-repeat bg-cover md:pb-0 justify-center`}>
      {/* PLACEHOLDER: Hero Banner Image */}
      <div className="flex flex-col mt-32">
        <p className="text-3xl md:text-5xl font-bold mb-4 pr-8 pl-8 md:pr-12 md:pl-12 text-darkpurple bg-[url(/mask2.svg)] bg-cover bg-no-repeat bg-center">
            Un refugio para la
        </p>
        <p className="text-3xl md:text-5xl font-bold mb-4 pr-8 pl-8 md:pr-12 md:pl-12 text-darkpurple bg-[url(/mask1.svg)] bg-cover bg-no-repeat bg-center">
            mente y el corazón
        </p>
      </div>
      <p className={`${satoshi.className} max-w-xl mx-auto mb-6 text-sm md:text-xl text-whitemid pr-12 pl-12`}>
        Un espacio seguro para transformar el dolor en sanación y recuperar el equilibrio emocional.
      </p>
      <a
        href="#booking"
        className={`${satoshi.className} mb-24 md:mb-64 text-md mt-8 inline-block px-6 py-3 bg-whitemid text-darkgreen font-semibold shadow hover:bg-primary-dark transition rounded-4xl`}
      >
        Agenda tu consulta
      </a>
      <Image 
        src={topArch}
        alt=""
        className="w-full"
      />
    </section>
  );
}