"use client";
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  if (pathname === '/story') return null;
  return (
    <div className="relative z-40">
      <Navbar />
    </div>
  );
} 