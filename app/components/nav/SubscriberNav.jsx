import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useWindowWidth } from '@react-hook/window-size';
import { AuthContext } from '../../context/auth';
import { CogIcon, UserIcon, ChatIcon } from '@heroicons/react/outline';

const SubscriberNav = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('');
  const onlyWidth = useWindowWidth();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrent(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (onlyWidth < 800) {
      setCollapsed(true);
    } else if (onlyWidth > 800) {
      setCollapsed(false);
    }
  }, [onlyWidth]);

  const activeName = (name) => (current === name ? 'active' : '');

  return (
    <div
      className={`min-h-screen ${collapsed ? 'w-16' : 'w-64'} transition-all`}
    >
      <nav className="bg-gray-800 h-full">
        <ul className="space-y-2">
          <li className={activeName('/subscriber')}>
            <Link
              className="flex items-center p-2 text-gray-400 hover:text-white"
              href="/subscriber"
            >
              <CogIcon className="h-6 w-6" />
              <span className={`${collapsed ? 'hidden' : 'ml-4'}`}>
                Dashboard
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SubscriberNav;
