import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

interface ArrowProps {
    previous: boolean
}

export default function Arrow (props: ArrowProps) {
    return (

        <button className="text-blackwrite">
            {props.previous ? <FaArrowLeft /> : <FaArrowRight />}
            
        </button>

    )
}
