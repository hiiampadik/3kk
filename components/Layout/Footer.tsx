import React, {FunctionComponent} from 'react';
import {useLocale} from '@/components/utils/useLocale';
import styles from './index.module.scss'

const Footer: FunctionComponent = () => {
    const locale = useLocale()

    return (
        <div className={styles.footerContainer}>
            {locale === 'en' ?
                <p>En footer</p>
                :
                <p>Cs footer</p>
            }
        </div>
    );
};

export default Footer;
