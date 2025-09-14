import { satoshi } from "./HeroSection";
import sketchTopic from '../../public/sketch-topic.svg';
import Image from "next/image";

type Service = {
    title: string;
    description: string;
}
interface ServiceCardProps {
    services: Service[];
}

export default function ServiceCards(props: ServiceCardProps){
    return(
        <div>
            {props.services.map((s,i) => {
                return (
                    <div className={`${satoshi.className} w-42`} key={i}>
                        <Image 
                            src={sketchTopic}
                            alt=""
                        />
                        <h4 className={`bg-lightgreen text-blackwrite px-1 font-bold`}>{s.title}</h4>
                        <span className="text-blackwrite px-1">{s.description}</span>
                    </div>
                )
            })}
        </div>
    )
}