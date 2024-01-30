// import 'bootstrap/dist/css/bootstrap.min.css'
import Head from "next/head";
import "../public/assets/font-awesome/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import '../public/assets/css/style.css'
import "../public/assets/css/style1.css";
import "../public/assets/css/style2.css";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { gqlClient } from "../utils/providers/apolloClient";
import "@fortawesome/fontawesome-free/css/all.css";

export const apolloClient = gqlClient;

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="../logo-nav.svg"></link>
        <meta name="description" content="SiamcannabisClinic" />
        <meta name="keywords" content="SiamcannabisClinic" />
        <meta property="og:title" content="SiamcannabisClinic" />
        <meta property="og:type" content="SiamcannabisClinic" />
        <meta property="og:type" content="SiamcannabisClinic" />
        <meta property="og:image" content="../logo-nav.png" />
        <title>Siam Cannabis Clinic</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Russo+One&display=swap"
          rel="stylesheet"
        ></link>

        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />

        {/* font Poppins */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
        {/* font Prompt */}
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <SessionProvider session={session}>
        <ApolloProvider client={gqlClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
