'use client'
import {FunctionComponent, PropsWithChildren} from 'react';
import {Overlay2} from '@blueprintjs/core';
import styles from './index.module.scss';
import {classNames} from '@/components/utils/classNames';
import {useTranslations} from 'next-intl';

interface OverlayProps {
    readonly isOpen?: boolean
    readonly handleClose: () => void
    readonly className?: string;
    readonly scrollable?: boolean
}

const Overlay: FunctionComponent<PropsWithChildren<OverlayProps>> = ({isOpen = true, scrollable = false, handleClose, children, className}) => {
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
                        {children}
                    </div>
                </Overlay2>
            }
        </>
    )

}

export default Overlay