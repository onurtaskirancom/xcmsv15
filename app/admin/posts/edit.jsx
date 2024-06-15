'use client';
import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { MediaContext } from '../../context/media';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import Media from '../components/media/index';

function EditPost({ slug, page = 'admin' }) {
  // context
  const [media, setMedia] = useContext(MediaContext);
  // state
  const [postId, setPostId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [loadedTags, setLoadedTags] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editHtml, setEditHtml] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (slug) {
      loadPost(slug);
    }
  }, [slug]);

  useEffect(() => {
    loadCategories();
    loadTags();
  }, []);

  const loadPost = async (slug) => {
    try {
      const { data } = await axios.get(`/post/${slug}`);
      console.log('GOT POST FOR EDIT', data);
      setTitle(data.post.title);
      setContent(data.post.content);
      setFeaturedImage(data.post.featuredImage);
      setPostId(data.post._id);
      setCategories(
        data.post.categories.map((c) => ({ value: c.name, label: c.name }))
      );
      setTags(data.post.tags.map((t) => ({ value: t.name, label: t.name })));
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error('Post could not be loaded. Please try again later.');
    }
  };

  const loadCategories = async () => {
    try {
      const { data } = await axios.get('/categories');
      setLoadedCategories(data.map((c) => ({ value: c.name, label: c.name })));
    } catch (err) {
      console.log(err);
    }
  };

  const loadTags = async () => {
    try {
      const { data } = await axios.get('/tags');
      setLoadedTags(data.map((t) => ({ value: t.name, label: t.name })));
    } catch (err) {
      console.log(err);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/edit-post/${postId}`, {
        title,
        content,
        categories: categories.map((c) => c.value),
        tags: tags.map((t) => t.value),
        featuredImage: media?.selected?._id
          ? media?.selected?._id
          : featuredImage?._id
          ? featuredImage._id
          : undefined,
      });
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        console.log('POST PUBLISHED RES => ', data);
        toast.success('Post updated successfully');
        setMedia({ ...media, selected: null });
        router.push(`/${page}/posts`);
      }
    } catch (err) {
      console.log(err);
      toast.error('Post update failed. Try again.');
      setLoading(false);
    }
  };

  const handleBody = (value) => {
    setContent(value);
  };

  const handleHtmlChange = (e) => {
    setHtmlContent(e.target.value);
    setContent(e.target.value);
  };

  const handlePreview = () => {
    setVisible(true);
  };

  const handleEditHtmlToggle = () => {
    setEditHtml(!editHtml);
    setHtmlContent(content);
  };

  return (
    <div className="flex flex-col lg:flex-row pt-5 px-4 lg:px-16">
      <div className="flex-1 lg:pr-8">
        <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
        <input
          type="text"
          className="w-full p-2 border bg-gray-800 text-white border-gray-300 rounded mb-4"
          value={title}
          placeholder="Give your post a title"
          onChange={(e) => setTitle(e.target.value)}
        />
        {editHtml ? (
          <textarea
            value={htmlContent}
            onChange={handleHtmlChange}
            className="w-full h-64 mb-4 p-2 border bg-gray-800 text-white border-gray-300 rounded"
          />
        ) : (
          <ReactQuill
            value={content}
            onChange={handleBody}
            modules={EditPost.modules}
            formats={EditPost.formats}
            className="h-64 mb-4 "
          />
        )}
        <div className="mb-4 flex justify-between pt-6">
          <button
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 mr-2"
            onClick={handlePreview}
          >
            Preview
          </button>
          <button
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 ml-2"
            onClick={handleEditHtmlToggle}
          >
            {editHtml ? 'Switch to Editor' : 'Edit HTML'}
          </button>
        </div>
        <div className="mb-4">
          <button
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
            onClick={() => setMedia({ ...media, showMediaModal: true })}
          >
            Featured Image
          </button>
        </div>
        <h4 className="text-lg font-semibold mb-2">Categories</h4>
        <Select
          isMulti
          options={loadedCategories}
          className="mb-4"
          onChange={setCategories}
          value={categories}
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: '#2D2D2D',
              color: 'white',
              borderColor: '#4A4A4A',
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: '#2D2D2D',
              color: 'white',
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: '#4A4A4A',
              color: 'white',
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: 'white',
            }),
            multiValueRemove: (base) => ({
              ...base,
              color: 'white',
              ':hover': {
                backgroundColor: '#616161',
                color: 'white',
              },
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? '#616161' : '#2D2D2D',
              color: 'white',
            }),
          }}
        />
        <h4 className="text-lg font-semibold mb-2">Tags</h4>
        <Select
          isMulti
          options={loadedTags}
          className="mb-4"
          onChange={setTags}
          value={tags}
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: '#2D2D2D',
              color: 'white',
              borderColor: '#4A4A4A',
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: '#2D2D2D',
              color: 'white',
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: '#4A4A4A',
              color: 'white',
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: 'white',
            }),
            multiValueRemove: (base) => ({
              ...base,
              color: 'white',
              ':hover': {
                backgroundColor: '#616161',
                color: 'white',
              },
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? '#616161' : '#2D2D2D',
              color: 'white',
            }),
          }}
        />
        {media?.selected && (
          <div className="mt-4">
            <img
              src={media?.selected?.url}
              alt="Selected featured image"
              className="w-full h-auto rounded"
            />
          </div>
        )}
        {featuredImage?.url && !media?.selected && (
          <div className="mt-4">
            <img
              src={featuredImage.url}
              alt="Featured image"
              className="w-full h-auto rounded"
            />
          </div>
        )}
        <div className="pt-4">
          <button
            disabled={loading}
            onClick={handlePublish}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Publishing...' : 'Update'}
          </button>
        </div>
      </div>
      {media.showMediaModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setMedia({ ...media, showMediaModal: false })}
        >
          <div
            className="bg-gray-700 rounded-lg p-8 w-full max-h-full lg:w-3/4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Media</h2>
            <Media />
            <button
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-400 mt-4"
              onClick={() => setMedia({ ...media, showMediaModal: false })}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

EditPost.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

EditPost.formats = [
  'header',
  'font',
  'size',
  'list',
  'bullet',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'link',
  'image',
  'video',
];

export default EditPost;
