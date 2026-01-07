"use client"
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  Power,
  Home,
  MessageCircle,
  Briefcase
} from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get current pathname

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      if (loading) return;
      setLoading(true);

      const response = await axios.post("/api/users/logout");

      if (response.data.success) {
        toast.success("Logout Successful", {
          onClose: () => {
            router.push('/');
            router.refresh();
          },
          autoClose: 2000
        });
      } else {
        toast.error("Failed to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "An error occurred during logout");
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    {
      label: 'Home',
      href: '/admin-dashboard',
      icon: <Home className="w-5 h-5" />
    },
    {
      label: 'All Contacts',
      href: '/admin-dashboard/all-contacts',
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      label: 'Post New Job',
      href: '/admin-dashboard/job-posting',
      icon: <Briefcase className="w-5 h-5" />
    },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md w-full sticky top-0 z-50">
      <ToastContainer
        position="top-right"
        theme="colored"
        limit={1}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Company Name */}
          <Link
            href="/admin-dashboard"
            className="flex items-center space-x-2"
          >
            <img
              src="/images/logo.png"
              alt="Company Logo"
              className="h-20 lg:h-24 w-auto object-contain dark:invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}

            <button
              className='flex items-center gap-2 text-red-500 dark:text-red-400 px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors disabled:opacity-50'
              onClick={handleLogout}
              disabled={loading}
            >
              <Power className="w-5 h-5" />
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-white dark:bg-gray-900 z-40 md:hidden transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ top: '64px' }}
      >
        <div className="h-full overflow-y-auto p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-md transition-colors ${isActive
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
            <button
              className='w-full flex items-center gap-3 px-4 py-3 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors disabled:opacity-50'
              onClick={handleLogout}
              disabled={loading}
            >
              <Power className="w-5 h-5" />
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}