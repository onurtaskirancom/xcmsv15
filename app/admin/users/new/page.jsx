'use client';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import generator from 'generate-password';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const NewUser = () => {
  // state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [password, setPassword] = useState(generator.generate({ length: 6 }));
  const [role, setRole] = useState('Subscriber');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post('/create-user', {
        email,
        name,
        website,
        password,
        role,
        checked,
      });
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success('User created successfully');
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error('Signup failed. Try again.');
      setLoading(false);
    }
  };

  // show form
  return (
    <div className="pt-14">
      <div className="max-w-lg mx-auto">
        <h4 className="mb-4 text-lg font-semibold">Add new user</h4>
        <input
          type="text"
          className="mb-4 w-full p-2 border bg-gray-800 text-white border-gray-300 rounded"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="mb-4 w-full p-2 border bg-gray-800 text-white border-gray-300 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="mb-4 w-full p-2 border bg-gray-800 text-white border-gray-300 rounded"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <div className="flex mb-4 items-center">
          <button
            onClick={() => setPassword(generator.generate({ length: 6 }))}
            className="mr-2 p-2 border border-gray-300 rounded bg-gray-800 text-white"
          >
            Generate password
          </button>
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full p-2 border bg-gray-800 text-white border-gray-300 rounded pr-10"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <HiEyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <HiEye className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mb-4 w-full p-2 border bg-gray-800 text-white border-gray-300 rounded"
        >
          <option value="Subscriber">Subscriber</option>
          <option value="Author">Author</option>
          <option value="Admin">Admin</option>
        </select>

        <label className="flex items-center mb-4 ">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mr-2 bg-gray-800 text-white"
          />
          Send the new user an email about their account.
        </label>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full p-2 border border-gray-300 rounded bg-gray-800 text-white ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'User is being saved...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default NewUser;
