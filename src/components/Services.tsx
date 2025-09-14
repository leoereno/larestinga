import Image from "next/image";
import { canpileDrawn, satoshi } from "./HeroSection";
import line from '../../public/line-with-topics.svg';
import lineMobile from '../../public/line-with-topics-mobile.svg';
import NavigationArrow from "./NavigationArrow";

export default function ServicesSection() {
  return (
  <section className={`${canpileDrawn.className} text-darkpurple py-12 md:py-16 bg-whitemid flex flex-col items-center`} id="services">
    <div className="flex flex-col gap-4 w-fit">
      <span className="text-4xl underline max-w-full text-center md:text-left underline-offset-4">02</span>
      <h2 className="text-3xl md:text-5xl font-semibold text-center">Nuestros Servicios</h2>
      <span className={`${satoshi.className} text-blackwrite text-base md:max-w-xl text-center`}>Cuidamos la salud mental con escucha, técnica y calidez, ofreciendo apoyo emocional especializado para cada etapa de la vida.</span>
    </div>
    <div>
      <div className="flex flex-col mx-auto max-w-dvw">
            <div className="w-full overflow-x-auto whitespace-nowrap min-w-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" id="scroll-container">
            {/* Your image */}
              {/* <img src={line} alt={"alt"} className="max-w-none" /> */}
              <Image 
                src={line}
                alt=""
                className="max-w-none w-[2000px] md:w-full hidden md:inline select-none pointer-events-none"
              />
              <Image 
                src={lineMobile}
                alt=""
                className="max-w-none w-[1500px] md:hidden select-none pointer-events-none mt-10"
              />
              
            </div>
          <NavigationArrow/>
        {/* <ServiceCards 
          services={[{title: "Psicoterapia infantil\ny adolescente", description: "Acompañamiento emocional para niñas, niños y adolescentes enfocado en la escucha, el vínculo y el desarrollo sano."}]}
        /> */}
      </div> 
    </div>

  </section>
  );
}