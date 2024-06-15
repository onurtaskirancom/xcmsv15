'use client';
import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/auth';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { toast } from 'react-hot-toast';

dayjs.extend(localizedFormat);

function Comments() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  // hook
  const router = useRouter();

  useEffect(() => {
    if (auth?.token) {
      fetchComments();
      getTotal();
    }
  }, [auth?.token]);

  useEffect(() => {
    if (page === 1) return;
    if (auth?.token) fetchComments();
  }, [page]);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/comments/${page}`);
      setComments([...comments, ...data]);
    } catch (err) {
      console.log(err);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get('/comment-count');
      setTotal(data);
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
        setTotal(total - 1);
        toast.success('Comment deleted successfully');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredComments = comments?.filter((comment) =>
    comment.content.toLowerCase().includes(keyword)
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">{comments?.length} Comments</h1>
      </div>
      <div className='pb-3'>
        <input
          type="search"
          className="border p-2 rounded w-full bg-gray-800 text-white"
          placeholder="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value.toLowerCase())}
        />
      </div>

      <ul className="space-y-4">
        {filteredComments.map((item) => (
          <li
            key={item._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{item.content}</p>
              <p className="text-sm text-gray-600">
                On {item?.postId?.title} | {item?.postedBy?.name} |{' '}
                {dayjs(item.createdAt).format('L LT')}
              </p>
            </div>
            <div className="space-x-2">
              <Link href={`/post/${item?.postId?.slug}#${item._id}`}>view</Link>
              <button
                onClick={() => handleDelete(item)}
                className="text-red-600"
              >
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {page * 6 < total && (
        <div className="text-center mt-8">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setPage(page + 1)}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Comments;
