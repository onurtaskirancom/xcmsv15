// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useTotalPosts = () => {
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const getTotal = async () => {
//       try {
//         const { data } = await axios.get(
//           `${process.env.NEXT_PUBLIC_API}/post-count`
//         );
//         setTotal(data);
//       } catch (err) {
//         console.log('Error fetching post count:', err);
//       }
//     };

//     getTotal();
//   }, []);

//   return {
//     total,
//   };
// };

// export default useTotalPosts;




