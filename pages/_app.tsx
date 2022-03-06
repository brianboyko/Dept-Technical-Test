import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { store } from '../store';
import { Provider } from 'react-redux';

if (process.env.NODE_ENV !== 'production') {
  console.log(`Environment is ${process.env.NODE_ENV}`);
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
