import AuthorLayout from '../admin/AuthorLayout';
import UserComments from '../admin/comments/page';

function Author() {
  return (
    <AuthorLayout>
      <UserComments />
    </AuthorLayout>
  );
}

export default Author;
