"use client"

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = [
    'https://img.freepik.com/free-photo/workers-examining-work_1122-970.jpg?t=st=1735195563~exp=1735199163~hmac=fd855682a1507cb349b73824f45a991ecc87c7fd7eec5033545cce95fe45a118&w=900',
    'https://img.freepik.com/free-photo/construction-silhouette_1150-8336.jpg?t=st=1735195592~exp=1735199192~hmac=6119908e9e829832ea9c266284adf98dca2a77785a1a83dd9ac80a304898ade7&w=900',
    'https://img.freepik.com/free-photo/working-hard-building-man-construction-worker_1122-1849.jpg?t=st=1735195644~exp=1735199244~hmac=2c5f6a38a168a4209cbd5e66c0830e3f56a4d9ed48d43ce000b44f3e90e3790b&w=900',
    'https://img.freepik.com/free-photo/construction-silhouette_1127-2991.jpg?t=st=1735196162~exp=1735199762~hmac=5ecfd32f13531736a0884e8493cefccdd60ba9157acaaf8e620a077a5f4b0cea&w=900',
    'https://img.freepik.com/free-photo/happy-contractors-pointing-white-laptop-display-showing-isolated-blank-screen-wireless-pc-team-builders-holding-computer-with-empty-copyspace-template-posing-studio_482257-60531.jpg?t=st=1735196205~exp=1735199805~hmac=267f15f5f4ce62c4b6f5904cc70ead7742fd9bb7146668424900966dba422c9a&w=900',
  ];

  const titles = [
    'Scaffholding',
    'Image 2',
    'Image 3',
    'Image 4',
    'Image 5'
  ];

  // Fix: Wrapped in useCallback to prevent dependency errors and unnecessary re-renders
  const handleSlideChange = useCallback((newIndex) => {
    setIsTransitioning(true);
    setCurrentIndex((prev) =>
      typeof newIndex === 'function' ? newIndex(prev) : newIndex
    );
    setTimeout(() => setIsTransitioning(false), 800);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        handleSlideChange((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isTransitioning, handleSlideChange]); // Fix: Added handleSlideChange to dependency array

  return (
    <div className="relative w-full overflow-hidden">
      <div className="h-[50vh] lg:h-[90vh]">
        <div
          className="absolute top-0 left-0 h-full flex will-change-transform"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(-${currentIndex * (100 / images.length)}%)`,
            transition: 'transform 800ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              style={{ width: `${100 / images.length}%` }}
              className="relative h-full flex-shrink-0"
            >
              {/* Fix: Replaced <img> with Next.js <Image /> */}
              <Image
                src={image}
                alt={titles[index] || "Slide Image"}
                fill // Use fill for dynamic slider containers
                priority={index === 0} // Load the first image immediately for LCP
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 md:space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => !isTransitioning && handleSlideChange(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${currentIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
