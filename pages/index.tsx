import Layout from '../components/Layout';
import React from 'react';
import {sanityFetch} from '@/sanity/client';
import {GetStaticPropsContext} from 'next';
import {QUERY_HOMEPAGE} from '@/api/homepage';
import {Homepage as HomepageType} from '../api/homepage'
import Link from 'next/link';
import styles from '../styles/homepage.module.scss'
import LocalizedDate from '@/components/utils/LocalizeDate';
import localizedDate from '@/components/utils/LocalizeDate';
import {useLocale} from '@/components/utils/useLocale';
import localizedTime from '@/components/utils/LocalizeTime';
import BlockContent from '@/components/Sanity/BlockContent';
import {useTranslations} from 'next-intl';

export default function Home({data}: {data: HomepageType}) {
    const locale = useLocale()
    const t = useTranslations('Homepage');

    return (
        <Layout cover={data.cover} description={data.description}>
            <div className={styles.homepageContainer}>
                <h1>Program</h1>
                <ul>
                    {data.program?.map(event => (
                        <li key={event._key}>
                            <Link href={`/projects/[slug]`}
                                  as={`/projects/${event.project.slug.current}`}
                                  key={event.project._id}
                                  className={styles.linkContainer}
                            >
                                <div className={styles.dateContainer}>
                                    <p className={styles.date}>{localizedDate(event.date, locale)}</p>
                                    <p className={styles.time}>
                                        {localizedTime(event.date, locale)}
                                    </p>
                                    <p className={styles.location}>
                                        {event.location}
                                    </p>
                                </div>
                                <div className={styles.nameContainer}>
                                    <h2>{event.project.title[locale]}</h2>
                                    <div className={styles.description}>
                                        <BlockContent blocks={event.project.description[locale]} />
                                    </div>
                                </div>
                            </Link>
                            <div className={styles.externalLinks}>
                            {event.facebook &&
                                <a href={event.facebook} className={styles.fb}>Fb</a>
                            }
                            {event.ticket &&
                                <a href={event.ticket} className={styles.tickets}>{t('tickets')}</a>
                            }
                            </div>

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