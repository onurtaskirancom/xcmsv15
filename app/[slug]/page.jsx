'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { AiOutlineTag, AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';
import { ThreeDots } from 'react-loader-spinner';
import { AuthContext } from '../context/auth';
import ThemeContext from '../context/theme';

export default function PostDetail() {
  const router = useRouter();
  const pathname = usePathname();
  const slug = pathname.split('/').pop();

  const { theme } = useContext(ThemeContext);

  const [auth, setAuth] = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  useEffect(() => {
    Prism.highlightAll();
  }, [post]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/post/${slug}`
      );
      console.log('Fetched post data:', data);
      setPost(data.post);
      setComments(data.comments);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching post:', err);
      setLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment) return;
    try {
      setCommentLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/comment/${post._id}`,
        { comment }
      );
      setComments([data, ...comments]);
      setComment('');
      setCommentLoading(false);
    } catch (err) {
      console.log(err);
      setCommentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <ThreeDots color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  if (!post) {
    return <p className="text-center text-gray-400">Post not found.</p>;
  }

  return (
    <div
      className={`min-h-screen py-10 ${
        theme === 'dark' ? 'bg-gray-950 text-gray-300' : 'bg-white text-black'
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden ${
            theme === 'dark'
              ? 'bg-gray-900 text-gray-300'
              : 'bg-white text-black'
          }`}
        >
          <img
            className="w-full h-full object-contain"
            src={post.featuredImage?.url || '/images/default.jpeg'}
            alt={post.title + ' - onurtaskiran.com'}
          />
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-400 mb-4">
              <AiOutlineCalendar className="w-5 h-5 mr-2" />
              <span>
                {dayjs(post.createdAt).format('MMMM D, YYYY - HH:mm')}
              </span>
              <AiOutlineUser className="w-5 h-5 ml-4 mr-2" />
              <span>{post.postedBy.name}</span>
            </div>
            <div
              className={`prose max-w-none mb-8 ${
                theme === 'dark'
                  ? 'prose-pre:bg-gray-700 prose-code:bg-gray-700 prose-pre:text-gray-300 prose-code:text-gray-300'
                  : 'prose-pre:bg-gray-100 prose-code:bg-gray-100 prose-pre:text-gray-900 prose-code:text-gray-900'
              }`}
            >
              {post.content && typeof post.content === 'string'
                ? parse(post.content)
                : post.content}
            </div>
            <div className="flex flex-wrap mb-4">
              {post.categories.map((category) => (
                <span
                  key={category._id}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm mr-2 mb-2"
                >
                  {category.name}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag._id}
                  className="bg-green-600 text-white px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center"
                >
                  <AiOutlineTag className="mr-1" />
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`mt-8 max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden px-8 py-6 ${
            theme === 'dark'
              ? 'bg-gray-900 text-gray-300'
              : 'bg-white text-black'
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className={`mb-6 border-b pb-4 ${
                  theme === 'dark' ? 'border-gray-900' : 'border-gray-300'
                }`}
              >
                <div className="flex items-center mb-2">
                  <div className="text-lg font-bold mr-2">
                    {comment.postedBy.name}
                  </div>
                  <div className="text-gray-400">
                    {dayjs(comment.createdAt).format('MMMM D, YYYY - HH:mm')}
                  </div>
                </div>
                <div
                  className={`prose prose-sm max-w-none ${
                    theme === 'dark'
                      ? 'prose-pre:bg-gray-900 prose-code:bg-gray-700 prose-pre:text-gray-300 prose-code:text-gray-300'
                      : 'prose-pre:bg-gray-100 prose-code:bg-gray-100 prose-pre:text-gray-900 prose-code:text-gray-900'
                  }`}
                >
                  {comment.content && typeof comment.content === 'string'
                    ? parse(comment.content)
                    : comment.content}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No comments yet.</p>
          )}
        </div>
        <div
          className={`mt-8 max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden px-8 py-6 ${
            theme === 'dark'
              ? 'bg-gray-900 text-gray-300'
              : 'bg-gray-100 text-black'
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">Leave a Comment</h2>
          {!auth.user ? (
            <p className="text-center text-gray-400">
              Please log in to leave a comment.
            </p>
          ) : (
            <>
              <textarea
                className={`w-full h-32 p-4 mb-4 rounded-md ${
                  theme === 'dark'
                    ? 'bg-gray-950 text-white'
                    : 'bg-white text-black'
                }`}
                placeholder="Write your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className={`w-full py-2 px-4 rounded-md ${
                  commentLoading
                    ? 'bg-gray-600'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
                onClick={handleCommentSubmit}
                disabled={commentLoading}
              >
                {commentLoading ? 'Posting...' : 'Post Comment'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
