import logo from '../../public/la-restinga-logo.svg';
import Image from 'next/image'
import { satoshi } from './HeroSection';

export default function Navbar() {
    return(
        <nav className='flex bg-whitemid rounded-r-4xl gap-4 md:gap-32 rounded-l-4xl w-fit px-2 py-1 md:px-4 md:py-2 fixed top-0 z-10 m-5 flex-row justify-between self-center'>
            <div className='flex flex-row items-center'>
                <Image 
                    src={logo}
                    alt='logo'
                    width={200}
                    className='self-center w-42'
                />
            </div>

            <div className='flex flex-row gap-8 items-center'>
                <a href="#about" className={`${satoshi.className} text-darkpurple hidden md:inline`}>Sobre Nosotros</a>
                <a href="#services" className={`${satoshi.className} text-darkpurple hidden md:inline`}>Nuestros Servicios</a>
                <a href="#team" className={`${satoshi.className} text-darkpurple hidden md:inline`}>Nuestro Equipo</a>
                <a href="#faqs" className={`${satoshi.className} text-darkpurple hidden md:inline`}>Dudas</a>
                <a href="#booking" className={`${satoshi.className} bg-lightgreen rounded-l-4xl rounded-r-4xl px-4 py-4 text-darkgreen font-medium`}>Agenda tu consulta</a>

            </div>
        </nav>

    );
}