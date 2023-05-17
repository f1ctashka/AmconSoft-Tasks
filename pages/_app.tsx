import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Custom404 from '@/pages/404';

const App = ({ Component, pageProps, router }: AppProps) => {
  const { asPath } = router;

  const is404Page = asPath === '/404';
  if (is404Page) {
    return <Custom404 />;
  }

  return <Component {...pageProps} />;
}

export default App;