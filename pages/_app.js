// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react';
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: {session, ...pageProps}}) {
  return (
    <>
    <SessionProvider session={session}> 
    <NextUIProvider>
      
      <Component {...pageProps} />
      
    </NextUIProvider>
    </SessionProvider>
    </>
  );
}
export default MyApp;


