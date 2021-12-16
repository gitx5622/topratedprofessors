import React, { useEffect } from "react";
import { Provider } from 'react-redux';
import 'rsuite/dist/rsuite.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useStore } from '../dataStore';
import 'react-multi-carousel/lib/styles.css';
import 'rc-drawer/assets/index.css';
import '../styles/index.css';
import 'typeface-dm-sans';
import Head from "next/head";

function TopRatedApp({ Component, pageProps }) {

    const store = useStore();

    useEffect(() => {
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function () {
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/5e131d1a7e39ea1242a339d9/1ek9a4lf9';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();
    }, [])
    return (
        <div>
            <Head>
                <title>Toprated Professors</title>
                <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </div>
    );
}

export default TopRatedApp;
