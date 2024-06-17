import AuthorLayout from '../../admin/AuthorLayout';
import UserComments from '../../components/comments/UserComments';

function Author() {
  return (
    <AuthorLayout>
      <UserComments />
    </AuthorLayout>
  );
}

export default Author;
