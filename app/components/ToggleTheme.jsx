import { useContext } from 'react';
import ThemeContext from '../context/theme';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center h-12 w-12"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-8 w-8 text-gray-400" />
      ) : (
        <SunIcon className="h-8 w-8 text-yellow-500" />
      )}
    </button>
  );
};

export default ToggleTheme;

