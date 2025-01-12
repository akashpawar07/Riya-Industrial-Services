import React from 'react';

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-white bg-opacity-80">
      <div className="loader">
        <div className="w-16 h-16 border-8 border-t-8 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default Loader;