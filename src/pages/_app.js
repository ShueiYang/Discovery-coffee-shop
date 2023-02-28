import '@/styles/globals.css'
import localFont from '@next/font/local'
// import { IBM_Plex_Sans } from '@next/font/google'
import StoreProvider from '@/store/store-provider';
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import PageLoader from '@/components/pageLoader';
import Footer from '@/components/footer';

const ibmFontRegular = localFont({
  src: '../../public/fonts/IBMPlexSans-Regular.ttf',
  subsets: ['latin'],
  weight: '500',
  variable: '--font-IbmPlex'
});


export default function App({ Component, pageProps }) {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const handleStart = (url) => {
      setLoading(true)
    }
    const handleComplete = (url) => {
      setLoading(false)
    }
    const handleError = (err, url) => {
      if(err.cancelled) {
        console.log(`Route to ${url} was cancelled!`)
        setLoading(false)
      }
    }
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);
    
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleError);
    };
  }, [router.events]);
    
  return (
    <div className={ibmFontRegular.className}>
      <StoreProvider>
      { loading ? 
        <PageLoader /> :  
        <Component {...pageProps}/>
      }   
      </StoreProvider>
      <Footer />
    </div>
  );
}; 
      