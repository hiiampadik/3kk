import Layout from '../components/Layout';
import React from 'react';
import {revalidateTime, sanityFetch} from '@/sanity/client';
import {GetStaticPropsContext} from 'next';
import {Contact as ContactSanity} from '../api/sanity.types'
import {QUERY_CONTACT} from '@/api/queries';
import styles from '@/styles/contact.module.scss';
import BlockContent from '@/components/Sanity/BlockContent';
import {useTranslations} from 'next-intl';
import {useLocale} from '@/components/utils/useLocale';

export default function Contact({data}: {data: ContactSanity}) {
    const t = useTranslations('Contact');
    const locale = useLocale()

    return (
        <Layout seo={data.seo} title={t('contact')}>
            <div className={styles.contactContainer}>
                <h1>{t('contact')}</h1>
                <div className={styles.addressContainer}>
                    <BlockContent blocks={data.contacts[locale]}/>
                    <BlockContent blocks={data.address[locale]}/>
                </div>
            </div>
        </Layout>
    );
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const data: ContactSanity = await sanityFetch({query: QUERY_CONTACT, useCdn: false});

    return {
        props: {
            data,
            messages: (await import(`../public/locales/${context.locale}.json`)).default,
        },
        revalidate: revalidateTime, // two days
    };
}
