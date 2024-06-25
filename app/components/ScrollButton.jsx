'use client';
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-4 right-4 bg-blue-300 text-white p-2 rounded-full shadow-md transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={scrollToTop}
      style={{ display: visible ? 'inline' : 'none' }}
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollButton;
