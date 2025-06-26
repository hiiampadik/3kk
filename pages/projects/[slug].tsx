import React from "react";
import {GetStaticPropsContext} from 'next';
import {sanityFetch} from '@/sanity/client';
import Layout from '@/components/Layout';
import {Project as ProjectSanity} from '../../api/sanity.types'
import {QUERY_ALL_PROJECTS_SLUGS, QUERY_PROJECT_DETAILS} from '@/api/queries';
import styles from '../../styles/project.module.scss'
import {useLocale} from '@/components/utils/useLocale';
import BlockContent from '@/components/Sanity/BlockContent';

export default function Project({data}: {data: ProjectSanity}) {
    const locale = useLocale()
    return (
        <Layout
            title={'todo'}
            cover={data.cover}
        >
            <div className={styles.projectContainer}>
                <h1>{data.title[locale]}</h1>
                <div className={styles.projectDetail}>
                    <div className={styles.team}>
                        {data.team?.map(member => (
                            <div className={styles.member}>
                                <p className={styles.role}>{member.role[locale]}{':'}</p>
                                <p className={styles.name}>{member.name}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        {/*<div className={styles.program}>*/}
                        {/*    TODO*/}
                        {/*</div>*/}
                        <div className={styles.abstract}>
                            <BlockContent blocks={data.abstract[locale]}/>
                        </div>
                    </div>

                </div>
            </div>

        </Layout>
    )
}

export async function getStaticPaths() {
    const slugs = await sanityFetch({query: QUERY_ALL_PROJECTS_SLUGS, useCdn: false});
    const locales = ['cs', 'en'];
    const paths = slugs.flatMap((slug: string) =>
        locales.map((locale) => ({
            params: { slug },
            locale,
        }))
    );
    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const data: {project: ProjectSanity} = await sanityFetch({query: QUERY_PROJECT_DETAILS, params: {slug: context.params?.slug}, useCdn: false});
    return {
        props: {
            data: data.project,
            messages: (await import(`../../public/locales/${context.locale}.json`)).default,
        },
        revalidate: 172800, // two days
    };
}
