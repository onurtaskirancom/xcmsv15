import AuthorLayout from '../../../admin/AuthorLayout';
import NewPostComponent from '../../../admin/components/posts/NewPostComponent';

function NewPost() {
  return (
    <AuthorLayout>
      <NewPostComponent page="author" />
    </AuthorLayout>
  );
}

export default NewPost;
