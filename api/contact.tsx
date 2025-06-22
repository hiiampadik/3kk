import {defineQuery} from 'next-sanity';

export const QUERY_CONTACT = defineQuery(`*[_type == 'contact'][0]{...}`)

export class Contact {
    public constructor(
        public readonly Id: string,
    ) {}

    public static fromPayload(payload: any, locale: string): Contact {
        return new Contact(
            payload._id
        );
    }
}