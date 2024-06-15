'use client';
import { useState, useEffect, useContext } from 'react';
import TagUpdateModal from '../components/modal/TagUpdateModal';
import { PostContext } from '../../context/post';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Tags() {
  const [post, setPost] = useContext(PostContext);
  const [loading, setLoading] = useState(false);
  const [updatingTag, setUpdatingTag] = useState({});
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '' });

  useEffect(() => {
    getTags();
  }, []);

  const getTags = async () => {
    try {
      const { data } = await axios.get('/tags');
      setPost((prev) => ({ ...prev, tags: data }));
    } catch (err) {
      console.log(err);
    }
  };

  const onFinish = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post('/tag', form);
      setPost((prev) => ({ ...prev, tags: [data, ...post.tags] }));
      toast.success('Tag created successfully');
      setLoading(false);
      setForm({ name: '' });
    } catch (err) {
      console.log(err);
      toast.error('Tag create failed');
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      const { data } = await axios.delete(`/tag/${item.slug}`);
      setPost((prev) => ({
        ...prev,
        tags: post.tags.filter((cat) => cat._id !== data._id),
      }));
      toast.success('Tag deleted successfully');
    } catch (err) {
      console.log(err);
      toast.error('Tag delete failed');
    }
  };

  const handleEdit = (item) => {
    setUpdatingTag(item);
    setVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      const { data } = await axios.put(`/tag/${updatingTag.slug}`, values);
      const newTags = post.tags.map((cat) =>
        cat._id === data._id ? data : cat
      );
      setPost((prev) => ({ ...prev, tags: newTags }));
      toast.success('Tag updated successfully');
      setVisible(false);
      setUpdatingTag({});
    } catch (err) {
      console.log(err);
      toast.error('Tag update failed');
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Tags</h1>
        <p className="mb-4">Add new tag</p>
        <form onSubmit={onFinish} className="mb-6">
          <input
            type="text"
            className="border p-2 w-full mb-2  bg-gray-800 text-white border-gray-300"
            placeholder="Give it a name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Save Tag'}
          </button>
        </form>
        <ul>
          {post.tags.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>{item.name}</span>
              <div>
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-500 mr-2"
                >
                  edit
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="text-red-500"
                >
                  delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <TagUpdateModal
        visible={visible}
        setVisible={setVisible}
        handleUpdate={handleUpdate}
        updatingTag={updatingTag}
      />
    </div>
  );
}

export default Tags;
