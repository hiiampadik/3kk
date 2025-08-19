'use client'
import React, {FunctionComponent, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import styles from './loading.module.scss'
import logo from '@/public/logos/loading.svg'


const Loading: FunctionComponent = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const handleStart = (url: string) => {
            if (url !== router.asPath) {
                setLoading(true)
            }
        }
        const handleComplete = () => setLoading(false)

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    }, [router])

    return (
        <>
            {/*{loading &&*/}
            {/*    <div className={styles.loadingContainer}>*/}
            {/*        <img src={logo.src} className={styles.loading}/>*/}
            {/*    </div>*/}
            {/*}*/}
        </>
    )
};

export default Loading;

