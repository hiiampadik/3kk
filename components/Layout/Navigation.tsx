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
import {LocalizedRichParagraph} from '@/api/sanity.types';
import BlockContent from '@/components/Sanity/BlockContent';
import {useLocale} from '@/components/utils/useLocale';

interface NavigationProps {
    readonly cover?: { asset?: { _ref: string }};
    readonly description?: LocalizedRichParagraph
}

const Navigation: FunctionComponent<NavigationProps> = ({cover, description}) => {
    const router = useRouter();
    const locale = useLocale()

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
                <div className={styles.siteNavigation}>
                    <Link href={"/"} className={classNames([styles.link, styles.logo])}>
                        {logoVertical}
                    </Link>
                    <Links />
                    <button className={styles.menu} onClick={() => setShowOverlay(e => !e)}>
                        Menu
                    </button>
                </div>
                <SmallLinks />
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

            <Overlay handleClose={() => setShowOverlay(false)} isOpen={showOverlay}>
                <div className={styles.overlayMenu}>
                    <Links />
                </div>
            </Overlay>
        </>
    );
};

export default Navigation;


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

