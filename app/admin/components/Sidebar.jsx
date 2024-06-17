'use client'
import { useState, useContext } from 'react';
import Link from 'next/link';
import {
  FaChevronDown,
  FaChevronUp,
  FaTachometerAlt,
  FaClipboardList,
  FaPlus,
  FaTags,
  FaThLarge,
  FaImages,
  FaComments,
  FaUser,
  FaUserPlus,
  FaUserFriends,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { AuthContext } from '../../context/auth';

const Sidebar = ({ children }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  // state
  const [isMediaDropdownOpen, setIsMediaDropdownOpen] = useState(false);
  const [isUsersDropdownOpen, setIsUsersDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMediaDropdown = () => {
    setIsMediaDropdownOpen(!isMediaDropdownOpen);
  };

  const toggleUsersDropdown = () => {
    setIsUsersDropdownOpen(!isUsersDropdownOpen);
  };

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
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <Link
                href="/admin/dashboard"
                className="flex items-center w-full"
              >
                <FaTachometerAlt className="mr-2" />
                {isSidebarOpen && 'Dashboard'}
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <Link href="/admin/posts" className="flex items-center w-full">
                <FaClipboardList className="mr-2" />
                {isSidebarOpen && 'All Posts'}
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <Link
                href="/admin/posts/new"
                className="flex items-center w-full"
              >
                <FaPlus className="mr-2" />
                {isSidebarOpen && 'Create New Post'}
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <Link
                href="/admin/categories"
                className="flex items-center w-full"
              >
                <FaThLarge className="mr-2" />
                {isSidebarOpen && 'Categories'}
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <Link href="/admin/tags" className="flex items-center w-full">
                <FaTags className="mr-2" />
                {isSidebarOpen && 'Tags'}
              </Link>
            </li>
            <li className={`relative ${isSidebarOpen ? '' : 'group'}`}>
              <div
                onClick={isSidebarOpen ? toggleMediaDropdown : undefined}
                className={`w-full px-4 py-2 flex justify-between items-center text-left cursor-pointer ${
                  isSidebarOpen ? 'hover:bg-gray-700' : ''
                }`}
              >
                <span className="flex items-center">
                  <FaImages className="mr-2" />
                  {isSidebarOpen && 'Media'}
                </span>
                {isSidebarOpen &&
                  (isMediaDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
              </div>
              <ul
                className={`pl-4 ${
                  isSidebarOpen
                    ? isMediaDropdownOpen
                      ? 'block'
                      : 'hidden'
                    : 'absolute left-16 top-0 mt-2 w-48 bg-gray-700 hidden group-hover:block'
                }`}
              >
                <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
                  <Link
                    href="/admin/media"
                    className="flex items-center w-full"
                  >
                    <FaImages className="mr-2" />
                    {isSidebarOpen && 'All Media'}
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
                  <Link
                    href="/admin/media/new"
                    className="flex items-center w-full"
                  >
                    <FaPlus className="mr-2" />
                    {isSidebarOpen && 'Media New'}
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`relative ${isSidebarOpen ? '' : 'group'}`}>
              <div
                onClick={isSidebarOpen ? toggleUsersDropdown : undefined}
                className={`w-full px-4 py-2 flex justify-between items-center text-left cursor-pointer ${
                  isSidebarOpen ? 'hover:bg-gray-700' : ''
                }`}
              >
                <span className="flex items-center">
                  <FaUserFriends className="mr-2" />
                  {isSidebarOpen && 'Users'}
                </span>
                {isSidebarOpen &&
                  (isUsersDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
              </div>
              <ul
                className={`pl-4 ${
                  isSidebarOpen
                    ? isUsersDropdownOpen
                      ? 'block'
                      : 'hidden'
                    : 'absolute left-16 top-0 mt-2 w-48 bg-gray-700 hidden group-hover:block'
                }`}
              >
                <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
                  <Link
                    href="/admin/users"
                    className="flex items-center w-full"
                  >
                    <FaUser className="mr-2" />
                    {isSidebarOpen && 'All Users'}
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
                  <Link
                    href="/admin/users/new"
                    className="flex items-center w-full"
                  >
                    <FaUserPlus className="mr-2" />
                    {isSidebarOpen && 'Add New User'}
                  </Link>
                </li>
              </ul>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <Link href="/admin/comments" className="flex items-center w-full">
                <FaComments className="mr-2" />
                {isSidebarOpen && 'Comments'}
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <Link
                href={`/admin/${auth?.user?._id}`}
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

export default Sidebar;








