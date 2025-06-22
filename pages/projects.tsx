import React from 'react';
import Layout from '@/components/Layout';
import {GetStaticPropsContext} from 'next';
import {sanityFetch} from '@/sanity/client';
import {Project, QUERY_ALL_PROJECTS} from '@/api/projects';
import Link from 'next/link';
import {useLocale} from '@/components/utils/useLocale';


export default function Projects({data}: any) {
    const locale = useLocale();
    const projects: Project[] = data.map((value: any) => Project.fromPayload(value, locale))

    return (
        <Layout>
            {projects.map(project => (
                <Link href={`/projects/[slug]`}
                      as={`/projects/${project.Slug}`}
                      key={project.Slug}>
                    Project - {project.Title}
                </Link>
            ))}
        </Layout>
    );
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const data = await sanityFetch({query: QUERY_ALL_PROJECTS, useCdn: false});

    return {
        props: {
            data,
            messages: (await import(`../public/locales/${context.locale}.json`)).default,
        },
        revalidate: 172800, // two days
    };
}
