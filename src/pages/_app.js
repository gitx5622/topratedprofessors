import { Provider } from 'react-redux';
import 'rsuite/dist/rsuite.min.css';
import { useStore } from '../dataStore';
import 'react-multi-carousel/lib/styles.css';
import 'rc-drawer/assets/index.css';
import '../styles/index.css';
import 'typeface-dm-sans';
import Head from "next/head";
import React from "react";

function TopRatedApp({ Component, pageProps }) {
  const store = useStore();
  return (
      <div>
      <Head>
          <title>Toprated Professors</title>
          <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      </Head>
      <Provider store={store}>
          <Component {...pageProps} />
      </Provider>
      </div>
  );
}

export default TopRatedApp;
