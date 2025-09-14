import Image from "next/image";
import logo from '../../public/logo-clara.svg';
import whatsapp from '../../public/whatsapp 2.svg';
import facebook from '../../public/facebook 1.svg';
import email from '../../public/mail-4 1.svg';
import instagram from '../../public/instagram 1.svg';
import SocialIcon from "./SocialIcon";


export default function Footer () {
    return(
        <footer className="flex flex-col bg-darkgreen p-8 pt-15 md:pt-0 items-center md:px-32">
            {/* <Image 
                src={logo}
                alt=""
                className="text-lightpurple"
            /> */}
            <div className="flex flex-row mt-12 gap-8 border-b-2 p-12 w-full justify-center border-t-2 border-t-whitemid md:border-t-0">
                <SocialIcon 
                    img={whatsapp}
                    text="+51 942 194 996"
                    url="https://wa.me/51942194996"
                />
                <SocialIcon 
                    img={email}
                    text="larestinga.atencion@gmail.com"
                    url="mailto:larestinga.atencion@gmail.com"
                />
                <SocialIcon 
                    img={instagram}
                    text="@larestinga.ct"
                    url="https://instagram.com/larestinga.ct"
                />
                <SocialIcon 
                    img={facebook}
                    text="La Restinga CT"
                    url="https://www.facebook.com/people/La-Restinga-CT/61577627636616/"
                />
            </div>
            <span className="text-sm text-center md:text-left mt-6 text-gray-300 md:self-start">© {new Date().getFullYear()} – La Restinga Centro Terapéutico – Todos los derechos reservados.</span>
        </footer>
    )
}