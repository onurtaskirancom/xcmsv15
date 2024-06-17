import AuthorLayout from '../../admin/AuthorLayout';

import ProfileUpdate from '../../admin/components/user/ProfileUpdate';

const UpdateUser = () => {
  // show form
  return (
    <AuthorLayout>
      <ProfileUpdate page="user" />
    </AuthorLayout>
  );
};

export default UpdateUser;
