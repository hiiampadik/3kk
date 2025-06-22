import {defineQuery} from "next-sanity";

export const QUERY_ALL_SLUGS = defineQuery(`{"project": *[_type == "project"]{"slug": slug.current }}`)
export const QUERY_ALL_PROJECTS_SLUGS = defineQuery(`*[_type == "project" && defined(slug.current)][].slug.current`)
export const QUERY_ALL_PROJECTS = defineQuery(`*[_type == "project"] {...}`)

export const QUERY_CONTACT = defineQuery(`*[_type == 'contact'][0]{...}`)
export const QUERY_ABOUT = defineQuery(`*[_type == 'about'][0]{...}`)
export const QUERY_PROJECT_DETAILS = defineQuery(`{"project": *[_type == "project" && slug.current == $slug][0] {...}}`)