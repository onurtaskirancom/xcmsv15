// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import axios from 'axios';
// import dayjs from 'dayjs';
// import parse from 'html-react-parser';
// import Prism from 'prismjs';
// import 'prismjs/themes/syndp.css';
// import { AiOutlineFlag } from 'react-icons/ai';
// import { CalendarIcon } from '@heroicons/react/outline';
// import { ThreeDots } from 'react-loader-spinner';

// export default function PostDetail() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const slug = pathname.split('/').pop();

//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (slug) {
//       fetchPost();
//     }
//   }, [slug]);

//   useEffect(() => {
//     Prism.highlightAll();
//   }, [post]);

//   const fetchPost = async () => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:8000/api/post/${slug}`
//       );
//       console.log('Fetched post data:', data); // Gelen veriyi kontrol edin
//       setPost(data.post);
//       setComments(data.comments);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching post:', err); // Hata durumunu kontrol edin
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center py-8">
//         <ThreeDots color="#00BFFF" height={80} width={80} />
//       </div>
//     );
//   }

//   if (!post) {
//     return <p className="text-center text-gray-200">Post not found.</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-200 py-10">
//       <div className="container mx-auto px-4">
//         <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md overflow-hidden">
//           <img
//             className="w-full h-64 object-cover"
//             src={post.featuredImage?.url || '/images/default.jpeg'}
//             alt={post.title + ' - onurtaskiran.com'}
//           />
//           <div className="p-8">
//             <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
//             <div className="flex items-center text-gray-400 mb-4">
//               <CalendarIcon className="w-5 h-5 mr-2" />
//               <span>
//                 {dayjs(post.createdAt).format('MMMM D, YYYY - HH:mm')}
//               </span>
//               <span className="ml-4">by {post.postedBy.name}</span>
//             </div>
//             <div className="prose prose-lg max-w-none text-gray-200 mb-8">
//               {post.content && typeof post.content === 'string'
//                 ? parse(post.content)
//                 : post.content}
//             </div>
//             <div className="flex flex-wrap mb-8">
//               {post.categories.map((category) => (
//                 <span
//                   key={category._id}
//                   className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm mr-2 mb-2"
//                 >
//                   {category.name}
//                 </span>
//               ))}
//             </div>
//             <div className="flex flex-wrap">
//               {post.tags.map((tag) => (
//                 <span
//                   key={tag._id}
//                   className="bg-green-600 text-white px-3 py-1 rounded-full text-sm mr-2 mb-2"
//                 >
//                   {tag.name}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="mt-8 max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md overflow-hidden p-8">
//           <h2 className="text-3xl font-bold mb-6">Comments</h2>
//           {comments.length > 0 ? (
//             comments.map((comment) => (
//               <div
//                 key={comment._id}
//                 className="mb-6 bg-gray-700 p-4 rounded-lg"
//               >
//                 <div className="flex items-center mb-2">
//                   <div className="text-lg font-bold text-white mr-2">
//                     {comment.postedBy.name}
//                   </div>
//                   <div className="text-gray-400">
//                     {dayjs(comment.createdAt).format('MMMM D, YYYY - HH:mm')}
//                   </div>
//                 </div>
//                 <div className="prose prose-sm max-w-none text-gray-300">
//                   {comment.content && typeof comment.content === 'string'
//                     ? parse(comment.content)
//                     : comment.content}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-400">No comments yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }







  'use client';

  import { useState, useEffect } from 'react';
  import { useRouter, usePathname } from 'next/navigation';
  import axios from 'axios';
  import dayjs from 'dayjs';
  import parse from 'html-react-parser';
  import Prism from 'prismjs';
  import 'prismjs/themes/prism-tomorrow.css';
  import {
    AiOutlineTag,
    AiOutlineCalendar,
    AiOutlineUser,
  } from 'react-icons/ai';
  import { ThreeDots } from 'react-loader-spinner';

  export default function PostDetail() {
    const router = useRouter();
    const pathname = usePathname();
    const slug = pathname.split('/').pop();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (slug) {
        fetchPost();
      }
    }, [slug]);

    useEffect(() => {
      Prism.highlightAll();
    }, [post]);

    const fetchPost = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/post/${slug}`
        );
        console.log('Fetched post data:', data);
        setPost(data.post);
        setComments(data.comments);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setLoading(false);
      }
    };

   if (loading) {
     return (
       <div className="flex justify-center py-8">
         <ThreeDots color="#00BFFF" height={80} width={80} />
       </div>
     );
   }

    if (!post) {
      return <p className="text-center text-gray-400">Post not found.</p>;
    }

    return (
      <div className="min-h-screen bg-gray-900 text-gray-300 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img
              className="w-full h-64 object-cover"
              src={post.featuredImage?.url || '/images/default.jpeg'}
              alt={post.title + ' - onurtaskiran.com'}
            />
            <div className="px-8 py-6">
              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center text-gray-400 mb-4">
                <AiOutlineCalendar className="w-5 h-5 mr-2" />
                <span>
                  {dayjs(post.createdAt).format('MMMM D, YYYY - HH:mm')}
                </span>
                <AiOutlineUser className="w-5 h-5 ml-4 mr-2" />
                <span>{post.postedBy.name}</span>
              </div>
              <div className="prose max-w-none mb-8 text-gray-300 prose-pre:bg-gray-700 prose-code:bg-gray-700 prose-pre:text-gray-300 prose-code:text-gray-300">
                {post.content && typeof post.content === 'string'
                  ? parse(post.content)
                  : post.content}
              </div>
              <div className="flex flex-wrap mb-4">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm mr-2 mb-2"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap">
                {post.tags.map((tag) => (
                  <span
                    key={tag._id}
                    className="bg-green-600 text-white px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center"
                  >
                    <AiOutlineTag className="mr-1" />
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden px-8 py-6">
            <h2 className="text-2xl font-bold mb-6">Comments</h2>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="mb-6 border-b border-gray-700 pb-4"
                >
                  <div className="flex items-center mb-2">
                    <div className="text-lg font-bold text-gray-300 mr-2">
                      {comment.postedBy.name}
                    </div>
                    <div className="text-gray-400">
                      {dayjs(comment.createdAt).format('MMMM D, YYYY - HH:mm')}
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none text-gray-300 prose-pre:bg-gray-700 prose-code:bg-gray-700 prose-pre:text-gray-300 prose-code:text-gray-300">
                    {comment.content && typeof comment.content === 'string'
                      ? parse(comment.content)
                      : comment.content}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    );
  }
