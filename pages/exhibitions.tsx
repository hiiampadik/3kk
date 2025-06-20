import {useRouter} from 'next/router';
import React from 'react';
import Layout from '@/components/Layout';
import {GetStaticPropsContext} from 'next';

export default function Exhibitions() {
    const router = useRouter();

    return (
        <Layout title={'todo'}>

        </Layout>
    );
}

export async function getStaticProps(context: GetStaticPropsContext) {
    // todo fetch
    return {
        props: {
            messages: (await import(`../public/locales/${context.locale}.json`)).default,
        }};
}
