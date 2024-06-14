'use client';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Media from '../../components/media/index';
import { MediaContext } from '../../../context/media';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';

function NewPostComponent({ page = 'admin' }) {
  // Load from local storage
  const savedTitle = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('post-title')
        ? JSON.parse(localStorage.getItem('post-title'))
        : '';
    }
  };

  const savedContent = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('post-content')
        ? JSON.parse(localStorage.getItem('post-content'))
        : '';
    }
  };

  // Context
  const [media, setMedia] = useContext(MediaContext);

  // State
  const [title, setTitle] = useState(savedTitle());
  const [content, setContent] = useState(savedContent());
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [loadedTags, setLoadedTags] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [editHtml, setEditHtml] = useState(false);

  // Hook
  const router = useRouter();

  useEffect(() => {
    loadCategories();
    loadTags();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get('/categories');
      setLoadedCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadTags = async () => {
    try {
      const { data } = await axios.get('/tags');
      setLoadedTags(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/create-post', {
        title,
        content,
        categories: categories.map((c) => c.value),
        tags: tags.map((t) => t.value),
        featuredImage: media?.selected?._id,
      });
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        toast.success('Post created successfully');
        localStorage.removeItem('post-title');
        localStorage.removeItem('post-content');
        setMedia({ ...media, selected: null });
        router.push(`/${page}/posts`);
      }
    } catch (err) {
      console.log(err);
      toast.error('Post create failed. Try again.');
      setLoading(false);
    }
  };

  const handleBody = (value) => {
    setContent(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('post-content', JSON.stringify(value));
    }
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
        <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
        <input
          type="text"
          className="w-full p-2 border bg-gray-800 text-white border-gray-300 rounded mb-4"
          value={title}
          placeholder="Give your post a title"
          onChange={(e) => {
            setTitle(e.target.value);
            localStorage.setItem('post-title', JSON.stringify(e.target.value));
          }}
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
            modules={NewPostComponent.modules}
            formats={NewPostComponent.formats}
            className="h-64 mb-4"
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
          options={loadedCategories.map((category) => ({
            value: category.name,
            label: category.name,
          }))}
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
          options={loadedTags.map((tag) => ({
            value: tag.name,
            label: tag.name,
          }))}
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
              alt="Featured"
              className="w-full h-auto rounded"
            />
          </div>
        )}
        <button
          className={`w-full bg-blue-500 text-white py-2 rounded mt-4 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'
          }`}
          onClick={handlePublish}
          disabled={loading}
        >
          Publish
        </button>
      </div>
      {/* Preview Modal */}
      {visible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setVisible(false)}
        >
          <div
            className="bg-gray-700 rounded-lg p-8 w-full lg:w-1/2 max-h-full overflow-y-auto flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h2 className="text-2xl font-bold mb-4">Preview</h2>
              <h1 className="text-xl font-semibold mb-4">{title}</h1>
              <div
                dangerouslySetInnerHTML={{ __html: content }}
                className="mb-4"
              />
            </div>
            <button
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-400 mt-4"
              onClick={() => setVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Media Modal */}
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

// React Quill modules and formats
NewPostComponent.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['clean'],
  ],
};

NewPostComponent.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'color',
  'background',
  'align',
];

export default NewPostComponent;
