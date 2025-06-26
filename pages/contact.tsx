import Layout from '../components/Layout';
import React from 'react';
import {sanityFetch} from '@/sanity/client';
import {GetStaticPropsContext} from 'next';
import {Contact as ContactSanity} from '../api/sanity.types'
import {QUERY_CONTACT} from '@/api/queries';
import styles from '@/styles/contact.module.scss';
import BlockContent from '@/components/Sanity/BlockContent';
import {useTranslations} from 'next-intl';
import {useLocale} from '@/components/utils/useLocale';
import Figure from '@/components/Sanity/Figure';

export default function Contact({data}: {data: ContactSanity}) {
    const t = useTranslations('Contact');
    const locale = useLocale()

    return (
        <Layout>
            <div className={styles.contactContainer}>
                <h1>{t('contact')}</h1>
                <div className={styles.addressContainer}>
                    <BlockContent blocks={data.contacts[locale]}/>
                    <BlockContent blocks={data.address[locale]}/>
                </div>

                <div className={styles.teamContainer}>
                    <h2>{t('team')}</h2>
                    <div className={styles.teamList}>
                    {data.team?.map((member, index) => (
                        <div key={index}>
                            <div className={styles.cover}>
                                   {member.photo &&
                                       <Figure image={member.photo} />
                                   }
                            </div>
                            <h3>{member.name}</h3>
                            <p>{member.role[locale]}</p>
                        </div>
                    ))}
                    </div>
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
        revalidate: 172800, // two days
    };
}
