'use client'
import React, {FunctionComponent, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {usePathname} from 'next/navigation';
import Overlay from '@/components/Overlay';
import {useDisableScroll} from '@/components/utils/useDisableScroll';
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
            Navigation
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
    const router = useRouter();
    const t = useTranslations('Navigation');

    return (
        <div>
            Overlay
        </div>
    )
}

