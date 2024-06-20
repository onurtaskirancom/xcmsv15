'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './context/auth';
import { PostProvider } from './context/post';
import { MediaProvider } from './context/media';
import { ThemeProvider } from './context/theme';
import { Toaster } from 'react-hot-toast';
import TopNav from '../app/components/TopNav';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Onur Taskiran Blog',
//   description: 'WEb Developer Personal Home Page',
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-TNMWFBYJN0`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-TNMWFBYJN0');
          `,
          }}
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Onur Taskiran's personal blog web site. I share posts in software, design, video game, cinema, sports, etc."
        ></meta>
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/images/favicon-16x16.png" type="image/x-icon" />
        <link rel="icon" href="/images/favicon-32x32.png" type="image/x-icon" />
        <link
          rel="icon"
          href="/images/android-chrome-192x192.png"
          type="image/x-icon"
        />
        <link
          rel="icon"
          href="/images/android-chrome-512x512.png"
          type="image/x-icon"
        />
        <link
          rel="icon"
          href="/images/apple-touch-icon.png"
          type="image/x-icon"
        />
      </head>
      <body className={inter.className}>
        <Toaster />
        <ThemeProvider>
          <AuthProvider>
            <PostProvider>
              <MediaProvider>
                <TopNav />
                {children}
              </MediaProvider>
            </PostProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
