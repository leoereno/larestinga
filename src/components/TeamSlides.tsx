import card1 from '../../public/cards/Mask group.png';
import card2 from '../../public/cards/Mask group-1.png';
import card3 from '../../public/cards/Mask group-2.png';
import card4 from '../../public/cards/Mask group-3.png';
import card5 from '../../public/cards/Mask group-4.png';
import card6 from '../../public/cards/Mask group-5.png';
import card7 from '../../public/cards/Mask group-6.png';
import Slider, { Settings } from "react-slick";
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from './Arrow';

const images = [
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7
];

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: false,
  centerMode: true,
//   arrows: true,
//   nextArrow: <NextArrow previous={false}/>,
//   prevArrow: <NextArrow previous={true}/>,
};

export default function TeamSlides() {
    return(
        <Slider {...settings} className='m-4 w-4xl'>
            {
                images.map((img, index) => (
                    <div key={index}>
                        <Image 
                            src={img}
                            alt=''
                            className=''
                        />
                    </div>
                ))
            }
        </Slider>
    )
}