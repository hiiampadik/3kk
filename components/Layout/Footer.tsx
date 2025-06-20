import React, {FunctionComponent} from 'react';
import {useRouter} from 'next/router';

const Footer: FunctionComponent = () => {
    const router = useRouter();

    return (
        <div>
            {router.locale === 'en' ?
                <p>En footer</p>
                :
                <p>Cs footer</p>
            }
        </div>
    );
};

export default Footer;
