import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@components/Header";
import { AuthProvider } from "@context/AuthContext";
import { useAuth } from "@context/AuthContext";
import { getProfile } from "@lib/api/profileApi";
import { getUserInfo } from "@lib/api/userApi";
import "@styles/globals.css";
import "@styles/quillCustom.css";

export default function App({ Component, pageProps }: AppProps) {
  let isLoggedIn = false;
  if (Cookies.get("accessToken")) {
    isLoggedIn = true;
  }
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Wikid</title>
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          as="style"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          />
        </noscript>
      </Head>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
