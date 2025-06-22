import Layout from '../components/Layout';
import React from 'react';
import {About as AboutClass, QUERY_ABOUT} from '@/api/about'
import {sanityFetch} from '@/sanity/client';
import {GetStaticPropsContext} from 'next';
import {useLocale} from '@/components/utils/useLocale';

export default function About({data}: any) {
    const locale = useLocale();
    const about = AboutClass.fromPayload(data, locale);

    return (
        <Layout>
            About {about.Id}
        </Layout>
    );
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const data = await sanityFetch({query: QUERY_ABOUT, useCdn: false});

    return {
        props: {
            data,
            messages: (await import(`../public/locales/${context.locale}.json`)).default,
        },
        revalidate: 172800, // two days
    };
}
