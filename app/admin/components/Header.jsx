import Head from 'next/head';

const Header = ({ title }) => (
  <Head>
    <title>{title ? `${title} - Admin Panel` : 'Admin Panel'}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Admin panel for managing blog content" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export default Header;
