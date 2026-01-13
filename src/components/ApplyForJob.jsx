import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  Briefcase,
  Hash,
  User,
  Mail,
  Phone,
  FileText
} from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ApplyForJob({ isOpen, onClose, jobTitle, jobId }) {
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    jobTitle: jobTitle || '',
    jobId: jobId || '',
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    resume: null
  });

  //
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        jobTitle: jobTitle,
        jobId: jobId
      }));
    }
  }, [isOpen, jobTitle, jobId]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      jobTitle: jobTitle,
      jobId: jobId,
      applicantName: '',
      applicantEmail: '',
      applicantPhone: '',
      resume: null
    });
    setFileName('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- NEW: Instant Validation Helper ---
  const validateFile = (file) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      toast.error("Resume must be a PDF or Word document.", { position: 'top-center' });
      return false;
    }
    if (file.size > maxSize) {
      toast.error("Resume file size must be 2MB or less.", { position: 'top-center' });
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (validateFile(file)) {
        setFormData(prev => ({ ...prev, resume: file }));
        setFileName(file.name);
      } else {
        // Clear input if invalid
        e.target.value = null;
        setFormData(prev => ({ ...prev, resume: null }));
        setFileName('');
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];

    if (file) {
      if (validateFile(file)) {
        setFormData(prev => ({ ...prev, resume: file }));
        setFileName(file.name);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- VALIDATION ---
    const nameRegex = /^[a-zA-Z]{2,}(?:\s[a-zA-Z]{2,}){1,2}$/;
    if (!formData.applicantName.trim()) {
      toast.warning("Full name is required");
      return;
    } else if (!nameRegex.test(formData.applicantName)) {
      toast.warning("For your name, please use letters only.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.applicantEmail)) {
      toast.warning("Please enter a valid email address.");
      return;
    }

    const phonePattern = /^[1-9]\d{9}$/;
    if (!phonePattern.test(formData.applicantPhone)) {
      toast.warning("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!formData.resume) {
      toast.warning("Please upload your resume.");
      return;
    }

    setIsSubmitting(true);

    // --- FORM DATA PREPARATION ---
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });

    // --- THE LOGIC WRAPPER (Crash-Proof) ---
    const careerPromise = axios.post("/api/users/career", submitData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((res) => {
      // Check for success flag in 200 OK responses
      if (!res.data.success) {
        return Promise.reject(res.data.message || "Submission failed");
      }
      return res.data;
    });

    // --- TOAST PROMISE ---
    toast.promise(
      careerPromise,
      {
        pending: "Uploading resume and submitting...",
        success: {
          render({ data }) {
            resetForm();
            setTimeout(() => {
              setIsSubmitting(false);
              onClose();
            }, 2000);
            return data.message || "Application submitted successfully! 📄";
          }
        },
        error: {
          render({ data }) {
            setIsSubmitting(false);
            // Safely extract message from Axios error or our Rejected string
            const msg = typeof data === 'string' ? data : data?.response?.data?.message;
            return msg || "Something went wrong ❌";
          }
        }
      }
    );
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <ToastContainer position="top-center" theme="light" />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar border border-x-violet-700 border-y-red-700 bg-white dark:bg-gray-900 rounded-lg shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Apply for Position</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Submit your application below</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Briefcase className="w-4 h-4 mr-2" /> Applying For
                </label>
                <input type="text" value={formData.jobTitle} readOnly className="w-full px-4 py-2 bg-slate-200 dark:bg-gray-800 outline-none rounded-lg cursor-not-allowed" />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Hash className="w-4 h-4 mr-2" /> Job ID
                </label>
                <input type="text" value={formData.jobId} readOnly className="w-full px-4 py-2 bg-slate-200 dark:bg-gray-800 outline-none rounded-lg cursor-not-allowed" />
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User className="w-4 h-4 mr-2" /> Full Name <span className="text-red-500 ml-1">*</span>
              </label>
              <input type="text" name="applicantName" value={formData.applicantName} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700" placeholder='e.g. John Doe' />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="w-4 h-4 mr-2" /> Email <span className="text-red-500 ml-1">*</span>
                </label>
                <input type="email" name="applicantEmail" value={formData.applicantEmail} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800" placeholder="john.doe@example.com" />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Phone className="w-4 h-4 mr-2" /> Phone <span className="text-red-500 ml-1">*</span>
                </label>
                <input type="tel" name="applicantPhone" value={formData.applicantPhone} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800" placeholder='9876543210' />
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Upload className="w-4 h-4 mr-2" /> Upload Resume <span className="text-red-500 ml-1">*</span>
              </label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-slate-200 dark:bg-gray-800'}`}
              >
                <input type="file" id="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                <label htmlFor="resume" className="cursor-pointer flex flex-col items-center">
                  <Upload className="w-12 h-12 text-gray-400 mb-3" />
                  {fileName ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <FileText className="w-5 h-5" />
                      <span className="font-medium">{fileName}</span>
                    </div>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300">Drop resume here or click to browse</p>
                  )}
                </label>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
              <button type="button" onClick={onClose} className="px-6 py-2.5 border rounded-lg">Cancel</button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className={`px-6 py-2.5 rounded-lg text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyForJob;