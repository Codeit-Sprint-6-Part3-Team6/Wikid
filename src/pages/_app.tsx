import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@components/header/Header";
import { AuthProvider } from "@context/AuthContext";
import { LoadingProvider } from "@context/LoadingContext";
import { ToastProvider } from "@context/ToastContext";
import { WikiTimeLimitProvider } from "@context/WikiTimeLimitContext";
import "@styles/globals.css";
import "@styles/quillCustom.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>weQuiz</title>
      </Head>
      <LoadingProvider>
        <ToastProvider>
          <AuthProvider>
            <WikiTimeLimitProvider>
              <Header />
              <Component {...pageProps} />
            </WikiTimeLimitProvider>
          </AuthProvider>
        </ToastProvider>
      </LoadingProvider>
    </>
  );
}
