'use client'; // Mark the entire file as a client component for this final test

import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '@/store/store';
import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

// We create a new component here that safely uses the hooks
function AppBody({ children }: { children: React.ReactNode }) {
  const { mode } = useSelector((state: RootState) => state.theme);
  const { isSidebarOpen } = useSelector((state: RootState) => state.ui);

  // This is the effect that applies the theme
  useEffect(() => {
    // This console log is for debugging. Check your browser console (F12).
    console.log('Final Attempt - Applying theme class:', mode);
    document.documentElement.className = mode;
  }, [mode]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
            {isSidebarOpen && <Sidebar />}
          </div>
        </div>
      </body>
    </html>
  );
}

// Your main RootLayout's only job is to provide the Redux store
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <AppBody>{children}</AppBody>
    </Provider>
  );
}