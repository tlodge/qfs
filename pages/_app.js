import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react';
import appname from '../lib/appname';
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return <div>
          <Head>
            <title>{appname()}</title>
          </Head>
          <NextUIProvider>
            <Component {...pageProps} />
          </NextUIProvider>
        </div>
}

export default MyApp

