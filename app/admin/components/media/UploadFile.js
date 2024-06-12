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
        router.push(`/${page}/media/library`);
      }
      setUploading(false);
    } catch (error) {
      console.error('File upload failed:', error);
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4"
        disabled={uploading}
      />
      <button
        className={`px-4 py-2 bg-blue-500 text-white rounded ${
          uploading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Click to Upload'}
      </button>
    </div>
  );
};

export default UploadFile;
