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
import {internalGroqTypeReferenceTo, SanityImageCrop, SanityImageHotspot} from '@/api/sanity.types';


interface GalleryProps {
  readonly gallery: Array<{
      image: {
          asset?: {
              _ref: string
              _type: 'reference'
              _weak?: boolean
              [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
          }
          media?: unknown
          hotspot?: SanityImageHotspot
          crop?: SanityImageCrop
          _type: 'image'
      }
      alt?: string
      _key: string
  }>
}


const GallerySwiper: FunctionComponent<GalleryProps> = ({gallery}) => {

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
                {gallery.map((image, index) => (
                    <SwiperSlide key={image._key} className={styles.swiperSlide}>
                        <GallerySlide image={image.image} galleryImage={true}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
)}

export default GallerySwiper


interface GallerySlideProps {
    readonly image: {
        asset?: {
            _ref: string
            _type: 'reference'
            _weak?: boolean
            [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
        }
        media?: unknown
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        _type: 'image'
    }
    readonly galleryImage?: boolean
    readonly fullWidth?: boolean
}

const GallerySlide: FunctionComponent<GallerySlideProps> = ({image, galleryImage, fullWidth}) => {
    return (
        <Figure
            image={image}
            alt={'TODO'}
            galleryImage={galleryImage}
            fullWidth={fullWidth}
        />
    )
}
