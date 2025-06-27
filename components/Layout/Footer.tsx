import React, {FunctionComponent} from 'react';
import styles from './footer.module.scss'
import {useTranslations} from 'next-intl';
import logo1 from './partners/kaznice.png'
import logo2 from './partners/teren_logo_A.svg'
import logo3 from './partners/andcrblack-7.jpg'
import logo4 from './partners/bnd.svg'

const Footer: FunctionComponent = () => {

    const t = useTranslations('Footer');

    return (
        <div className={styles.footerContainer}>
            <div className={styles.leftContainer}>
                <div className={styles.socials}>
                    <a href={'https://www.facebook.com/3pluskk'} target={'_blank'}>FB</a>
                    <a href={'https://www.instagram.com/3pluskk/'} target={'_blank'}>IG</a>
                </div>
                <div className={styles.telMail}>
                    <a href="mailto:tripluskk@gmail.com">tripluskk@gmail.com</a><br/>
                    <a href="tel:+420777414563">(+420) 777 414 563</a>
                </div>
            </div>

            <div className={styles.rightContainer}>
                <div>
                    <p>
                        Divadlo 3+kk z.s.<br/>
                        Nové sady 988/2<br/>
                        602 00 Brno
                    </p>
                    <p>
                        IČO: 09537279
                    </p>
                </div>
                <div>
                    <p>
                        {t('partners')}
                    </p>
                    <div className={styles.logos}>
                        <img src={logo1.src} />
                        <img src={logo2.src} />
                        <img src={logo3.src} />
                        <img src={logo4.src} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
