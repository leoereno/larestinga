import Image from "next/image";
import refugio from "../../public/Un refugio para la mente y el corazón.svg";
import mask1 from "../../public/mask1.svg";
import mask2 from "../../public/Mask group-1.svg";

import localFont from "next/font/local";

const canpileDrawn = localFont({
    src: '../../public/fonts/CanpileDrawn-Regular.otf'
})

export default function Hero(){
    return(
        <div className="bg-[url(/herobg.png)] relative text-darkpurple">
                <p className={`${canpileDrawn.className} bg-[url(/mask2.svg)] bg-center bg-no-repeat w-fit text-center md:text-6xl md:px-12 md:m-16 md:y-6`}>Un refugio para la</p>
            <p>mente y el corazón</p>
        </div>
    )
}