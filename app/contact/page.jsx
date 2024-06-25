'use client';
import React from 'react';
import ThemeContext from '../context/theme';
import { useContext } from 'react';
import ScrollButton from '../components/ScrollButton';

const Contact = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen flex justify-center pt-10 ${
        theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-white text-black'
      }`}
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">Contact</h2>
        </div>
        <div className="mt-8 text-center">
          <a
            href="mailto:onurtaskirancom@gmail.com"
            className="text-blue-400 hover:text-blue-300"
          >
            onurtaskirancom@gmail.com
          </a>
        </div>
      </div>
      <ScrollButton />
    </div>
  );
};

export default Contact;
