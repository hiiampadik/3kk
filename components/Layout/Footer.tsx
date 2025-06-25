import React, {FunctionComponent} from 'react';
import styles from './index.module.scss'

const Footer: FunctionComponent = () => {

    // todo content

    return (
        <div className={styles.footerContainer}>
            <div className={styles.leftContainer}>
                <div className={styles.socials}>
                    <a href={''} target={'_blank'}>FB</a>
                    <a href={''} target={'_blank'}>IG</a>
                </div>
                <div className={styles.telMail}>
                    <a href="mailto:brona.musil@gmail.com">brona.musil@gmail.com</a><br/>
                    <a href="tel:+420721290235">+420 721 290 235</a>
                </div>
            </div>

            <div className={styles.rightContainer}>
                <div>
                    <p>Sídlo</p>
                    <p>IČO</p>
                </div>
                <div>
                    Partneři
                    <div className={styles.logos}>
                        <div>LOGO</div>
                        <div>LOGO</div>
                        <div>LOGO</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
