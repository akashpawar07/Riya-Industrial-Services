"use client"
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Wrench,
  Settings,
  Factory,
  LogOut,
  Power
} from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      if (loading) return; // Prevent multiple clicks
      setLoading(true);
      
      const response = await axios.post("https://riya-industrial-services.vercel.app/api/users/logout");
      
      if (response.data.success) {
        // Show success toast and navigate after it closes
        toast.success("Logout Successful", {
          onClose: () => {
            router.push('/');
            router.refresh(); // Force a router refresh
          },
          autoClose: 2000 // 2000 seconds
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
    { label: 'About Us', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Career', href: '/career' },
    { label: 'Contact Us', href: '/contact' }
  ];

  const serviceItems = [
    { label: 'Maintenance', icon: <Wrench className="w-5 h-5" />, href: '/services/maintenance' },
    { label: 'Manufacturing', icon: <Factory className="w-5 h-5" />, href: '/services/manufacturing' },
    { label: 'Engineering', icon: <Settings className="w-5 h-5" />, href: '/services/engineering' },
  ];

  return (
    <div className='bg-slate-800/50'>
      <ToastContainer 
        position="top-right"
        theme="colored"
        limit={1}
      />
      {/* navbar section */}
      <nav className="bg-white shadow-md w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Company Name */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Riya Industrial Services Admin
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <button
                className='text-red-500 p-3 md:flex gap-2 items-center hover:bg-red-100 rounded-md transition-colors disabled:opacity-50'
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
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setIsDropdownOpen(false);
                }}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 md:hidden transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '64px' }}
      >
        <div className="h-full overflow-y-auto">
          <div className="px-4 pt-4 pb-20 space-y-3">
            {/* Services Section in Mobile */}
            <div className="space-y-2">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                Services
                <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>

              <div
                className={`pl-4 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
                  isDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {serviceItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Other Nav Items */}
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              className='text-red-500 p-3 flex gap-2 items-center hover:bg-red-50 rounded-md transition-colors w-full disabled:opacity-50'
              onClick={handleLogout}
              disabled={loading}
            >
              <LogOut className="w-5 h-5" />
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}