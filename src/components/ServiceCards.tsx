import { satoshi } from "./HeroSection";

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
                const lines = s.title.split('\n');
                return (
                    <div className={`${satoshi.className} w-sm flex flex-col gap-2`} key={i}>
                        {/* <Image 
                            src={sketchTopic}
                            alt=""
                        /> */}
                        {lines.map((l,i) => (
                            <span key={i} className="bg-lightgreen text-blackwrite px-1 font-bold w-fit">{l}</span>
                        ))}
                        {/* <h4 className={`bg-lightgreen text-blackwrite px-1 font-bold`}>{s.title}</h4> */}
                        <span className="text-blackwrite px-1">{s.description}</span>
                    </div>
                )
            })}
        </div>
    )
}