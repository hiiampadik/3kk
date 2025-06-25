'use client'
import React, {FunctionComponent, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {usePathname} from 'next/navigation';
import Overlay from '@/components/Overlay';
import {useDisableScroll} from '@/components/utils/useDisableScroll';
import Link from 'next/link';
import styles from './index.module.scss';
import {classNames} from '@/components/utils/classNames';
import {logoVertical} from '@/components/Layout/LogoVertical';
import {useTranslations} from 'next-intl';

const Navigation: FunctionComponent = () => {
    const router = useRouter();
    const currentPath = usePathname();
    const t = useTranslations('Navigation');

    const [showOverlay, setShowOverlay] = useState<'menu' | null>(null);


    useEffect(() => {
        const handleRouteChange = () => {
            setShowOverlay(null);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => router.events.off('routeChangeComplete', handleRouteChange);
    }, [router.events]);

    useDisableScroll(showOverlay !== null)

    return (
        <>
            <div className={styles.navigationContainer}>
                <div className={styles.navigationLeftContainer}>
                    <Link href={"/"} className={classNames([styles.link, styles.logo])}>
                        {logoVertical}
                    </Link>
                </div>
                <div className={styles.navigationRightContainer}>
                    <Link
                        href={"/projects"}
                        className={classNames([styles.link, styles.link1])}
                        prefetch={false}>
                        {t('repertoire')}
                    </Link>
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

                    <a
                        href={"https://goout.net/cs/divadlo-3+kk/pzwidng/"}
                        className={classNames([styles.link, styles.link4])}
                    >
                        {t('tickets')}
                    </a>


                    <Link
                        href={router.asPath}
                        locale={router.locale === "cs" ? "en" : "cs"}
                        className={classNames([styles.link, styles.language])}
                        prefetch={false}
                    >
                        {router.locale === "cs" ? "En" : "Cz"}
                    </Link>
                </div>
            </div>

            <Overlay handleClose={() => setShowOverlay(null)} isOpen={showOverlay !== null}>
                {showOverlay === 'menu' &&
                    <NavigationOverlay />
                }
            </Overlay>
        </>
    );
};

export default Navigation;

const NavigationOverlay: FunctionComponent = () => {
    return (
        <div>
            Overlay
        </div>
    )
}

