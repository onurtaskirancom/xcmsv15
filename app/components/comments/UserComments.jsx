'use client';
import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/auth';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import CommentForm from './CommentForm';
import { toast } from 'react-hot-toast';

dayjs.extend(localizedFormat);

const UserComments = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [selectedComment, setSelectedComment] = useState({});
  const [content, setContent] = useState('');
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (auth?.token) {
      fetchComments();
    }
  }, [auth?.token]);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/user-comments`);
      setComments(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (comment) => {
    try {
      const answer = window.confirm('Are you sure you want to delete?');
      if (!answer) return;

      const { data } = await axios.delete(`/comment/${comment._id}`);
      if (data?.ok) {
        setComments(comments.filter((c) => c._id !== comment._id));
        toast.success('Comment deleted successfully');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/comment/${selectedComment._id}`, {
        content,
      });

      const updatedComments = comments.map((c) =>
        c._id === selectedComment._id ? { ...c, content: data.content } : c
      );
      setComments(updatedComments);

      setVisible(false);
      setLoading(false);
      setSelectedComment({});
      toast.success('Comment updated');
    } catch (err) {
      console.log(err);
      setVisible(false);
      setLoading(false);
    }
  };

  const filteredComments = comments.filter((comment) =>
    comment.content.toLowerCase().includes(keyword)
  );

  return (
    <div className="p-4 ">
      <h1 className="text-xl font-bold mb-4">{comments.length} Comments</h1>
      <input
        className="w-full p-2 mb-4 border border-gray-800 rounded bg-gray-800 text-white"
        placeholder="Search"
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value.toLowerCase())}
      />
      <ul className="space-y-4">
        {filteredComments.map((item) => (
          <li
            key={item._id}
            className="p-4 border border-gray-200 rounded bg-gray-800 text-white"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="font-semibold">{item.content}</p>
                <p className="text-sm text-gray-500">
                  On {item.postId?.title} | {item.postedBy?.name} |{' '}
                  {dayjs(item.createdAt).format('L LT')}
                </p>
              </div>
              <div className="flex space-x-2">
                <Link href={`/post/${item?.postId?.slug}#${item._id}`}>
                  <button className="text-blue-500 hover:underline">
                    View
                  </button>
                </Link>
                <button
                  className="text-yellow-500 hover:underline"
                  onClick={() => {
                    setSelectedComment(item);
                    setVisible(true);
                    setContent(item.content);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {visible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Update Comment</h2>
            <CommentForm
              handleSubmit={handleSubmit}
              comment={content}
              setComment={setContent}
              loading={loading}
            />
            <button
              className="mt-4 bbg-gray-800 text-white px-4 py-2 rounded"
              onClick={() => setVisible(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserComments;
