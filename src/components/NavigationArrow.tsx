'use client'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
export default function NavigationArrow(){

return(
<div className="flex space-x-4 justify-center md:hidden">
  <button
    onClick={() => {
      const container = document.getElementById('scroll-container');
      container!.scrollBy({ left: -200, behavior: 'smooth' });
    }}
    className="px-4 py-4 rounded-full bg-lightpurple hover:cursor-pointer text-darkgreen"
  >
    <FaArrowLeft />
  </button>
  <button
    onClick={() => {
      const container = document.getElementById('scroll-container');
      container!.scrollBy({ left: 200, behavior: 'smooth' });
    }}
    className="px-4 py-4 rounded-full bg-lightpurple hover:cursor-pointer text-darkgreen"
  >
    <FaArrowRight/>
  </button>
</div>
)

}