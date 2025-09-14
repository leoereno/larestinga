import BookingCalendar from "./BookingCalendar";
import { canpileDrawn } from "./HeroSection";
import Image from 'next/image';
import logo from '../../public/logo-clara.svg';
import footerArch from '../../public/footer-arch.svg';

export default function BookingSection() {
  return (
  <section className="py-24 pb-0 bg-lightpurple md:py-16 md:pb-0 flex flex-col items-center px-0 md:px-0" id="booking">
    {/* <div className={`${canpileDrawn.className} flex flex-col gap-4 w-fit text-darkpurple`}>
            <span className="text-4xl underline max-w-full text-center md:text-left underline-offset-4">05</span>
            <h2 className="text-3xl md:text-5xl font-semibold text-center">Agenda tu Consulta</h2>
    </div> */}
    <BookingCalendar />
    <div className="text-blackwrite w-full flex flex-col items-center relative">
        <Image 
                src={footerArch}
                alt=""
                className="text-lightpurple w-full"
            />
        <Image 
                src={logo}
                alt=""
                className="text-lightpurple absolute -bottom-15 md:bottom-10 w-50 md:w-100"
            />
    </div>
  </section>
  );
}