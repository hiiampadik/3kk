import React, {FunctionComponent, PropsWithChildren} from 'react';
import Head from "next/head";
import Navigation from './Navigation';
import Footer from '@/components/Layout/Footer';
import styles from './navigation.module.scss'
import {classNames} from '@/components/utils/classNames';
import {useRouter} from 'next/router';
import {useLocale} from '@/components/utils/useLocale';

export const WEBSITE_NAME = '3+KK'
export const WEBSITE_DESCRIPTION = "We are a progressive theatre"
export const WEBSITE_URL = 'https://www.tripluskk.cz/'

interface LayoutProps {
    readonly title?: string
    readonly loading?: boolean;
    readonly cover?: { asset?: { _ref: string }};
    readonly image?: {
        url: string,
        width: string,
        height: string,
    }
}

const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = (
    {children,
        title,
        loading = undefined,
        image,
        cover
    }) => {

    const pageTitle = title ? title + ` | ${WEBSITE_NAME}` : WEBSITE_NAME
    const router = useRouter()
    const locale = useLocale()
    const getLocale = () => {
        switch (locale) {
            case 'en':
                return 'en_US';  // English locale
            case 'cs':
                return 'cs_CZ';  // Czech locale
        }
    };

    const currentUrl = WEBSITE_URL + router.asPath;

    const jsonLd = {
        '@context': 'https://schema.org',
        "@graph":[
            {
                "@type":"Organization",
                "@id": WEBSITE_URL + "#organization",
                "name":WEBSITE_NAME,
                "url": WEBSITE_URL,
                "sameAs":["https://www.facebook.com/3pluskk","https://www.instagram.com/3pluskk"]
            },
            {
                "@type":"WebSite",
                "@id": WEBSITE_URL + "#website",
                "url":WEBSITE_URL,
                "name":WEBSITE_NAME,
                "publisher":{"@id": WEBSITE_URL + "#organization"},
                'description': WEBSITE_DESCRIPTION
            },
            {
                '@type': 'WebPage',
                "@id": currentUrl + "#website",
                "url": currentUrl,
                'name': pageTitle,
                'description': WEBSITE_DESCRIPTION
            }
        ]
    }

    return (
        <>
            <Head>
                <title>{pageTitle}</title>

                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="keywords"
                      content="TODO"/>
                <meta name="description" content={WEBSITE_DESCRIPTION}/>
                <meta name="robots" content="index, follow"/>
                <meta charSet="utf-8"/>


                <meta property="og:site_name" content={WEBSITE_NAME}/>
                <meta property="og:locale" content={getLocale()}/>
                <meta property="og:title" content={title ?? WEBSITE_NAME}/>
                <meta property="og:description" content={WEBSITE_DESCRIPTION}/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={currentUrl}/>

                {image ?
                    <>
                        <meta property="og:image" content={image.url}/>
                        <meta property="og:image:type" content="image/jpg"/>
                        <meta property="og:image:width" content={image.width}/>
                        <meta property="og:image:height" content={image.height}/>

                        <meta name="twitter:image" content={image.url}/>
                        <meta name="twitter:image:type" content="image/jpg"/>
                        <meta name="twitter:image:width" content={image.width}/>
                        <meta name="twitter:image:height" content={image.height}/>
                    </>
                    :
                    <>
                        <meta property="og:image" content={WEBSITE_URL + 'favicon/web-app-manifest-512x512.png'}/>
                        <meta property="og:image:type" content="image/png"/>
                        <meta property="og:image:width" content={'512'}/>
                        <meta property="og:image:height" content={'512'}/>

                        <meta name="twitter:image" content={WEBSITE_URL + 'favicon/web-app-manifest-512x512.png'}/>
                        <meta name="twitter:image:type" content="image/png"/>
                        <meta name="twitter:image:width" content={'512'}/>
                        <meta name="twitter:image:height" content={'512'}/>
                    </>

                }

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={title ? title + ` | ${WEBSITE_NAME}` : WEBSITE_NAME}/>
                <meta name="twitter:description" content={WEBSITE_DESCRIPTION}/>

                {/*TODO Icons */}

                <meta name="apple-mobile-web-app-title" content={WEBSITE_NAME}/>
            </Head>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />

            <main>
                <Navigation cover={cover}/>
                <div className={classNames([styles.content, loading ? styles.loading : styles.loaded])}>
                    {children}
                </div>
                <Footer/>
            </main>
        </>
    );
};

export default Layout