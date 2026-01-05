import React from 'react';
import { Wrench, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Maintenance_Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl top-20 left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl bottom-20 right-20 animate-pulse delay-1000"></div>
        <div className="absolute w-60 h-60 bg-white/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Icon with animation */}
        <div className="mb-8 inline-block">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-ping"></div>
            <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-full border border-white/20">
              <Wrench className="w-16 h-16 text-white animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
          Under Development
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
          We're crafting something amazing for you
        </p>

        {/* Description */}
        <p className="text-white/80 text-lg mb-12 max-w-md mx-auto">
          This page is currently under construction. Our team is working hard to bring you an exceptional experience.
        </p>

        {/* Progress bar */}
        <div className="mb-12 max-w-md mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-white/30">
            <div className="bg-gradient-to-r from-white to-white/80 h-full rounded-full animate-pulse" style={{ width: '65%' }}></div>
          </div>
          <p className="text-white/70 text-sm mt-2">Progress: 70%</p>
        </div>

        {/* Back to home button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Additional info */}
        <div className="mt-12 text-white/60 text-sm">
          Expected launch: Coming Soon
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-white/5 backdrop-blur-sm rounded-lg rotate-12 animate-bounce hidden md:block"></div>
      <div className="absolute top-10 right-10 w-16 h-16 bg-white/5 backdrop-blur-sm rounded-lg -rotate-12 animate-bounce delay-300 hidden md:block"></div>
    </div>
  );

}
