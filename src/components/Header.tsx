'use client';
import React, { useEffect } from 'react'; // <-- Import useEffect
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { toggleTheme } from '@/store/features/themeSlice';
import { toggleSidebar, setSearchTerm } from '@/store/features/uiSlice';
import { FiMenu, FiSun, FiMoon, FiSearch } from 'react-icons/fi';

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { mode } = useSelector((state: RootState) => state.theme);
  const { searchTerm } = useSelector((state: RootState) => state.ui);

  // This hook will run whenever 'mode' changes
  useEffect(() => {
    document.documentElement.className = mode;
  }, [mode]);

  return (
    <header className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 shadow-sm flex justify-between items-center z-10">
      {/* ... rest of your header JSX remains the same ... */}
       <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Personalized Dashboard</h2>
      <div className="relative flex-1 max-w-xl mx-4">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search content..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm} onChange={(e) => dispatch(setSearchTerm(e.target.value))} />
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => dispatch(toggleTheme())} className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
          {mode === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>
        <button onClick={() => dispatch(toggleSidebar())} className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
          <FiMenu size={20} />
        </button>
      </div>
    </header>
  );
};
export default Header;