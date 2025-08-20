import {groq} from 'next-sanity';
import {
    internalGroqTypeReferenceTo, LocalizedRichParagraph,
    LocalizedString,
    SanityImageCrop,
    SanityImageHotspot, Seo,
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
        cover,
    }
  }
}`

export type HomepageProject = {
    _id: string
    title: LocalizedString
    slug: Slug
    description: LocalizedRichParagraph
    cover?: {
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
}

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
        project: HomepageProject
        date: string
        location: string
        ticket?: string
        facebook?: string
        tag?: LocalizedString
        _type: 'event'
        _key: string
    }>
    seo: Seo
}