import {defineQuery} from 'next-sanity';

export const QUERY_HOMEPAGE = defineQuery(`*[_type == 'homepage'][0]{...}`)


export class Homepage {
    public constructor(
        public readonly Id: string,
    ) {}

    public static fromPayload(payload: any, locale: string): Homepage {
        return new Homepage(
            payload._id,
        );
    }
}
