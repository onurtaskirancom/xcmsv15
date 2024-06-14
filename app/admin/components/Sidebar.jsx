import Link from 'next/link';

const Sidebar = () => (
  <div className="w-64 h-full bg-gray-800 text-white fixed">
    <div className="p-4">
      <h2 className="text-2xl font-bold">Admin Panel</h2>
    </div>
    <nav className="mt-10">
      <ul>
        <li className="px-4 py-2 hover:bg-gray-700">
          <Link href="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-700">
          <Link href="/admin/posts">All Posts</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-700">
          <Link href="/admin/posts/new">Create New Post</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;
