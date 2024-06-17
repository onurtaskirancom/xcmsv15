import CountTo from 'react-count-to';
import Link from 'next/link';

const RenderProgress = ({ number, name, link = '#' }) => (
  <Link href={link}>
    <a className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="#666"
            strokeWidth="10%"
            fill="none"
            className="text-gray-300"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="url(#gradient)"
            strokeWidth="10%"
            fill="none"
            strokeDasharray="282.6"
            strokeDashoffset="0"
            className="animate-progress"
          />
          <defs>
            <linearGradient id="gradient">
              <stop offset="0%" stopColor="#666" />
              <stop offset="50%" stopColor="#fff" />
              <stop offset="100%" stopColor="#111" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xl font-semibold">
          <CountTo to={number} speed={number * 100} />
        </div>
      </div>
      <p className="mt-4 text-gray-600">{name.toUpperCase()}</p>
    </a>
  </Link>
);

export default RenderProgress;
