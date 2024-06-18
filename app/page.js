'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import dayjs from 'dayjs';
import { CalendarIcon } from '@heroicons/react/outline';
import parse from 'html-react-parser';

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTotal();
    fetchPosts();
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
    <div className="min-h-screen bg-gray-900 text-gray-200 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post, i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <Link href={`/${post.slug}`} className="block">
                <img
                  className="w-full h-48 object-cover"
                  src={post.featuredImage?.url || '/images/default.jpeg'}
                  alt={post.title + ' - onurtaskiran.com'}
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-400 mb-2 flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    {dayjs(post.createdAt).format('MMMM D, YYYY - HH:mm')}
                  </p>
                  <div className="text-gray-400">
                    {parse(post.content.substring(0, 100))}...
                  </div>
                  <div className="mt-4 text-blue-400 hover:text-blue-600">
                    Read More...
                  </div>
                </div>
              </Link>
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
    </div>
  );
}
