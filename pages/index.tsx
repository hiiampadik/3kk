import Layout from '../components/Layout';
import React, {Fragment} from 'react';
import {revalidateTime, sanityFetch} from '@/sanity/client';
import {GetStaticPropsContext} from 'next';
import {QUERY_HOMEPAGE} from '@/api/homepage';
import {Homepage as HomepageType} from '../api/homepage'
import Link from 'next/link';
import styles from '../styles/homepage.module.scss'
import localizedDate from '@/components/utils/LocalizeDate';
import {useLocale} from '@/components/utils/useLocale';
import localizedTime from '@/components/utils/LocalizeTime';
import BlockContent from '@/components/Sanity/BlockContent';
import {useTranslations} from 'next-intl';

export default function Home({data}: {data: HomepageType}) {
    const locale = useLocale();
    const t = useTranslations('Homepage');

    const program = data.program?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) ?? [];

    // Group by month
    const programByMonth = program.reduce((acc, event) => {
        const month = new Date(event.date).toLocaleString(locale, {year: 'numeric', month: 'long'});
        if (!acc[month]) acc[month] = [];
        acc[month].push(event);
        return acc;
    }, {} as Record<string, typeof program>);

    return (
        <Layout
            cover={data.cover}
            description={data.description}
            seo={data.seo}
        >
            <div className={styles.homepageContainer}>
                <h1>Program</h1>
                {Object.entries(programByMonth).map(([month, events]) => (
                    <Fragment key={month}>
                        <h2 className={styles.monthHeader}>{month}</h2>
                        <ul>
                            {events.map(event => (
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
                                                <BlockContent blocks={event.project.description[locale]}/>
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
                    </Fragment>
                ))}
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
        revalidate: revalidateTime, // two days
    };
}