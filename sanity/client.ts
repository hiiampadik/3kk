import {createClient, type QueryParams} from 'next-sanity'

const client = createClient({
    projectId: 'akuo9oaj', // you can find this in sanity.json
    dataset: 'production', // or the name you chose in step 1
    useCdn: true, // `false` if you want to ensure fresh data
    apiVersion: '2025-06-20', // use current date (YYYY-MM-DD) to target the latest API version
    // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

export default client;

// export const revalidate = 172800;
export const revalidateTime = 180;

export async function sanityFetch<const QueryString extends string>(
    {   query,
        params = {},
        revalidate = revalidateTime, // two days, // default revalidation time in seconds
        useCdn = true,
        tags = []
    }: {
    query: QueryString
    params?: QueryParams
    revalidate?: number | false
    useCdn?: boolean
    tags?: string[]
}) {
    return client
        .withConfig({useCdn: useCdn})
        .fetch(query, params, {
        next: {
            revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
            tags, // for tag-based revalidation
        },
    })
}

