'use client'
import React, {FunctionComponent, useRef} from "react";
import styles from './GalleryBlock.module.scss'
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/scrollbar";
import "swiper/css/mousewheel";

import {FreeMode, Mousewheel, Scrollbar} from 'swiper/modules';
import Figure from '@/components/Sanity/Figure';
import {Image} from '@/api/image';


interface GalleryProps {
  readonly images: any[]
}


const GallerySwiper: FunctionComponent<GalleryProps> = ({images}) => {

    const isDragging = useRef(false);

    const handleTouchMove = () => {
        isDragging.current = true;
    };

    const handleTouchEnd = () => {
        setTimeout(() => {
            isDragging.current = false;
        }, 0);
    };


    return (
        <>
            <Swiper
                // loop={true}
                modules={[FreeMode, Scrollbar, Mousewheel]}
                mousewheel={{forceToAxis: true}}
                grabCursor={true}
                loopAdditionalSlides={2}
                freeMode={{enabled: true, momentum: true}}
                slidesPerView={'auto'}
                spaceBetween={'20'}
                className={styles.swiperWrapper}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={image.Id} className={styles.swiperSlide}>
                        <GallerySlide image={image} galleryImage={true}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
)}

export default GallerySwiper


interface GallerySlideProps {
    readonly image: Image
    readonly galleryImage?: boolean
    readonly fullWidth?: boolean
}

const GallerySlide: FunctionComponent<GallerySlideProps> = ({image, galleryImage, fullWidth}) => {
    return (
        <Figure
            image={image}
            alt={image.alt}
            galleryImage={galleryImage}
            fullWidth={fullWidth}
        />
    )
}
