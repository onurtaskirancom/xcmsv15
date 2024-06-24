// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useTag = () => {
//   const [tags, setTags] = useState([]);

//   useEffect(() => {
//     const getTags = async () => {
//       try {
//         const { data } = await axios.get(
//           `${process.env.NEXT_PUBLIC_API}/tags`
//         );
//         setTags(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     getTags();
//   }, []);

//   return {
//     tags,
//   };
// };

// export default useTag;



import { useState, useCallback } from 'react';
import axios from 'axios';

const useTags = () => {
  const [tags, setTags] = useState([]);

  const fetchTags = useCallback(async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/tags`);
      setTags(data);
    } catch (err) {
      console.log('Error fetching tags:', err);
    }
  }, []);

  return { tags, fetchTags };
};

export default useTags;





