import Layout from '../components/Layout';
import React from 'react';
import {sanityFetch} from '@/sanity/client';
import {GetStaticPropsContext} from 'next';
import {QUERY_ABOUT} from '@/api/queries';
import {About as AboutSanity} from '../api/sanity.types'
import styles from '../styles/about.module.scss'
import {useTranslations} from 'next-intl';
import BlockContent from '@/components/Sanity/BlockContent';
import {useLocale} from '@/components/utils/useLocale';

export default function About({data}: {data: AboutSanity}) {
    const t = useTranslations('About');
    const locale = useLocale()

    return (
        <Layout>
            <div className={styles.aboutContainer}>
                <h1>{t('about')}</h1>
                <div className={styles.aboutParagraph}>
                    <BlockContent blocks={data.text[locale]} />
                </div>
            </div>
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
