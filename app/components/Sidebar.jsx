import React, { useContext } from 'react';
import ThemeContext from '../context/theme';
import Link from 'next/link';
import {
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineGithub,
} from 'react-icons/ai';

const Sidebar = ({ recentPosts, categories, tags }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`p-5 lg:w-64 w-full mt-20 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
      } rounded-lg`}
    >
      <div className="mb-8 text-center">
        <img
          src="/images/onurtaskiran.jpg"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-bold mb-2">About</h2>
        <p>
          Welcome to my blog! Here, I share my thoughts, tutorials, and news
          about technology and coding.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Social Media</h2>
        <div className="flex justify-center space-x-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineTwitter size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineLinkedin size={24} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineGithub size={24} />
          </a>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Categories</h2>
        <div className="flex flex-wrap">
          {categories.map((category, index) => (
            <Link
              href={`/category/${category.slug}`}
              key={index}
              legacyBehavior
            >
              <a className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full m-1 text-xs">
                {category.name}
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Tags</h2>
        <div className="flex flex-wrap">
          {tags.map((tag, index) => (
            <Link href={`/tag/${tag.slug}`} key={index} legacyBehavior>
              <a className="bg-green-100 text-green-700 py-1 px-3 rounded-full m-1 text-xs">
                {tag.name}
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Recent Posts</h2>
        <ul>
          {recentPosts.slice(0, 5).map((post, index) => (
            <li key={index} className="mb-2">
              <Link href={`/${post.slug}`} legacyBehavior>
                <a className="text-blue-500 hover:underline text-sm">
                  {post.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
