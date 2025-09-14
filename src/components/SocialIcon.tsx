import Image from "next/image";
import { satoshi } from "./HeroSection";


interface SocialIconProps {
    img: string
    text: string
    url: string
}
export default function SocialIcon(props: SocialIconProps){
    return(
        <div className="">
            <a href={props.url} target="_blank" rel="noopener" className="flex flex-row gap-2 items-center">
                <div className="rounded-full bg-whitemid p-2 w-fit">
                        <Image 
                            src={props.img}
                            alt=""
                            className="text-lightpurple md:w-8"
                        />
                </div>
                <span className={`${satoshi.className} text-whitemid text-lg hidden md:inline`}>{props.text}</span>
            </a>
        </div>
    )
}