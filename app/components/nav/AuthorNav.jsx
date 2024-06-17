'use client';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  HiClipboardList,
  HiOutlinePlus,
  HiOutlineLibrary,
  HiCamera,
  HiOutlineCog,
  HiOutlineUser,
  HiOutlineBookOpen,
  HiChatAlt,
} from 'react-icons/hi';
import {
  FaChevronDown,
  FaChevronUp,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { AuthContext } from '../../context/auth';

const AuthorNav = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  // state
  const [activeDropdowns, setActiveDropdowns] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [current, setCurrent] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrent(window.location.pathname);
    }
  }, []);

  const activeName = (name) => (current === name ? 'bg-gray-700' : '');

  const handleNavigation = (url) => {
    router.push(url);
    setCurrent(url); // Mevcut yolu güncellemek için
  };

  return (
    <div
      className={`min-h-screen flex h-full ${
        isSidebarOpen ? 'w-64' : 'w-16'
      } transition-all`}
    >
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
            <li
              className={`px-4 py-2 hover:bg-gray-700 flex items-center cursor-pointer ${activeName(
                '/author'
              )}`}
              onClick={() => handleNavigation('/author')}
            >
              <HiOutlineCog className="mr-2" />
              {isSidebarOpen && 'Dashboard'}
            </li>
            <li className="relative group">
              <div
                onClick={() => toggleDropdown('posts')}
                className={`w-full px-4 py-2 flex justify-between items-center text-left cursor-pointer ${
                  isSidebarOpen ? 'hover:bg-gray-700' : ''
                }`}
              >
                <span className="flex items-center">
                  <HiClipboardList className="mr-2" />
                  {isSidebarOpen && 'Posts'}
                </span>
                {isSidebarOpen &&
                  (activeDropdowns.posts ? <FaChevronUp /> : <FaChevronDown />)}
              </div>
              <ul
                className={`pl-4 ${
                  isSidebarOpen
                    ? activeDropdowns.posts
                      ? 'block'
                      : 'hidden'
                    : 'absolute left-16 top-0 mt-2 w-48 bg-gray-700 hidden group-hover:block'
                }`}
              >
                <li
                  className={`px-4 py-2 hover:bg-gray-700 flex items-center cursor-pointer ${activeName(
                    '/author/posts'
                  )}`}
                  onClick={() => handleNavigation('/author/posts')}
                >
                  <HiOutlineBookOpen className="mr-2" />
                  {isSidebarOpen && 'All Posts'}
                </li>
                <li
                  className={`px-4 py-2 hover:bg-gray-700 flex items-center cursor-pointer ${activeName(
                    '/author/posts/new'
                  )}`}
                  onClick={() => handleNavigation('/author/posts/new')}
                >
                  <HiOutlinePlus className="mr-2" />
                  {isSidebarOpen && 'Add New'}
                </li>
              </ul>
            </li>
            <li className="relative group">
              <div
                onClick={() => toggleDropdown('media')}
                className={`w-full px-4 py-2 flex justify-between items-center text-left cursor-pointer ${
                  isSidebarOpen ? 'hover:bg-gray-700' : ''
                }`}
              >
                <span className="flex items-center">
                  <HiCamera className="mr-2" />
                  {isSidebarOpen && 'Media'}
                </span>
                {isSidebarOpen &&
                  (activeDropdowns.media ? <FaChevronUp /> : <FaChevronDown />)}
              </div>
              <ul
                className={`pl-4 ${
                  isSidebarOpen
                    ? activeDropdowns.media
                      ? 'block'
                      : 'hidden'
                    : 'absolute left-16 top-0 mt-2 w-48 bg-gray-700 hidden group-hover:block'
                }`}
              >
                <li
                  className={`px-4 py-2 hover:bg-gray-700 flex items-center cursor-pointer ${activeName(
                    '/author/media/library'
                  )}`}
                  onClick={() => handleNavigation('/author/media/library')}
                >
                  <HiOutlineLibrary className="mr-2" />
                  {isSidebarOpen && 'Library'}
                </li>
                <li
                  className={`px-4 py-2 hover:bg-gray-700 flex items-center cursor-pointer ${activeName(
                    '/author/media/new'
                  )}`}
                  onClick={() => handleNavigation('/author/media/new')}
                >
                  <HiOutlinePlus className="mr-2" />
                  {isSidebarOpen && 'Add New'}
                </li>
              </ul>
            </li>
            <li
              className={`px-4 py-2 hover:bg-gray-700 flex items-center cursor-pointer ${activeName(
                '/author/comments'
              )}`}
              onClick={() => handleNavigation('/author/comments')}
            >
              <HiChatAlt className="mr-2" />
              {isSidebarOpen && 'Comments'}
            </li>
            <li
              className={`px-4 py-2 hover:bg-gray-700 flex items-center cursor-pointer ${activeName(
                `/author/${auth?.user?._id}`
              )}`}
              onClick={() => handleNavigation(`/author/${auth?.user?._id}`)}
            >
              <HiOutlineUser className="mr-2" />
              {isSidebarOpen && 'Profile'}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AuthorNav;
