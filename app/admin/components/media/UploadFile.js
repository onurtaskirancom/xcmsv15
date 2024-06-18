'use client'
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/auth';
import { MediaContext } from '../../../context/media';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const UploadFile = ({ redirectToLibrary = false, page = 'admin' }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [media, setMedia] = useContext(MediaContext);
  // state
  const [uploading, setUploading] = useState(false);
  // hook
  const router = useRouter();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/upload-image-file`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setMedia({
        images: [...media.images, data],
        selected: data,
        showMediaModal: false,
      });

      if (redirectToLibrary) {
        router.push(`/${page}/media`);
      }
      setUploading(false);
    } catch (error) {
      console.error('File upload failed:', error);
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label className="flex flex-col items-center px-4 py-6 bg-dark rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white text-blue-500 transition-all duration-200">
        <svg
          className="w-8 h-8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.88 9.17a.75.75 0 01.62.83l-.5 3.75a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 13.75l-.5-3.75a.75.75 0 01.62-.83 5.5 5.5 0 1113.76 0zM5.75 11.25v2.25h8.5v-2.25a3.75 3.75 0 10-8.5 0z" />
        </svg>
        <span className="mt-2 text-base leading-normal">Select a file</span>
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          disabled={uploading}
        />
      </label>
      <button
        className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${
          uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
        } transition-all duration-200`}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Click to Upload'}
      </button>
    </div>
  );
};


export default UploadFile;
