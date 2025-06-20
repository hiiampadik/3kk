import Layout from '../components/Layout';
import styles from '../styles/about.module.scss'
import {useRouter} from 'next/router';
import BlockContent from '@/components/Sanity/BlockContent';
import React from 'react';
import GallerySwiper from '@/components/Sanity/GallerySwiper';
import Figure from '@/components/Sanity/Figure';
import {About as AboutClass} from '@/api/classes'
import {sanityFetch} from '@/sanity/client';
import {QUERY_ABOUT} from '@/sanity/queries';
import {GetStaticPropsContext} from 'next';
import {useTranslations} from 'next-intl';

export default function About({data}: any) {
    const router = useRouter();
    const about = AboutClass.fromPayload(data, router.locale ?? 'cs');
    const t = useTranslations('About');

    return (
        <Layout loading={about === null} title={'About'}>
            ABOUT
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
