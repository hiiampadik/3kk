import {groq} from 'next-sanity';
import {
    internalGroqTypeReferenceTo, LocalizedRichParagraph,
    LocalizedString,
    SanityImageCrop,
    SanityImageHotspot,
    Slug
} from '@/api/sanity.types';

export const QUERY_HOMEPAGE = groq`*[_type == 'homepage'][0]{
...,
program[]{
    ...,
    project->{
        _id,
        title,
        slug,
        description,
    }
  }
}`

export type Homepage = {
    _id: string
    _type: 'homepage'
    _createdAt: string
    _updatedAt: string
    _rev: string
    cover: {
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
    description: LocalizedRichParagraph
    program?: Array<{
        project: {
            _id: string
            title: LocalizedString
            slug: Slug
            description: LocalizedRichParagraph
        }
        date: string
        location: string
        ticket?: string
        facebook?: string
        tag?: LocalizedString
        _type: 'event'
        _key: string
    }>
}