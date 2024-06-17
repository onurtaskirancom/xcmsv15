'use client';
import { useContext, useEffect, useState } from 'react';
import SubscriberNav from './components/nav/SubscriberNav';
import { AuthContext } from './context/auth';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import LoadingToRedirect from './components/LoadingToRedirect';

const SubscriberLayout = ({ children }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (auth?.token) getCurrentAuthor();
  }, [auth?.token]);

  const getCurrentAuthor = async () => {
    try {
      await axios.get('/current-subscriber');
      setLoading(false);
    } catch (err) {
      console.log(err);
      router.push('/');
    }
  };

  if (loading) {
    return <LoadingToRedirect />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SubscriberNav />
      <div className="flex-grow p-4">{children}</div>
    </div>
  );
};

export default SubscriberLayout;
