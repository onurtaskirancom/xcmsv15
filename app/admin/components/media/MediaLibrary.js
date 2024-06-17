'use client'
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/auth';
import { MediaContext } from '../../../context/media';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { HiOutlineXCircle, HiInboxIn } from 'react-icons/hi';

const MediaLibrary = ({ page = 'admin' }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [media, setMedia] = useContext(MediaContext);
  const [showPreview, setShowMedia] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data } = await axios.get('/media');
        setMedia((prev) => ({ ...prev, images: data }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchMedia();
  }, []);

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/upload-image-file`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMedia({
        images: [...media.images, ...data],
        selected: data[0],
        showMediaModal: false,
      });
      toast.success('File uploaded successfully');
    } catch (err) {
      console.log(err);
      toast.error('File upload failed');
    }
  };

  const handleImageDelete = async (imageId) => {
    try {
      const { data } = await axios.delete(`/media/${imageId}`);
      if (data.ok) {
        setMedia({
          ...media,
          images: media.images.filter((image) => image._id !== imageId),
          selected: null,
        });
        toast.error('Image deleted successfully');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-center py-8">
        <label
          htmlFor="upload"
          className="flex flex-col items-center justify-center w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400"
        >
          <HiInboxIn className="w-16 h-16 text-gray-400" />
          <span className="mt-2 text-sm text-gray-500">
            Click or drag file to this area to upload
          </span>
          <input
            id="upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      <div className="text-center pt-8">
        <div className="max-h-[60vh] overflow-y-auto flex flex-wrap justify-center">
          {media?.images?.map((image) => (
            <div key={image._id} className="relative m-2">
              <img
                src={image.url}
                alt="uploaded"
                className="h-24 w-24 object-cover cursor-pointer"
                onClick={() => setMedia({ ...media, selected: image })}
              />
              {(page === 'admin' ||
                (page === 'author' &&
                  image?.postedBy?._id === auth?.user?._id)) && (
                <HiOutlineXCircle
                  onClick={() => handleImageDelete(image._id)}
                  className="absolute top-0 right-0 w-6 h-6 text-red-500 cursor-pointer"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MediaLibrary;
