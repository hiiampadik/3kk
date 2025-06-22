import {defineQuery} from "next-sanity";

export const QUERY_ALL_SLUGS = defineQuery(`{"project": *[_type == "project"]{"slug": slug.current }}`)




