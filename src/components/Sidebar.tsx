import React from 'react';
import Link from 'next/link';
import SettingsPanel from './SettingsPanel';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 p-6 border-l border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Navigation</h3>
      <ul className="space-y-2">
        <li>
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
            Feed
          </Link>
        </li>
        {/* The "Trending" link has been removed */}
        <li>
          <Link href="/favorites" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
            Favorites
          </Link>
        </li>
      </ul>
      <SettingsPanel />
    </aside>
  );
};

export default Sidebar;