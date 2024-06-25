'use client';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Link from 'next/link';
import dayjs from 'dayjs';
import { CalendarIcon } from '@heroicons/react/outline';
import parse from 'html-react-parser';
import ThemeContext from '../context/theme';
import ScrollButton from '../components/ScrollButton';

const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredPosts(allPosts);
    } else {
      setFilteredPosts(
        allPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, allPosts]);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/posts-for-all`
      );
      setAllPosts(data);
      setFilteredPosts(data);
    } catch (err) {
      console.log('Error fetching posts:', err);
    }
  };

  return (
    <div
      className={`min-h-screen lg:pl-52 lg:pr-52 sm:py-10 lg:py-0 ${
        theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-white text-black'
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-10">All Blog Posts</h1>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-4 py-2 border ${
              theme === 'dark'
                ? 'bg-gray-950 text-white border-gray-800'
                : 'bg-white text-black border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        <div className="grid grid-cols-1 gap-8">
          {filteredPosts.map((post, i) => (
            <div
              key={i}
              className="post-card bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden"
            >
              <Link href={`/${post.slug}`}>
                <h2 className="text-xl font-bold mb-2 hover:text-blue-500 px-4 py-2">
                  {post.title}
                </h2>
              </Link>
              <div className="p-4">
                <p className="text-gray-400 mb-2 flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  {dayjs(post.createdAt).format('MMMM D, YYYY - HH:mm')}
                </p>
                <div
                  className={`${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                  }`}
                >
                  {parse(post.content.substring(0, 200))}...
                </div>
                <Link
                  href={`/${post.slug}`}
                  className="mt-4 text-blue-400 hover:text-blue-600"
                >
                  Read More...
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ScrollButton />
    </div>
  );
};

export default Posts;
