import SubscriberLayout from '../../admin/SubscriberLayout';

import ProfileUpdate from '../../admin/components/user/ProfileUpdate';

const UpdateUser = () => {
  // show form
  return (
    <SubscriberLayout>
      <ProfileUpdate page="user" />
    </SubscriberLayout>
  );
};

export default UpdateUser;
