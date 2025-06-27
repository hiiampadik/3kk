'use client'
import React, {FunctionComponent} from 'react';
import {Overlay2} from '@blueprintjs/core';
import styles from './index.module.scss';
import {classNames} from '@/components/utils/classNames';
import {useTranslations} from 'next-intl';
import Link from 'next/link';

interface OverlayProps {
    readonly isOpen?: boolean
    readonly handleClose: () => void
    readonly scrollable?: boolean
}

const Overlay: FunctionComponent<OverlayProps> = ({isOpen = true, scrollable = false, handleClose}) => {
    const t = useTranslations('Navigation');
    return (
        <>
            {isOpen &&
                <Overlay2
                    isOpen={true}
                    onClose={() => handleClose()}
                    hasBackdrop={true}
                >
                    <div className={classNames([styles.container, scrollable ? styles.scrollable : styles.notScrollable])}>
                        <button onClick={() => handleClose()} className={styles.close}>
                            {t('close')}
                        </button>
                        <div className={styles.inner}>
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
                        </div>
                    </div>
                </Overlay2>
            }
        </>
    )

}

export default Overlay