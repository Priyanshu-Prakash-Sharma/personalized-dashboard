'use client'; // This directive is essential

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Header from './Header';
import Sidebar from './Sidebar';

export default function AppBody({ children }: { children: React.ReactNode }) {
  const { mode } = useSelector((state: RootState) => state.theme);
  const { isSidebarOpen } = useSelector((state: RootState) => state.ui);

  // This hook applies the theme class to the <html> tag
  useEffect(() => {
    document.documentElement.className = mode;
  }, [mode]);

  return (
    <body className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
          {isSidebarOpen && <Sidebar />}
        </div>
      </div>
    </body>
  );
}