import React, { useState } from 'react';
import UploadFile from './UploadFile';
import MediaLibrary from './MediaLibrary';

const Media = () => {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mx-2 ${
            activeTab === 'upload'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          } rounded-lg focus:outline-none`}
          onClick={() => setActiveTab('upload')}
        >
          Upload File
        </button>
        <button
          className={`px-4 py-2 mx-2 ${
            activeTab === 'library'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          } rounded-lg focus:outline-none`}
          onClick={() => setActiveTab('library')}
        >
          Media Library
        </button>
      </div>
      <div>
        {activeTab === 'upload' && <UploadFile />}
        {activeTab === 'library' && <MediaLibrary />}
      </div>
    </div>
  );
};

export default Media;
