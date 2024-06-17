'use client';
import { useEffect, useState, useContext } from 'react';
import AuthorLayout from '../../admin/AuthorLayout';
import Link from 'next/link';
import axios from 'axios';
import { PostContext } from '../../context/post';
import { useRouter } from 'next/navigation';
import PostsList from '../../admin/components/posts/PostsList';
import { HiPlus } from 'react-icons/hi';

function Posts() {
  const [post, setPost] = useContext(PostContext);
  // hook
  const router = useRouter();

  const { posts } = post;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get('/posts-by-author');
      setPost((prev) => ({ ...prev, posts: data }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (post) => {
    // console.log("EDIT POST", post);
    return router.push(`/author/posts/${post.slug}`);
  };

  const handleDelete = async (post) => {
    // console.log("DELETE POST", post);
    try {
      const answer = window.confirm('Are you sure you want to delete?');
      if (!answer) return;
      const { data } = await axios.delete(`/post/${post._id}`);
      if (data.ok) {
        setPost((prev) => ({
          ...prev,
          posts: prev.posts.filter((p) => p._id !== post._id),
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthorLayout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <Link href="/author/posts/new">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center">
              <HiPlus className="mr-2" />
              Add New
            </button>
          </Link>
          <h1 className="text-xl font-semibold">{posts?.length} Posts</h1>
        </div>
        <PostsList
          posts={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </AuthorLayout>
  );
}

export default Posts;
