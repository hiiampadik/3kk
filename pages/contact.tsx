import Layout from '../components/Layout';
import React from 'react';
import {sanityFetch} from '@/sanity/client';
import {GetStaticPropsContext} from 'next';
import {useLocale} from '@/components/utils/useLocale';
import {Contact as ContactClass, QUERY_CONTACT} from '@/api/contact';

export default function Contact({data}: any) {
    const locale = useLocale();
    const contact = ContactClass.fromPayload(data, locale);

    return (
        <Layout>
            Contact {contact.Id}
        </Layout>
    );
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const data = await sanityFetch({query: QUERY_CONTACT, useCdn: false});

    return {
        props: {
            data,
            messages: (await import(`../public/locales/${context.locale}.json`)).default,
        },
        revalidate: 172800, // two days
    };
}
