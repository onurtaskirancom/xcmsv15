'use client';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Link from 'next/link';
import dayjs from 'dayjs';
import { CalendarIcon } from '@heroicons/react/outline';
import parse from 'html-react-parser';
import ThemeContext from './context/theme';
import Sidebar from './components/Sidebar';
import ScrollButton from './components/ScrollButton';

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const fetchData = async () => {
    try {
      const [postCount, posts, categoriesData, tagsData] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API}/post-count`),
        axios.get(`${process.env.NEXT_PUBLIC_API}/posts/1`),
        axios.get(`${process.env.NEXT_PUBLIC_API}/categories`),
        axios.get(`${process.env.NEXT_PUBLIC_API}/tags`),
      ]);

      setTotal(postCount.data);
      setAllPosts(posts.data);
      setRecentPosts(posts.data);
      setCategories(categoriesData.data);
      setTags(tagsData.data);
    } catch (err) {
      console.log('Error fetching data:', err);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/posts/${page}`
      );
      setAllPosts([...allPosts, ...data]);
      setLoading(false);
    } catch (err) {
      console.log('Error loading more posts:', err);
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen pl-20 ${
        theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-white text-black'
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
                  className="post-card bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden"
                >
                  <Link href={`/${post.slug}`}>
                    <img
                      src={post.featuredImage?.url || '/images/default.jpeg'}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                    />
                  </Link>
                  <div className="p-4">
                    <Link href={`/${post.slug}`}>
                      <h2 className="text-xl font-bold mb-2 hover:text-blue-200">
                        {post.title}
                      </h2>
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
                    <Link
                      href={`/${post.slug}`}
                      className="mt-4 text-blue-400 hover:text-blue-200"
                    >
                      Read More...
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
      <ScrollButton/>
    </div>
  );
};

export default Home;


