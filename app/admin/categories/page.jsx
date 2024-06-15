'use client';
import { useState, useEffect, useContext } from 'react';
//import AdminLayout from '../../../components/layout/AdminLayout';
//import CategoryUpdateModal from '../../../components/modal/CategoryUpdateModal';
import CategoryUpdateModal from '../components/modal/CategoryUpdateModal';
import { PostContext } from '../../context/post';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Categories() {
  const [post, setPost] = useContext(PostContext);
  const [loading, setLoading] = useState(false);
  const [updatingCategory, setUpdatingCategory] = useState({});
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '' });

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const { data } = await axios.get('/categories');
      setPost((prev) => ({ ...prev, categories: data }));
    } catch (err) {
      console.log(err);
    }
  };

  const onFinish = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post('/category', form);
      setPost((prev) => ({ ...prev, categories: [data, ...post.categories] }));
      toast.success('Category created successfully');
      setLoading(false);
      setForm({ name: '' });
    } catch (err) {
      console.log(err);
      toast.error('Category create failed');
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      const { data } = await axios.delete(`/category/${item.slug}`);
      setPost((prev) => ({
        ...prev,
        categories: post.categories.filter((cat) => cat._id !== data._id),
      }));
      toast.success('Category deleted successfully');
    } catch (err) {
      console.log(err);
      toast.error('Category delete failed');
    }
  };

  const handleEdit = (item) => {
    setUpdatingCategory(item);
    setVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      const { data } = await axios.put(
        `/category/${updatingCategory.slug}`,
        values
      );
      const newCategories = post.categories.map((cat) =>
        cat._id === data._id ? data : cat
      );
      setPost((prev) => ({ ...prev, categories: newCategories }));
      toast.success('Category updated successfully');
      setVisible(false);
      setUpdatingCategory({});
    } catch (err) {
      console.log(err);
      toast.error('Category update failed');
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Categories</h1>
        <p className="mb-4">Add new category</p>
        <form onSubmit={onFinish} className="mb-6">
          <input
            type="text"
            className="border p-2 w-full mb-2 bg-gray-800 text-white border-gray-300"
            placeholder="Give it a name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Save Category'}
          </button>
        </form>
        <ul>
          {post.categories.map((item) => (
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
      <CategoryUpdateModal
        visible={visible}
        setVisible={setVisible}
        handleUpdate={handleUpdate}
        updatingCategory={updatingCategory}
      />
    </div>
  );
}

export default Categories;
