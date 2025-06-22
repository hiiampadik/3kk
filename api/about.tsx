import {defineQuery} from 'next-sanity';

export const QUERY_ABOUT = defineQuery(`*[_type == 'about'][0]{...}`)

export class About {
    public constructor(
        public readonly Id: string,
    ) {}

    public static fromPayload(payload: any, locale: string): About {
        return new About(
            payload._id
        );
    }
}