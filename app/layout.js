'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './context/auth';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Onur Taskiran Blog',
//   description: 'WEb Developer Personal Home Page',
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Onur Taskiran's personal blog web site. I share posts in software, design, video game, cinema, sports, etc."
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Toaster />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
