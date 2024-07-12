import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@components/header/Header";
import { AuthProvider } from "@context/AuthContext";
import { ErrorToastProvider } from "@context/ErrorToastContext";
import { LoadingProvider } from "@context/LoadingContext";
import "@styles/globals.css";
import "@styles/quillCustom.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>weQuiz</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </Head>
      <LoadingProvider>
        <ErrorToastProvider>
          <AuthProvider>
            <Header />
            <Component {...pageProps} />
          </AuthProvider>
        </ErrorToastProvider>
      </LoadingProvider>
    </>
  );
}
