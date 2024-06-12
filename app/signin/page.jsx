'use client'; 
import Head from 'next/head';
import { useRouter } from 'next/navigation'; 
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/auth';

const SignIn = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // hooks
  const router = useRouter();

  useEffect(() => {
    if (auth?.token) {
      router.push('/');
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post('/signin', { email, password });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // save user and token to context
        setAuth(data);
        // save user and token to local storage
        localStorage.setItem('auth', JSON.stringify(data));
        toast.success('Successfully signed in');
        // redirect user
        if (data?.user?.role === 'Admin') {
          router.push('/admin');
          console.log("başarılı");
        } else if (data?.user?.role === 'Author') {
          router.push('/author');
           console.log('başarılı');
        } else {
          router.push('/subscriber');
           console.log('başarılı');
        }
      }
    } catch (err) {
      console.log('err => ', err);
      setLoading(false);
      toast.error('Signin failed. Try again.');
      console.log("başarısız");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ minWidth: '300px' }}
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none bg-gray-700 text-white"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ minWidth: '300px' }}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
