'use client';
import Link from 'next/link';
import { useContext } from 'react';
import ThemeContext from './context/theme'; 

const NotFound = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { theme } = context;

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        theme === 'dark'
          ? 'bg-gray-950 text-white'
          : 'bg-gray-100 text-gray-900'
      }`}
    >
      <h2 className="text-6xl font-bold mb-4">404</h2>
      <p className="text-2xl mb-8">Could not find the requested resource</p>
      <Link href="/">
        <div
          className={`px-6 py-3 rounded-md ${
            theme === 'dark'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-500 text-white'
          } hover:bg-blue-700 transition-colors duration-300 cursor-pointer`}
        >
          Return Home
        </div>
      </Link>
    </div>
  );
};

export default NotFound;
