'use client'
import React, {FunctionComponent, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {usePathname} from 'next/navigation';
import Overlay from '@/components/Overlay';
import {useDisableScroll} from '@/components/utils/useDisableScroll';
import Link from 'next/link';
import styles from './navigation.module.scss';
import {classNames} from '@/components/utils/classNames';
import {logoVertical} from '@/components/Layout/LogoVertical';
import {useTranslations} from 'next-intl';
import Figure from '@/components/Sanity/Figure';

interface NavigationProps {
    readonly cover?: { asset?: { _ref: string }};
}
const Navigation: FunctionComponent<NavigationProps> = ({cover}) => {
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
                <div className={styles.siteNavigation}>
                    <Link href={"/"} className={classNames([styles.link, styles.logo])}>
                        {logoVertical}
                    </Link>
                    <Links />
                </div>
                <SmallLinks />
            </div>


            {cover &&
                <div className={styles.coverContainer}>
                    <div className={styles.cover}>
                        <Figure image={cover} fullWidth={true}/>
                    </div>
                </div>
            }

            <Overlay handleClose={() => setShowOverlay(null)} isOpen={showOverlay !== null}>
                {showOverlay === 'menu' &&
                    <NavigationOverlay/>
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

const Links: FunctionComponent = () => {
    const t = useTranslations('Navigation');
    return (
        <>
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
        </>
    )
}

const SmallLinks: FunctionComponent = () => {
    const router = useRouter();
    const t = useTranslations('Navigation');

    return (
        <div className={styles.smallLinks}>
            <a href={"https://goout.net/cs/divadlo-3+kk/pzwidng/"} className={classNames([styles.smallLink])}>
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

