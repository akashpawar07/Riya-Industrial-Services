
import React from 'react';
import { Image, Camera, ImagePlus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <div className="max-w-6xl mx-auto">
       

        {/* Main content */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Gallery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Our visual journey is being curated
          </p>
        </div>

        {/* Image grid placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center group hover:scale-105 transition-transform duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                {index % 3 === 0 ? (
                  <Image className="w-12 h-12 text-gray-400 dark:text-gray-500 group-hover:text-purple-500 transition-colors" />
                ) : index % 3 === 1 ? (
                  <Camera className="w-12 h-12 text-gray-400 dark:text-gray-500 group-hover:text-purple-500 transition-colors" />
                ) : (
                  <ImagePlus className="w-12 h-12 text-gray-400 dark:text-gray-500 group-hover:text-purple-500 transition-colors" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon message */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <div className="inline-block p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6">
            <ImagePlus className="w-12 h-12 text-purple-600 dark:text-purple-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Images Coming Soon
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            We're currently curating and preparing our best work to showcase here. Our gallery will feature stunning visuals that capture our projects, achievements, and moments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-500 dark:text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>In Progress</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
            <div>Expected: Q1 2026</div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Stay tuned!
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Check back soon to explore our complete collection of images
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
