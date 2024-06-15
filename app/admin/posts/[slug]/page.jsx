'use client';
import { useEffect, useState } from 'react';
import EditPostComponent from '../edit';

const Edit = () => {
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
    <>
      <EditPostComponent slug={slug} />
    </>
  );
};

export default Edit;
