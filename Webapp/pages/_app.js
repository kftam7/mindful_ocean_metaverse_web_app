import { SessionProvider } from 'next-auth/react';
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import TagManager from 'react-gtm-module'
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

/*
  SSRProvider and Web3ReactProvider moved to respective layout since they don't work here
*/ 
function MyApp({ Component, pageProps }){
  const router = useRouter();
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-5T552SHN' });

    // Track page views
    const handleRouteChange = (url) => {
      window.dataLayer.push({
        event: 'pageview',
        page: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };

  }, [router.events]);

//single shared layout vs. per-page layout:https://nextjs.org/docs/basic-features/layouts
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
    )
}

export default wrapper.withRedux(MyApp);