'use client';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../../context/auth';
import { MediaContext } from '../../../context/media';
import Media from '../media';

const ProfileUpdate = ({ page = 'admin' }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [media, setMedia] = useContext(MediaContext);
  // state
  const [userDetails, setUserDetails] = useState({
    id: '',
    name: '',
    email: '',
    website: '',
    password: '',
    role: '',
    image: {},
  });
  const [loading, setLoading] = useState(false);
  // hooks
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const url = new URL(window.location.href);
      const userId = url.pathname.split('/').pop();

      if (userId && auth?.token) {
        try {
          const { data } = await axios.get(`/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          setUserDetails({
            id: data._id,
            name: data.name,
            email: data.email,
            website: data.website,
            role: data.role,
            image: data.image,
            password: '', // Do not pre-fill password field
          });
        } catch (err) {
          toast.error('Failed to fetch user data.');
        }
      }
    };
    if (auth?.token) fetchUser();
  }, [auth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleRoleChange = (value) => {
    setUserDetails({ ...userDetails, role: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `/update-user-by-${page}`,
        {
          ...userDetails,
          image: media?.selected?._id || userDetails.image?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (data?.error) {
        toast.error(data.error);
      } else {
        if (auth?.user?._id === data._id) {
          setAuth({ ...auth, user: data });
          localStorage.setItem('auth', JSON.stringify({ ...auth, user: data }));
        }
        toast.success('User updated successfully');
      }
    } catch (err) {
      toast.error('User update failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-14">
      <div className="max-w-lg mx-auto">
        <h4 className="mb-4 text-lg font-semibold">Profile update</h4>

        <div className="mb-6 text-center">
          <img
            src={media.selected?.url || userDetails.image?.url || ''}
            alt="Avatar"
            className="w-24 h-24 rounded-full mx-auto"
          />
        </div>

        {auth?.user?.role !== 'Subscriber' && <Media />}

        <input
          type="text"
          name="name"
          className="mb-4 w-full p-2 border bg-gray-800 text-white border-gray-300 rounded"
          placeholder="Full name"
          value={userDetails.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          className="mb-4 w-full p-2 border bg-gray-800 text-white border-gray-300 rounded"
          placeholder="Email"
          value={userDetails.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="website"
          className="mb-4 w-full p-2 border bg-gray-800 text-white border-gray-300 rounded"
          placeholder="Website"
          value={userDetails.website}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          className="mb-4 w-full p-2 border bg-gray-800 text-white border-gray-300 rounded"
          placeholder="Password"
          value={userDetails.password}
          onChange={handleInputChange}
        />

        {page === 'admin' && (
          <select
            value={userDetails.role}
            className="mb-4 w-full p-2 border bg-gray-800 text-white border-gray-300 rounded"
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option value="Subscriber">Subscriber</option>
            <option value="Author">Author</option>
            <option value="Admin">Admin</option>
          </select>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full p-2 border border-gray-300 rounded bg-gray-800 text-white ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Updating...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default ProfileUpdate;
