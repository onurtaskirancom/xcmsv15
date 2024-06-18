'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AuthContext } from '../../../context/auth';
import { MediaContext } from '../../../context/media';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { HiOutlineXCircle, HiInboxIn } from 'react-icons/hi';
import { ThreeDots } from 'react-loader-spinner';

const MediaLibrary = ({ page = 'admin' }) => {
  const [auth] = useContext(AuthContext);
  const [media, setMedia] = useContext(MediaContext);
  const [localImages, setLocalImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data } = await axios.get('/media');
        console.log('Fetched media:', data);
        setMedia((prev) => ({ ...prev, images: data }));
        setLocalImages(data);
      } catch (err) {
        console.log('Error fetching media:', err);
      }
    };
    fetchMedia();
  }, [setMedia]);

  useEffect(() => {
    setLocalImages(media.images);
  }, [media.images]);

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('file', file);
    });

    setUploading(true);

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

      console.log('API Response:', data);

      const newImages = Array.isArray(data) ? data : [data];
      console.log('New Images:', newImages);

      setMedia((prevMedia) => ({
        ...prevMedia,
        images: [...prevMedia.images, ...newImages],
        selected: newImages[0],
        showMediaModal: false,
      }));
      setLocalImages((prevImages) => [...prevImages, ...newImages]);
      toast.success('Files uploaded successfully');
    } catch (err) {
      console.log('Error uploading files:', err);
      toast.error('File upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleImageDelete = async (imageId) => {
    try {
      const { data } = await axios.delete(`/media/${imageId}`);
      if (data.ok) {
        setMedia((prevMedia) => ({
          ...prevMedia,
          images: prevMedia.images.filter((image) => image._id !== imageId),
          selected: null,
        }));
        setLocalImages((prevImages) =>
          prevImages.filter((image) => image._id !== imageId)
        );
        toast.success('Image deleted successfully');
      }
    } catch (err) {
      console.log('Error deleting image:', err);
      toast.error('Failed to delete image');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true, // Çoklu dosya yüklemeyi etkinleştirin
  });

  return (
    <>
      <div className="flex justify-center py-8">
        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400"
        >
          {uploading ? (
            <div className="flex items-center justify-center">
              <ThreeDots color="#00BFFF" height={80} width={80} />
            </div>
          ) : (
            <>
              <HiInboxIn className="w-16 h-16 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">
                Click or drag file to this area to upload
              </span>
              <input {...getInputProps()} className="hidden" />
            </>
          )}
        </div>
      </div>

      <div className="text-center pt-8">
        <div className="max-h-[60vh] overflow-y-auto flex flex-wrap justify-center">
          {localImages.map((image) => (
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
