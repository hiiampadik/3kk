'use client'
import React, {FunctionComponent, useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import Overlay from '@/components/Overlay';
import {useDisableScroll} from '@/components/utils/useDisableScroll';
import Link from 'next/link';
import styles from './navigation.module.scss';
import {classNames} from '@/components/utils/classNames';
import {logoVertical, logoVerticalSimple} from '@/components/Layout/LogoVertical';
import {useTranslations} from 'next-intl';
import {useLocale} from '@/components/utils/useLocale';


const Navigation: FunctionComponent = () => {
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
            <nav className={styles.navigationContainer}>
                <div className={classNames([styles.navigationDevice, styles.desktop])}>
                    <div className={styles.navigationInner}>
                        <Link href={"/"} className={classNames([styles.link, styles.logo])}>{logoVertical}</Link>
                        <Link
                            href={"/projects"}
                            className={classNames([styles.link, styles.link1])}
                            prefetch={false}>
                            {t('repertoire')}
                        </Link>
                        <div className={styles.inner}>
                            <Link
                                href={"/about"}
                                className={classNames([styles.link, styles.link2])}
                                prefetch={false}
                            >
                                {t('about')}
                            </Link>
                            <Link
                                href={"/contact"}
                                className={classNames([styles.link, styles.link3])}
                                prefetch={false}
                            >
                                {t('contact')}
                            </Link>
                        </div>
                    </div>

                    <div className={styles.smallLinks}>
                        <a href={"https://goout.net/cs/divadlo-3+kk/pzwidng/"}
                           className={classNames([styles.smallLink, styles.tickets])}>
                            <p>{t('tickets')}</p>
                        </a>

                        <Link
                            href={router.asPath}
                            locale={router.locale === "cs" ? "en" : "cs"}
                            className={classNames([styles.smallLink])}
                            prefetch={false}
                        >
                            <p>{router.locale === "cs" ? "En" : "Cz"}</p>
                        </Link>
                    </div>
                </div>

                <div className={classNames([styles.navigationDevice, styles.tablet])}>
                    <div className={styles.navigationInner}>
                        <Link href={"/"} className={classNames([styles.link, styles.logo])}>{logoVertical}</Link>
                        <button className={styles.menu} onClick={() => setShowOverlay(e => !e)}>Menu</button>
                    </div>
                    <div className={styles.smallLinks}>
                        <Link
                            href={router.asPath}
                            locale={router.locale === "cs" ? "en" : "cs"}
                            className={classNames([styles.smallLink])}
                            prefetch={false}
                        >
                            <p>{router.locale === "cs" ? "En" : "Cz"}</p>
                        </Link>
                    </div>
                </div>


                <div className={classNames([styles.navigationDevice, styles.mobile])}>
                    <Link href={"/"}
                          className={styles.logoSimple}>{logoVerticalSimple}</Link>
                    <button className={styles.menu} onClick={() => setShowOverlay(e => !e)}>Menu</button>

                    <Link
                        href={router.asPath}
                        locale={router.locale === "cs" ? "en" : "cs"}
                        prefetch={false}
                        className={styles.language}
                    >
                        <p>{router.locale === "cs" ? "En" : "Cz"}</p>
                    </Link>
                </div>


            </nav>


            <Overlay handleClose={() => setShowOverlay(false)} isOpen={showOverlay} />
        </>
    );
};

export default Navigation;


export const SmallLinks: FunctionComponent = () => {
    const router = useRouter();
    const t = useTranslations('Navigation');

    return (
        <div className={styles.smallLinks}>
            <a href={"https://goout.net/cs/divadlo-3+kk/pzwidng/"} className={classNames([styles.smallLink, styles.tickets])}>
                <p>{t('tickets')}</p>
            </a>

            <Link
                href={router.asPath}
                locale={router.locale === "cs" ? "en" : "cs"}
                className={classNames([styles.smallLink])}
                prefetch={false}
            >
                <p>{router.locale === "cs" ? "En" : "Cz"}</p>
            </Link>
        </div>
    )
}

