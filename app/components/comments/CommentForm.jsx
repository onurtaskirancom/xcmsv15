import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import Link from 'next/link';

const CommentForm = ({ comment, setComment, handleSubmit, loading }) => {
  const [auth, setAuth] = useContext(AuthContext);

  const roleBasedComment = () => {
    if (auth?.user === null && auth?.token === '') {
      return (
        <div className="neo-comment">
          <strong>
            <Link href="/signup">
              <a>Sign up for free</a>
            </Link>{' '}
            to join this conversation on Onur Taskiran Blog Website. Already
            have an account?{' '}
            <Link href="/signin">
              <a>Sign in to comment</a>
            </Link>
          </strong>
        </div>
      );
    } else {
      return (
        <div>
          <strong>Add a comment</strong>
        </div>
      );
    }
  };

  return (
    <>
      {roleBasedComment()}
      <br />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add your comment here..."
        rows="4"
        disabled={auth?.user === null && auth?.token === ''}
        maxLength={200}
        className="w-full p-2 border border-gray-300 rounded mt-2 bg-gray-800 text-white"
      />
      <button
        onClick={handleSubmit}
        disabled={comment === '' || loading}
        className={`mt-4 px-4 py-2 bg-gray-800 text-white rounded ${
          comment === '' || loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? 'Posting...' : 'Post'}
      </button>
    </>
  );
};

export default CommentForm;
