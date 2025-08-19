'use client'
import React, {FunctionComponent, useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import Overlay from '@/components/Overlay';
import {useDisableScroll} from '@/components/utils/useDisableScroll';
import Link from 'next/link';
import styles from './navigation.module.scss';
import {classNames} from '@/components/utils/classNames';
import {useTranslations} from 'next-intl';
import {useLocale} from '@/components/utils/useLocale';
import logo from '@/public/logos/2.svg';
import Figure from '@/components/Sanity/Figure';
import BlockContent from '@/components/Sanity/BlockContent';
import {LocalizedRichParagraph} from '@/api/sanity.types';


interface Props {
    readonly cover?: { asset?: { _ref: string }};
    readonly description?: LocalizedRichParagraph
}


const Navigation: FunctionComponent<Props> = ({cover, description}) => {
    const router = useRouter();
    const locale = useLocale()
    const t = useTranslations('Navigation');

    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        const handleRouteChange = () => {
            setShowOverlay(false);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => router.events.off('routeChangeComplete', handleRouteChange);
    }, [router.events]);

    useDisableScroll(showOverlay)

    return (
        <>
            <div className={classNames([styles.navLeft, router.asPath === '/' && styles.animation])}>
                <nav className={styles.navLeftInner}>
                    <Link href={"/"} className={classNames([styles.link, styles.logo])}>
                        <img src={logo.src} className={styles.logoComplex}/>
                    </Link>
                    <Link
                        href={"/projects"}
                        className={classNames([styles.link, styles.link1])}
                        prefetch={false}>
                        <p>{t('projects')}</p>
                    </Link>
                    <div className={styles.navLeftLinkWrap}>
                        <Link
                            href={"/about"}
                            className={classNames([styles.link, styles.link2])}
                            prefetch={false}
                        >
                            <p>{t('about')}</p>
                        </Link>
                        <Link
                            href={"/contact"}
                            className={classNames([styles.link, styles.link3])}
                            prefetch={false}
                        >
                            <p>{t('contact')}</p>
                        </Link>
                    </div>
                    <Link
                        href={router.asPath}
                        locale={router.locale === "cs" ? "en" : "cs"}
                        className={styles.language}
                        prefetch={false}
                    >
                        <p>{router.locale === "cs" ? "En" : "Cz"}</p>
                    </Link>
                </nav>

                {cover &&
                    <div className={styles.coverContainer}>
                        <div className={styles.cover}>
                            <Figure image={cover} fullWidth={true}/>
                        </div>
                        {description &&
                            <div className={styles.description}>
                                <BlockContent blocks={description[locale]} />
                            </div>
                        }
                    </div>
                }
            </div>

            <div className={styles.navRight}>
                <Link
                    href={router.asPath}
                    locale={router.locale === "cs" ? "en" : "cs"}
                    className={classNames([styles.smallLink, styles.language])}
                    prefetch={false}
                >
                    <p>{router.locale === "cs" ? "En" : "Cz"}</p>
                </Link>
                <a href={"https://goout.net/cs/divadlo-3+kk/pzwidng/"}
                   className={classNames([styles.smallLink, styles.tickets])}>
                    <p>{t('tickets')}</p>
                </a>
            </div>

            <Overlay handleClose={() => setShowOverlay(false)} isOpen={showOverlay} />
        </>
    );
};

export default Navigation;

