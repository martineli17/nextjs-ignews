import { Header } from '../components/Header'
import '../styles/global.scss'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { AppProps } from 'next/dist/shared/lib/router/router'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextAuthProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
      </NextAuthProvider>
    </>
  )
}

export default MyApp
