import { Provider } from 'react-redux';
import 'rsuite/dist/rsuite.min.css';
import { useStore } from '../dataStore';
import 'react-multi-carousel/lib/styles.css';
import 'rc-drawer/assets/index.css';
import '../styles/index.css';
import 'typeface-dm-sans';

function TopRatedApp({ Component, pageProps }) {
  const store = useStore();
  return (
      <Provider store={store}>
          <Component {...pageProps} />
      </Provider>
  );
}

export default TopRatedApp;
