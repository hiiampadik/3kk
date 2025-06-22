import Layout from '../components/Layout';
import React from 'react';
import {sanityFetch} from '@/sanity/client';
import {GetStaticPropsContext} from 'next';
import {Homepage, QUERY_HOMEPAGE} from '@/api/homepage';
import {useLocale} from '@/components/utils/useLocale';

export default function Home({data}: any) {
    const locale = useLocale();
    const homepage = Homepage.fromPayload(data, locale)

    return (
        <Layout>
            Homepage {homepage.Id}
        </Layout>
);
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const data = await sanityFetch({query: QUERY_HOMEPAGE, useCdn: false});

    return {
        props: {
            data,
            messages: (await import(`../public/locales/${context.locale}.json`)).default,
        },
        revalidate: 172800, // two days
    };
}