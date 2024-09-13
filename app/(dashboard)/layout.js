// app/(dashboard)/layout.js
import DashboardLayout from './DashboardLayout';
import { Inter } from 'next/font/google';
import "../globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'G&G Dashboard',
  description: 'G&G System Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  className={inter.className}>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}
