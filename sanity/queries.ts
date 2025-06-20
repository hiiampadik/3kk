import {defineQuery} from "next-sanity";

// todo
export const QUERY_ALL_SLUGS = defineQuery(`
   {
  "exhibitions": *[_type == "exhibitions"]{ "slug": slug.current },
  "fairs": *[_type == "fairs"]{ "slug": slug.current },
  "artistsEvents": *[_type == "artistsEvents"]{ "slug": slug.current },
  "artists": *[_type == "artists"]{ "slug": slug.current }
}
`)

// Main pages

export const QUERY_HOMEPAGE = defineQuery(`
    *[_type == 'homepage'][0]{
    ...
}`)

export const QUERY_ABOUT = defineQuery(`
    *[_type == 'about'][0]
`)

// Pages with overview

export const QUERY_ALL_EXHIBITIONS = defineQuery(`*[_type == "exhibitions"] | order(orderRank) {
    _id,
    _type,
    title,
    slug,
    artists,
    openingDate,
    fromDate,
    toDate,
    color,
    cover,
}`)


export const QUERY_EXHIBITION_SLUGS = defineQuery(`
*[_type == "exhibitions" && defined(slug.current)][].slug.current
`)
export const QUERY_EXHIBITION = defineQuery(`
{"event": *[_type == "exhibitions" && slug.current == $slug] | order(_updatedAt desc) [0] {  _id,
    _type,
    title,
    slug,
    artists,
    curators,
    gallerySpace,
    openingDate,
    fromDate,
    toDate,
    color,
    cover,
    textAuthor,
    alternativeTextTitle,
    text,
    gallery,
    artworks[]-> | order(orderRank){
        _id,
        title,
        titleEn,
        year,
        artist->{
            _id,
            name,
            slug,
        },
        showInSelection,
        cover,
        gallery,
    },
    documents[]{
        _key,
        file{
            asset->{
                url,
            }
        },
        alt,
        documentCover,
    }}}
`)