'use client';
import { useEffect, useState } from 'react';
import AuthorLayout from '../../../admin/AuthorLayout';
import EditPostComponent from '../../../admin/components/posts/EditPostComponent';

const EditPost = () => {
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    const pathArray = window.location.pathname.split('/');
    const slug = pathArray[pathArray.length - 1];
    setSlug(slug);
  }, []);

  if (!slug) {
    return <div>Loading...</div>;
  }

  return (
    <AuthorLayout>
      <EditPostComponent slug={slug} page="author" />
    </AuthorLayout>
  );
};

export default EditPost;
