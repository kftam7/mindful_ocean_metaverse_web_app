import { SSRProvider } from '@react-aria/ssr';
import { useEffect, useState } from "react";
import Head from "next/head";
import SubNavBar from './SubNav';
import SubFoot from './SubFoot';

//the app has two types of layout, this page cited by pages which don't include Nav and footer
const SubpageLayout = ({ children }) => {
    const [locale, setLocale] = useState('');
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        const pathname = window.location.pathname;
        setPathname(pathname)
    },[])

    const changeLocale = (newLocale) => {
        setLocale(newLocale);
    };
    
    return (
        <SSRProvider>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="MindfulOcean" />
            </Head>
            <SubNavBar onLocaleChange={changeLocale} />
            <main key={locale} style={pathname === '/faq' ? { marginTop: '120px', marginBottom: '207px' } : { marginTop: '120px' }}>
                {children}
            </main>
            <SubFoot isFootFixed={pathname === '/faq' ? true : false} />
        </SSRProvider>
    )
}

export default SubpageLayout;