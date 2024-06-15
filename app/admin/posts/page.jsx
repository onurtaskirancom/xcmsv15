'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function AllPostsComponent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');

  const router = useRouter();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/posts-for-admin');
      setPosts(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error('Failed to load posts');
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    console.log('EDIT POST', post.slug);
    router.push(`/admin/posts/${post.slug}`);
  };

  const handleDelete = async (postId) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        setLoading(true);
        await axios.delete(`/post/${postId}`);
        toast.success('Post deleted successfully');
        loadPosts();
      } catch (err) {
        console.log(err);
        toast.error('Failed to delete post');
        setLoading(false);
      }
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      (post.title &&
        post.title.toLowerCase().includes(keyword.toLowerCase())) ||
      (post.content &&
        post.content.toLowerCase().includes(keyword.toLowerCase()))
  );

  return (
    <div className="flex flex-col pt-5 px-4 lg:px-16">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <input
        type="text"
        className="border p-2 mb-4 w-full lg:w-full bg-gray-800 text-white"
        placeholder="Search..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr>
              <th className="py-2">Title</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post._id}>
                <td className="py-2 px-4 border-b border-gray-700">
                  {post.title}
                </td>
                <td className="py-2 px-4 border-b border-gray-700">
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-400 mr-2"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-400"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllPostsComponent;
