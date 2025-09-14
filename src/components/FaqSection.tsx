'use client'
import { useState } from "react";
import { canpileDrawn, satoshi } from "./HeroSection";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const faqs = [
  {
    question: "¿A quiénes atiende La Restinga?",
    answer: "Atendemos a niñas, niños, adolescentes y sus familias.",
  },
  {
    question: "¿Necesito una derivación médica para empezar?",
    answer: "No necesitas derivación médica para iniciar un proceso con nosotros.",
  },
  {
    question: "¿Cuánto dura un proceso terapéutico?",
    answer: "La duración varía según las necesidades, ritmo y objetivos de cada persona.",
  },
  {
    question: "¿Atienden en línea o solo de forma presencial?",
    answer: "Ofrecemos ambas modalidades: sesiones presenciales y en línea.",
  },
  {
    question: "¿La primera sesión es solo una conversación?",
    answer: "La primera sesión se orienta al diálogo y la comprensión de la situación para definir juntos el mejor camino a seguir.",
  },
];

export default function FAQSection() {
  return (
    <section className={`${canpileDrawn.className} text-darkpurple py-12 md:py-16 bg-whitemid flex flex-col items-center px-8 md:px-24`} id="faqs">
          <div className="flex flex-col gap-4 w-fit">
            <span className="text-4xl underline max-w-full text-center md:text-left underline-offset-4">04</span>
            <h2 className="text-3xl md:text-5xl font-semibold text-center">Dudas Frecuentes</h2>
            <p className={`${satoshi.className} text-blackwrite text-center`}>Estamos aquí para ayudarte. Mira las respuestas a las dudas más comunes.</p>
          </div>

          <div className="my-4">
            {faqs.map((q,i) => (
              <Question answer={q.answer} question={q.question} key={i}/>
            ))}
          </div>

    </section>
  );
}



interface QuestionProps {
  question: string,
  answer: string
}
function Question(props: QuestionProps) {
  const [opened, setOpened] = useState(false)
  return(
    <div onClick={() => setOpened(!opened)} className={`${opened ? "bg-lightgreen" : "bg-whitemid"} ${satoshi.className} text-blackwrite border-2 border-lightgreen rounded-3xl my-4 py-2 px-4 md:px-8 text-md md:w-3xl`}>
      <div className="flex flex-row justify-between my-4 hover:cursor-pointer">
        <span className="font-bold self-center max-w-3/4">{props.question}</span>
        <span className="text-3xl md:text-3xl self-center">{opened ? <IoIosArrowUp/> : <IoIosArrowDown/>}</span>
      </div>
      <span className={`${opened ? "" : "hidden"} text-md font-thin my-4`}>{props.answer}</span>
    </div>
  )
}