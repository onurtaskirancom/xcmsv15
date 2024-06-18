'use client';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useWindowWidth } from '@react-hook/window-size';
import { AuthContext } from '../../context/auth';
import { CogIcon } from '@heroicons/react/outline';
import {
  FaComments,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

const SubscriberNav = ({ children }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [current, setCurrent] = useState('');
  const onlyWidth = useWindowWidth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrent(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (onlyWidth < 800) {
      setIsSidebarOpen(false);
    } else if (onlyWidth > 800) {
      setIsSidebarOpen(true);
    }
  }, [onlyWidth]);

  const activeName = (name) => (current === name ? 'active' : '');

  return (
    <div className="flex h-full">
      <div
        className={`bg-gray-800 text-white fixed h-full transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className={`text-2xl font-bold ${!isSidebarOpen && 'hidden'}`}>
            Admin Panel
          </h2>
          <button onClick={toggleSidebar}>
            {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>
        <nav className="mt-10">
          <ul>
            <li className={activeName('/subscriber')}>
              <Link
                className="flex items-center p-2  hover:bg-gray-700"
                href="/subscriber"
              >
                <CogIcon className="h-6 w-6" />
                {isSidebarOpen && <span className="ml-4">Dashboard</span>}
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <Link
                href="/subscriber/comments"
                className="flex items-center w-full"
              >
                <FaComments className="mr-2" />
                {isSidebarOpen && 'Comments'}
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <Link
                href={`/subscriber/${auth?.user?._id}`}
                className="flex items-center w-full"
              >
                <FaUser className="mr-2" />
                {isSidebarOpen && 'Profile'}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default SubscriberNav;
