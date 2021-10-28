import Head from "next/head";

export default function CustomHead({ pageTitle }) {
  const title =
    pageTitle && pageTitle !== ""
      ? pageTitle
      : "MIMDB | Middlebury Movie Database";

    
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link
        rel="alt icon"
        type="image/png"
        href="favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="alt tiny icon"
        type="image/png"
        href="favicon-16x16.png"
        sizes="16x16"
      />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      <meta property="og:image" content="/mimdb-socialshare.jpg" />
      <meta property="og:image:width" content="528" />
      <meta property="og:image:height" content="117" />
    </Head>
  );
}
