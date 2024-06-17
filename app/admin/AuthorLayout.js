'use client';
import { useContext, useEffect, useState } from 'react';
import AuthorNav from '../components/nav/AuthorNav';
import { AuthContext } from '../context/auth';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import LoadingToRedirect from '../components/LoadingToRedirect';
import { PostProvider } from '../context/post';

const AuthorLayout = ({ children }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (auth?.token) getCurrentAuthor();
  }, [auth?.token]);

  const getCurrentAuthor = async () => {
    try {
      await axios.get('/current-author');
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
    <div className="min-h-screen flex">
      <PostProvider>
      <AuthorNav />
        <main className="flex-grow p-4 bg-gray-900">{children}</main>
      </PostProvider>
    </div>
  );
};

export default AuthorLayout;
