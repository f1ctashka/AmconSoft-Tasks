import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Custom404 from '@/pages/404';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
}

export default App;