// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useCategory = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         const { data } = await axios.get(
//           `${process.env.NEXT_PUBLIC_API}/categories`
//         );
//         setCategories(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     getCategories();
//   }, []);

//   return {
//     categories,
//   };
// };

// export default useCategory;


