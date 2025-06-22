import React, {FunctionComponent} from 'react';
import {useLocale} from '@/components/utils/useLocale';

const Footer: FunctionComponent = () => {
    const locale = useLocale()

    return (
        <div>
            {locale === 'en' ?
                <p>En footer</p>
                :
                <p>Cs footer</p>
            }
        </div>
    );
};

export default Footer;
