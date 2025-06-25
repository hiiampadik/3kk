import Layout from '../components/Layout';
import React from 'react';
import {sanityFetch} from '@/sanity/client';
import {GetStaticPropsContext} from 'next';
import {QUERY_HOMEPAGE} from '@/api/homepage';
import {Homepage as HomepageType} from '../api/homepage'
import Link from 'next/link';
import Figure from '@/components/Sanity/Figure';
import styles from '../styles/homepage.module.scss'

export default function Home({data}: {data: HomepageType}) {

    return (
        <Layout>
            <div className={styles.homepageContainer}>
                {/*<div className={styles.coverContainer}>*/}
                {/*    <Figure image={data.cover} />*/}
                {/*</div>*/}
                <h1>Program</h1>
                <ul>
                    {data.program?.map(event => (
                        <li key={event._key}>
                            <Link href={`/projects/[slug]`}
                                  as={`/projects/${event.project.slug.current}`}
                                  key={event.project._id}
                                  className={styles.linkContainer}
                            >
                                <div className={styles.date}>
                                    Date
                                </div>
                                <div className={styles.name}>
                                    <h2>{event.project.title['cs']}</h2>
                                </div>
                            </Link>
                            <a href={'todo'} className={styles.tickets}>Tickets</a>
                        </li>
                    ))}
                </ul>

            </div>
        </Layout>
);
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const data: HomepageType = await sanityFetch({query: QUERY_HOMEPAGE, useCdn: false});

    return {
        props: {
            data,
            messages: (await import(`../public/locales/${context.locale}.json`)).default,
        },
        revalidate: 172800, // two days
    };
}