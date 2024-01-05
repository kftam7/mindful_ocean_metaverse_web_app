import { SSRProvider } from '@react-aria/ssr';
import { useState } from "react";
import Head from "next/head";
import SubNavBar from './SubNav';
import SubFoot from './SubFoot';

//the app has two types of layout, this page cited by pages which don't include Nav and footer
const SubpageLayout = ({ children }) => {
    const [locale, setLocale] = useState('');

    const changeLocale = (newLocale) => {
        setLocale(newLocale);
    };

    return (
        <SSRProvider>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <SubNavBar onLocaleChange={changeLocale} />
            <main key={locale} style={{ marginTop: '120px', marginBottom: '207px' }}>
                {children}
            </main>
            <SubFoot />
        </SSRProvider>
    )
}

export default SubpageLayout;