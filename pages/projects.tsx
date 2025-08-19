import React, {useMemo, useState} from 'react';
import Layout from '@/components/Layout';
import {GetStaticPropsContext} from 'next';
import {revalidateTime, sanityFetch} from '@/sanity/client';
import Link from 'next/link';
import {Project as ProjectSanity} from '../api/sanity.types'
import {QUERY_ALL_PROJECTS} from '@/api/queries';
import Figure from '@/components/Sanity/Figure';
import styles from '../styles/projects.module.scss'
import {useTranslations} from 'next-intl';
import {useLocale} from '@/components/utils/useLocale';
import BlockContent from '@/components/Sanity/BlockContent';

export default function Projects({data}: {data: ProjectSanity[]}) {
    const t = useTranslations('Projects');
    const locale = useLocale()
    const [filter, setFilter] = useState<'archived' | 'ongoing' | 'planned'>('ongoing')

    const projects = useMemo(() => {
        return data
            .filter(project => project.status === filter)
            .sort((a, b) => new Date(b.premiere).getTime() - new Date(a.premiere).getTime());
    }, [filter])

    return (
        <Layout title={t('projects')}>
            <div className={styles.projectsContainer}>
                <h1>{t('projects')}</h1>
                <div className={styles.filterContainer}>
                    <button className={filter === 'archived' ? styles.selected : ''} onClick={() => setFilter('archived')}>{t('archived')}</button>
                    <button className={filter === 'ongoing' ? styles.selected : ''} onClick={() => setFilter('ongoing')}>{t('ongoing')}</button>
                    <button className={filter === 'planned' ? styles.selected : ''} onClick={() => setFilter('planned')}>{t('planned')}</button>
                </div>
                <ul className={styles.projectsList}>
                    {projects.map(project => (
                        <li key={project._id}>
                            <Link href={`/projects/[slug]`}
                                  as={`/projects/${project.slug.current}`}
                                  key={project._id}>
                                <div className={styles.cover}>
                                    {project.cover &&
                                        <Figure image={project.cover} />
                                    }
                                </div>
                                <h2>{project.title[locale]}</h2>
                                <BlockContent blocks={project.description[locale]} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const data: ProjectSanity[] = await sanityFetch({query: QUERY_ALL_PROJECTS, useCdn: false});

    return {
        props: {
            data,
            messages: (await import(`../public/locales/${context.locale}.json`)).default,
        },
        revalidate: revalidateTime, // two days
    };
}
