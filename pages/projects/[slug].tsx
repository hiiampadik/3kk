import React from "react";
import {GetStaticPropsContext} from 'next';
import {sanityFetch} from '@/sanity/client';
import Layout from '@/components/Layout';
import {QUERY_ALL_PROJECTS_SLUGS, QUERY_PROJECT_DETAILS} from '@/api/projects';

export default function Project({data}: any) {


    return (
        <Layout
            title={'todo'}
        >
            TODO
        </Layout>
    )
}

export async function getStaticPaths() {
    const slugs = await sanityFetch({query: QUERY_ALL_PROJECTS_SLUGS, useCdn: false});
    const locales = ['cs', 'en'];
    const paths = slugs.flatMap((slug: string) =>
        locales.map((locale) => ({
            params: { slug },
            locale,
        }))
    );
    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const data = await sanityFetch({query: QUERY_PROJECT_DETAILS, params: {slug: context.params?.slug}, useCdn: false});
    return {
        props: {
            data: data,
            messages: (await import(`../../public/locales/${context.locale}.json`)).default,
        },
        revalidate: 172800, // two days
    };
}
