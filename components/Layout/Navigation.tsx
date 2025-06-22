'use client'
import React, {FunctionComponent, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {usePathname} from 'next/navigation';
import Overlay from '@/components/Overlay';
import {useDisableScroll} from '@/components/utils/useDisableScroll';
import Link from 'next/link';


const Navigation: FunctionComponent = () => {
    const router = useRouter();
    const currentPath = usePathname();

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
            <Link
                href={"/"}
                prefetch={false}
            >
                Homepage
            </Link>
            <Link
                href={"/about"}
                className={currentPath?.startsWith('/about') ? '' : ''}
                prefetch={false}
            >
                About
            </Link>
            <Link
                href={"/projects"}
                className={currentPath?.startsWith('/projects') ? '' : ''}
                prefetch={false
            }>
                Projects
            </Link>

            <Link
                href={router.asPath}
                locale={router.locale === "cs" ? "en" : "cs"}
                prefetch={false}
            >
                {router.locale === "cs" ? "EN" : "CZ"}
            </Link>

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

