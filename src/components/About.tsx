import Image from "next/image";
import { canpileDrawn, satoshi } from "./HeroSection";
import friendsImg from '../../public/friends-met-after-long-time-having-funny-time-sm-2025-01-08-06-46-10-utc 2.png';
import laRestingaWaterMark from '../../public/la-restinga-circle.svg';



export default function AboutSection() {
    return (
        <section className={`${satoshi.className} py-12 md:py-16 md:pt-0 md:mt-0 mx-auto px-8 md:px-24 bg-whitemid flex flex-row flex-wrap md:flex-nowrap justify-between`} id="about">
            <div className=" md:max-w-3xl">
            {/* md:py-16 py-12*/}
                <div className="md:text-3xl flex flex-col gap-4">
                    <span className={`${canpileDrawn.className} text-4xl underline text-darkpurple`}>01</span>
                    <h2 className={`${canpileDrawn.className} text-3xl md:text-5xl font-semibold mb-4 text-darkpurple`}>Sobre nosotros</h2>
                </div>
                <div className="">
                    <p className={`text-blackwrite mb-2 text-sm ${satoshi.className} md:text-xl`}>
                    <b>La Restinga es un espacio de cuidado emocional donde la salud mental se atiende con respeto, seguridad y amor.</b> Inspirado en la cosmovisión amazónica, su nombre representa un refugio frente a las crecidas de la vida: un lugar donde es posible detenerse, respirar y empezar de nuevo.
                    </p>
                    <p className={`text-blackwrite mb-2 text-sm md:text-xl ${satoshi.className}`}>
                    Con un equipo especializado, ofrecemos acompañamientos cálidos y transformadores para niñas, niños, adolescentes y sus familias. Creemos en procesos con propósito: encuentros que restauran la confianza y fortalecen la vida.
                    </p>
                </div>
            </div>
            <div className="relative p-2">
                <Image
                    src={friendsImg}
                    alt=""
                    className="rounded-4xl my-4"
                />
                <Image
                    src={laRestingaWaterMark}
                    alt=""
                    className="w-32 absolute -bottom-6 -left-8"
                />
            </div>
        </section>
);
}