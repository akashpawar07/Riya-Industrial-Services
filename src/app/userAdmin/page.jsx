'use client';
import { useState } from 'react';
import axios from 'axios';

export default function FileUploadComponent() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setUploadStatus(<span className='text-red-600 font-bold'>Please select a file</span>);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadStatus('Uploading...');
      
      const response = await axios.post('/api/users/fileUpload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(response.data); 
      setUploadStatus(<span className='text-green-600 font-bold'>File uploaded successfully</span>);
    } catch (error) {
      setUploadStatus(<span className='text-red-600 font-bold'>File Upload failed</span>);
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleUpload} className="bg-gray-800 bg-opacity-30 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <input 
            type="file" 
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xlsx"
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload File
        </button>
        {uploadStatus && (
          <p className="mt-2 text-center text-sm text-gray-600">{uploadStatus}</p>
        )}
      </form>
    </div>
  );
}