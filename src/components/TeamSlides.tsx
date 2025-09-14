import card1 from '../../public/cards/Mask group.png';
import card2 from '../../public/cards/Mask group-1.png';
import card3 from '../../public/cards/Mask group-2.png';
import card4 from '../../public/cards/Mask group-3.png';
import card5 from '../../public/cards/Mask group-4.png';
import card6 from '../../public/cards/Mask group-5.png';
import card7 from '../../public/cards/Mask group-6.png';
import Image from 'next/image';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const images = [
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7
];


export default function TeamSlides() {
    return(
        <Swiper
            modules={[Navigation]}
            spaceBetween={0}
            // slidesPerView={1}
            breakpoints={{
                0: {
                    slidesPerView: 1
                },

                768: {
                    slidesPerView: 2
                }
            }}
            navigation
            initialSlide={2}
            loop
            className='custom-swiper'
            // style={{padding: '0 12px'}}
        >
            {images.map((img, index) => (
                <SwiperSlide key={index}>
                    <Image 
                        src={img}
                        alt=''
                        className=''
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}