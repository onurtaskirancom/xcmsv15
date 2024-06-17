import AuthorLayout from '../../../admin/AuthorLayout';
import UploadFile from '../../../admin/components/media/UploadFile';

function NewMedia() {
  return (
    <AuthorLayout>
      <div className="flex justify-center">
        <div className="w-full max-w-7xl text-center py-24">
          <UploadFile redirectToLibrary={true} page="author" />
        </div>
      </div>
    </AuthorLayout>
  );
}

export default NewMedia;
