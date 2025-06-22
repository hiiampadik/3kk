import {internalGroqTypeReferenceTo, SanityImageCrop, SanityImageHotspot} from '@/api/sanity.types';

export type Image = {
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
}