import { useState, useContext, useEffect } from 'react';
import {
  HiOutlineAdjustments,
  HiOutlineArrowsExpand,
  HiMenu,
  HiOutlineCog,
  HiUserAdd,
  HiUser,
  HiEmojiHappy,
  HiLogout,
} from 'react-icons/hi';
import ToggleTheme from './ToggleTheme';
import Link from 'next/link';
import { AuthContext } from '../context/auth';
import { useRouter } from 'next/navigation';

const TopNav = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const signOut = () => {
    localStorage.removeItem('auth');
    setAuth({ user: null, token: '' });
    router.push('/signin');
  };

  const roleBasedLink = () => {
    if (auth?.user?.role === 'Admin') return '/admin';
    if (auth?.user?.role === 'Author') return '/author';
    return '/subscriber';
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="bg-gray-900 fixed w-full z-50">
        <nav className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <Link href="/">
              <img
                src="/images/onurtaskiran-logo.png"
                alt="onur-taskiran"
                className="h-12 w-12"
              />
            </Link>
            <div className="hidden md:flex ml-4">
              <Link href="/" className="ml-4 text-white flex items-center">
                <HiOutlineArrowsExpand className="h-6 w-6 mr-2" />
                Home
              </Link>
              <Link href="/posts" className="ml-4 text-white flex items-center">
                <HiMenu className="h-6 w-6 mr-2" />
                Posts
              </Link>
              <Link href="/about" className="ml-4 text-white flex items-center">
                <HiEmojiHappy className="h-6 w-6 mr-2" />
                About
              </Link>
              <Link
                href="/contact"
                className="ml-4 text-white flex items-center"
              >
                <HiOutlineAdjustments className="h-6 w-6 mr-2" />
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {auth?.user === null ? (
              <div className="hidden md:flex">
                <Link
                  href="/signup"
                  className="ml-auto text-white flex items-center"
                >
                  <HiUserAdd className="h-6 w-6 mr-2" />
                  Signup
                </Link>
                <Link
                  href="/signin"
                  className="ml-4 text-white flex items-center"
                >
                  <HiUser className="h-6 w-6 mr-2" />
                  Signin
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex">
                <div className="relative ml-auto">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="text-white flex items-center focus:outline-none"
                  >
                    <HiOutlineCog className="h-6 w-6 mr-2" />
                    {auth?.user?.name || 'Dashboard'}
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                      <Link
                        href={roleBasedLink()}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </div>
                  )}
                </div>
                <button
                  onClick={signOut}
                  className="ml-4 text-white flex items-center"
                >
                  <HiLogout className="h-6 w-6 mr-2" />
                  Sign out
                </button>
              </div>
            )}
            <div className="ml-4 hidden md:block">
              <ToggleTheme className="h-12" />
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white ml-4 md:hidden focus:outline-none"
            >
              <HiMenu className="h-6 w-6" />
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="md:hidden bg-gray-900 text-white">
            <Link href="/" className="block px-4 py-2">
              Home
            </Link>
            <Link href="/posts" className="block px-4 py-2">
              Posts
            </Link>
            <Link href="/about" className="block px-4 py-2">
              About
            </Link>
            <Link href="/contact" className="block px-4 py-2">
              Contact
            </Link>
            {auth?.user === null ? (
              <>
                <Link href="/signup" className="block px-4 py-2">
                  Signup
                </Link>
                <Link href="/signin" className="block px-4 py-2">
                  Signin
                </Link>
              </>
            ) : (
              <>
                <Link href={roleBasedLink()} className="block px-4 py-2">
                  Dashboard
                </Link>
                <button
                  onClick={signOut}
                  className="block w-full text-left px-4 py-2"
                >
                  Sign out
                </button>
              </>
            )}
            <div className="px-4 py-2">
              <ToggleTheme className="h-12" />
            </div>
          </div>
        )}
      </div>
      <div className="pt-16">
        {/* This div adds the top padding to push the content down */}
      </div>
    </>
  );
};

export default TopNav;
