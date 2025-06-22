import Layout from '../components/Layout';
import React from 'react';
import {sanityFetch} from '@/sanity/client';
import {GetStaticPropsContext} from 'next';
import {Contact as ContactSanity} from '../api/sanity.types'
import {QUERY_CONTACT} from '@/api/queries';

export default function Contact({data}: {data: ContactSanity}) {


    return (
        <Layout>
            Contact
            {data._id}
            {data.contacts?.map(contact => contact.name?.cs)}
            {data.team?.map(member => member.name)}
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
        revalidate: 172800, // two days
    };
}
