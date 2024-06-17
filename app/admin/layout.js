// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import { MediaProvider } from '../context/media';
// import { PostProvider } from '../context/post';
// import { AuthProvider } from '../context/auth';

// const AdminLayout = ({ children, title }) => (
//   <AuthProvider>
//     <MediaProvider>
//       <PostProvider>
//         <div className="flex">
//           <Sidebar />
//           <div className="flex-1 ml-6 p-6">
//             <Header title={title} />
//             {children}
//           </div>
//         </div>
//       </PostProvider>
//     </MediaProvider>
//   </AuthProvider>
// );

// export default AdminLayout;

'use client';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider, AuthContext } from '../context/auth';
import { MediaProvider } from '../context/media';
import { PostProvider } from '../context/post';
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
    // <AuthProvider>
    //   <PostProvider>
    //     <MediaProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-6 p-6">
              <Header title={title} />
              {children}
            </div>
          </div>
    //     </MediaProvider>
    //   </PostProvider>
    // </AuthProvider>
  );
};

export default AdminLayout;
