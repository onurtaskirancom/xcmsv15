// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useHome = () => {
//   const [title, setTitle] = useState('');
//   const [subtitle, setSubtitle] = useState('');
//   const [fullWidthImage, setFullWidthImage] = useState('');

//   useEffect(() => {
//     loadHomepage();
//   }, []);

//   const loadHomepage = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.NEXT_PUBLIC_API}/page/home`
//       );
//       setTitle(data.title);
//       setSubtitle(data.subtitle);
//       setFullWidthImage(data.fullWidthImage);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return {
//     title,
//     subtitle,
//     fullWidthImage,
//     setTitle,
//     setSubtitle,
//     setFullWidthImage,
//   };
// };

// export default useHome;
