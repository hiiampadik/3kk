import React from 'react';
import Layout from '@/components/Layout';
import {GetStaticPropsContext} from 'next';
import {sanityFetch} from '@/sanity/client';
import Link from 'next/link';
import {Project as ProjectSanity} from '../api/sanity.types'
import {QUERY_ALL_PROJECTS} from '@/api/queries';

export default function Projects({data}: {data: ProjectSanity[]}) {

    return (
        <Layout>
            {data.map(project => (
                <Link href={`/projects/[slug]`}
                      as={`/projects/${project.slug.current}`}
                      key={project._id}>
                    Project - {project.title.cs}
                </Link>
            ))}
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
        revalidate: 172800, // two days
    };
}
