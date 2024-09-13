// app/(dashboard)/DashboardLayout.js (or similar name)
"use client"; // Mark this as a client component

import { Provider } from 'react-redux';
import { store } from '../../lib/context/store/store';
import Sidebar from '@/Components/layout/Sidebar/Sidebar';
import Navbar from '@/Components/layout/Navbar/Navbar';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function DashboardLayout({ children }) {
  return (
    <Provider store={store}>
      <div className='container'>
        <Sidebar />
        <div className='content'>
          <Navbar />
          {children}
        </div>
      </div>
      <Analytics />
      <SpeedInsights />
    </Provider>
  );
}
