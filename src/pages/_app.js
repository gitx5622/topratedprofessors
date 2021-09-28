import { Provider } from 'react-redux';
import Head from 'next/head';
import { useStore } from '../dataStore';
import 'react-multi-carousel/lib/styles.css';
import 'rc-drawer/assets/index.css';
import '../styles/index.css';
import 'typeface-dm-sans';

function TopRatedApp({ Component, pageProps }) {
  const store = useStore();
  return (
      <Provider store={store}>
          <Head>
              <title>Toprated Professors</title>
              <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
          </Head>
          <Component {...pageProps} />
      </Provider>
  );
}

export default TopRatedApp;
