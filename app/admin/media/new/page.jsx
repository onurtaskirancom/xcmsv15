'use client';
import UploadFile from '../../components/media/UploadFile';

function NewMedia() {
  return (
    <div className="flex justify-center items-center py-24">
      <div className="w-full text-center">
        <UploadFile redirectToLibrary={true} />
      </div>
    </div>
  );
}

export default NewMedia;
