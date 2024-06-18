'use client';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/auth';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LoadingToRedirect from '../components/LoadingToRedirect';
import axios from 'axios';

const AdminLayout = ({ children, title }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [loading, setLoading] = useState(true);
  // hooks
  const router = useRouter();

  useEffect(() => {
    if (auth?.token) getCurrentAdmin();
  }, [auth?.token]);

  const getCurrentAdmin = async () => {
    try {
      await axios.get('/current-admin');
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
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-6 p-6">
              <Header title={title} />
              {children}
            </div>
          </div>
  );
};

export default AdminLayout;
