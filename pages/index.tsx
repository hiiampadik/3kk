import Layout from '../components/Layout';
import React from 'react';
import {useRouter} from 'next/router';
import {Homepage} from '@/api/classes';
import client, {sanityFetch} from '@/sanity/client';
import {QUERY_HOMEPAGE} from '@/sanity/queries';
import {getImageDimensions} from '@sanity/asset-utils';
import imageUrlBuilder from '@sanity/image-url';
import {GetStaticPropsContext} from 'next';
import {useTranslations} from 'next-intl';

export default function Home({data}: any) {
    const router = useRouter();
    const homepage = Homepage.fromPayload(data, router.locale ?? 'cs')
    const coverDimensions = getImageDimensions(homepage.Cover)
    const builder = imageUrlBuilder(client);
    const t = useTranslations('Homepage');

    return (
        <Layout
            image={{
                url: builder.image(homepage.Cover).auto("format").width(480).quality(60).url(),
                height: coverDimensions.height.toString(),
                width: coverDimensions.width.toString(),
            }}
        >
            HOMEPAGE
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