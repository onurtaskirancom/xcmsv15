import Link from 'next/link';

const PostsList = ({ posts, handleDelete, handleEdit }) => {
  return (
    <div className="space-y-4">
      {posts.map((item) => (
        <div
          key={item._id}
          className="bg-gray-800 text-white p-4 rounded shadow"
        >
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">{item.title}</div>
            <div className="space-x-4">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-500 hover:underline"
              >
                edit
              </button>
              <button
                onClick={() => handleDelete(item)}
                className="text-red-500 hover:underline"
              >
                delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
