import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';

import '../styles/globals.css';
import 'aos/dist/aos.css';

import { useEffect } from 'react';
import AOS from 'aos';

import LayoutWrapper from '@/components/LayoutWrapper';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }, []);

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [router.pathname]); // triggered on route change

  return (
    <SessionProvider session={session}>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </SessionProvider>
  );
}

export default MyApp;
