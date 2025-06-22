import Layout from '../components/Layout';
import React from 'react';
import {sanityFetch} from '@/sanity/client';
import {GetStaticPropsContext} from 'next';
import {QUERY_ABOUT} from '@/api/queries';
import {About as AboutSanity} from '../api/sanity.types'

export default function About({data}: {data: AboutSanity}) {
    return (
        <Layout>
            About {data._id}
        </Layout>
    );
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const data: AboutSanity = await sanityFetch({query: QUERY_ABOUT, useCdn: false});

    return {
        props: {
            data,
            messages: (await import(`../public/locales/${context.locale}.json`)).default,
        },
        revalidate: 172800, // two days
    };
}
