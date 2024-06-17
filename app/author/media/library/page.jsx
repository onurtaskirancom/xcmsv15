import AuthorLayout from '../../../admin/AuthorLayout';
import MediaLibrary from '../../../admin/components/media/MediaLibrary';

function AuthorMediaLibrary() {
  return (
    <AuthorLayout>
      <div className="flex justify-center">
        <div className="w-full max-w-7xl">
          <MediaLibrary page="author" />
        </div>
      </div>
    </AuthorLayout>
  );
}

export default AuthorMediaLibrary;
