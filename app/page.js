'use client';
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

const url3 = 'http://localhost:8000/api/posts-for-all/';
const url2 = 'https://course-api.com/react-store-products';
const url = 'https://jsonplaceholder.typicode.com/posts';

export default function Home() {
  // State to hold the posts
  const [posts, setPosts] = useState([]);

  // Function to fetch posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get(url3);
      setPosts(response.data); // Update the state with fetched data
      console.log('Post response:', response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  // useEffect to fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <p>sdsds</p>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <div>
            <h1 key={post._id}>{post.title}</h1>
            <Image src={post.featuredImage.url} alt="" width={250} height={120}/>
          </div>
            
        ))}
      </ul>
    </div>
  );
}

// export default function Home() {

//   const [item, setItem] = useState([]);

//   const blog = async () => {
//    try {
//      const post = await axios.get(url3);
//      setItem(post.data)
//      console.log(post.data);
//    } catch (error) {
//     console.log(error.post.data);
//    }
//   }

//   useEffect(()=>{
//     blog();
//   },[]);

//     return (
//       <div>
//         <p>sdsds</p>
//         <h1>Posts</h1>
//         {item.map((p, _id) => (
//           <div key={_id}>
//             <h1>{p.title}</h1>
//             <Image src={p.featuredImage.url} alt="" width={250} height={120}/>
            
//           </div>
//         ))}
//       </div>
//     );
// }
