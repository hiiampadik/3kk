import Layout from '../components/Layout';
import React from 'react';
import {useRouter} from 'next/router';
import {GetStaticPropsContext} from 'next';
import styles from '../styles/notFound.module.scss'
export default function NotFound() {
    const router = useRouter();

    return (
        <Layout title={'Page Not Found'}>
            <section className={styles.notFoundContainer}>
                <h2>
                    {router.locale === 'cs' ?
                        `Tato stránka neexistuje!`
                        :
                        `Page Not Found!`
                    }
                </h2>
            </section>
        </Layout>
    );
}


export async function getStaticProps(context: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../public/locales/${context.locale}.json`)).default,
        }};
}
