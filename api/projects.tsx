import {defineQuery} from 'next-sanity';

export const QUERY_ALL_PROJECTS_SLUGS = defineQuery(`*[_type == "project" && defined(slug.current)][].slug.current`)

export const QUERY_ALL_PROJECTS = defineQuery(`*[_type == "project"] {
    _id,
    title,
    slug,
}`)


export class Project {
    public constructor(
        public readonly Id: string,
        public readonly Title: string,
        public readonly Slug: string,
    ) {}

    public static fromPayload(payload: any, locale: string): Project {
        return new Project(
            payload._id,
            payload.title[locale],
            payload.slug.current,
        );
    }
}



export const QUERY_PROJECT_DETAILS = defineQuery(`
{"project": *[_type == "project" && slug.current == $slug][0] {  
    _id,
    title,
    slug,
}}`)