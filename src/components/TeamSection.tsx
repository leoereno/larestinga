'use client'
import { canpileDrawn, satoshi } from "./HeroSection";
import TeamSlides from "./TeamSlides";


export default function TeamSection() {
  return (
    <section className="py-12 md:py-16 mx-auto px-8 md:px-24 flex flex-row flex-wrap md:flex-nowrap justify-between bg-whitemid gap-16 md:gap-64" id="team">
      <div className="text-darkpurple flex flex-col gap-4 max-w-xl">
        <span className={`underline ${canpileDrawn.className} underline-offset-4 text-4xl`}>03</span>
        <h2 className={`${canpileDrawn.className} font-bold text-3xl md:text-5xl`}>Nuestro Equipo</h2>
        <p className={`${satoshi.className} text-blackwrite text-left text-xl`}>En La Restinga contamos con un <b>equipo mayoritariamente femenino</b>, compuesto por <b>psicólogas con amplia experiencia y un profundo compromiso con el cuidado emocional de niñas, niños, adolescentes y familias.</b> La elección de un equipo femenino va más allá de la representatividad: refleja el deseo de ofrecer un espacio sensible, seguro y empático, capaz de acoger con delicadeza y firmeza los dolores y procesos de transformación de cada persona.</p>
      </div>

      <TeamSlides />


    </section>
  );
}