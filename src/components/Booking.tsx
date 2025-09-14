import BookingCalendar from "./BookingCalendar";
import { canpileDrawn } from "./HeroSection";

export default function BookingSection() {
  return (
  <section className=" bg-lightpurple md:py-16 flex flex-col items-center px-8 md:px-24" id="booking">
    <div className={`${canpileDrawn.className} flex flex-col gap-4 w-fit text-darkpurple`}>
            <span className="text-4xl underline max-w-full text-center md:text-left underline-offset-4">05</span>
            <h2 className="text-3xl md:text-5xl font-semibold text-center">Agenda tu Consulta</h2>
    </div>
    <BookingCalendar />
  </section>
  );
}