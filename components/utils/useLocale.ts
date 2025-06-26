import {useRouter} from 'next/router';

export const useLocale = (): ('cs' | 'en') => {
    const router = useRouter();
    if (router.locale === 'cs'){
        return 'cs'
    }
    return 'en'
}