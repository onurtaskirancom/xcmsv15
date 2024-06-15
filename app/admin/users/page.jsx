'use client';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/auth';
import { FaUserCircle } from 'react-icons/fa'; 

const AllUsers = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [keyword, setKeyword] = useState('');
  // hook
  const router = useRouter();
  // state
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (auth?.token) loadUsers();
  }, [auth?.token]);

  const loadUsers = async () => {
    try {
      const { data } = await axios.get('/users');
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (user) => {
    try {
      if (user._id === auth.user._id) {
        alert("You can't delete yourself");
        return;
      }
      try {
        await axios.delete(`/user/${user._id}`);
        setUsers((prev) => prev.filter((u) => u._id !== user._id));
        toast.error('User deleted');
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredUsers = users?.filter((u) =>
    u.name.toLowerCase().includes(keyword)
  );

  return (
    <div className="pt-14 w-full">
      <h4 className="text-lg font-bold">All Users ({users?.length})</h4>

      <input
        className="w-full p-2 mt-4 mb-6 border bg-gray-800 text-white border-gray-300 rounded-md"
        placeholder="Ara"
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value.toLowerCase())}
      />

      <ul>
        {filteredUsers.map((user) => (
          <li
            key={user._id}
            className="flex items-center p-4 mb-4 border border-gray-300 rounded-md"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <FaUserCircle className="w-10 h-10 text-gray-500" />
                <div className="ml-4">
                  <div className="text-lg font-bold">{user.name}</div>
                  <div className="text-sm text-gray-400">{user.email}</div>
                  <div className="text-sm text-gray-400">{user.role}</div>
                  <div className="text-sm text-gray-400">
                    {`${user?.posts?.length || 0} gönderi`}
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <Link
                  href={`/admin/users/${user._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(user)}
                  disabled={user?._id === auth?.user?._id}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsers;
