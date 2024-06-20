'use client';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Link from 'next/link';
import dayjs from 'dayjs';
import { CalendarIcon } from '@heroicons/react/outline';
import parse from 'html-react-parser';
import ThemeContext from './context/theme';
import Sidebar from './components/Sidebar';

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getTotal();
    fetchPosts();
    fetchRecentPosts();
    fetchCategories();
    fetchTags();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get('/post-count');
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get('/posts/1');
      setAllPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRecentPosts = async () => {
    try {
      const { data } = await axios.get('/recent-posts');
      setRecentPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/categories');
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTags = async () => {
    try {
      const { data } = await axios.get('/tags');
      setTags(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/posts/${page}`);
      setAllPosts([...allPosts, ...data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen pl-20 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-center mb-10">Blog Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {allPosts.map((post, i) => (
                <div
                  key={i}
                  className="post-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  <Link href={`/${post.slug}`} legacyBehavior>
                    <a>
                      <img
                        src={post.featuredImage?.url || '/images/default.jpeg'}
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                      />
                    </a>
                  </Link>
                  <div className="p-4">
                    <Link href={`/${post.slug}`} legacyBehavior>
                      <a>
                        <h2 className="text-xl font-bold mb-2 hover:text-blue-500">
                          {post.title}
                        </h2>
                      </a>
                    </Link>
                    <p className="text-gray-400 mb-2 flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      {dayjs(post.createdAt).format('MMMM D, YYYY - HH:mm')}
                    </p>
                    <div
                      className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-900'
                      }`}
                    >
                      {parse(post.content.substring(0, 100))}...
                    </div>
                    <Link href={`/${post.slug}`} legacyBehavior>
                      <a className="mt-4 text-blue-400 hover:text-blue-600">
                        Read More...
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {allPosts?.length < total && (
              <div className="text-center mt-10">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                  onClick={() => setPage(page + 1)}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </div>
          <div className="lg:col-span-1 lg:block hidden">
            <Sidebar
              recentPosts={recentPosts}
              categories={categories}
              tags={tags}
            />
          </div>
        </div>
        <div className="lg:hidden mt-10">
          <Sidebar
            recentPosts={recentPosts}
            categories={categories}
            tags={tags}
          />
        </div>
      </div>
    </div>
  );
}
