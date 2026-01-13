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

  // 1. Sync state if props change (Fixes empty jobId/jobTitle console issue)
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        jobTitle: jobTitle,
        jobId: jobId
      }));
    }
  }, [isOpen, jobTitle, jobId]);

  // 2. Disable background scroll
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
      setFileName(file.name);
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
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (file && allowedTypes.includes(file.type)) {
      setFormData(prev => ({ ...prev, resume: file }));
      setFileName(file.name);
    } else {
      toast.error("Please drop a valid PDF or Word document.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- VALIDATION LOGIC ---

    // Name Validation
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    if (!formData.applicantName.trim()) {
      toast.error("Full name is required", { position: 'top-center' });
      return;
    } else if (!nameRegex.test(formData.applicantName)) {
      toast.error("For your name, please use letters only. No numbers or multiple spaces allowed.", { position: 'top-center' });
      return;
    }

    // Email Validation (Enterprise Standard)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.applicantEmail)) {
      toast.warning("Please enter a valid professional email address.", { position: 'top-center' });
      return;
    }

    // Phone Validation (10 digits, no leading 0)
    const phonePattern = /^[1-9]\d{9}$/;
    if (!phonePattern.test(formData.applicantPhone)) {
      toast.error("Please enter a valid 10-digit phone number without prefixes or spaces.", { position: 'top-center' });
      return;
    }

    // Resume Validation
    if (!formData.resume) {
      toast.error("Please upload your resume.", { position: 'top-center' });
      return;
    }
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(formData.resume.type)) {
      toast.error("Resume must be a PDF or Word document.", { position: 'top-center' });
      return;
    }
    if (formData.resume.size > 5 * 1024 * 1024) {
      toast.error("Resume file size must be 5MB or less.", { position: 'top-center' });
      return;
    }

    // Double check jobId/Title
    if (!formData.jobId || !formData.jobTitle) {
      toast.error("Missing job reference information.", { position: 'top-center' });
      return;
    }

    // --- API SUBMISSION ---
    setIsSubmitting(true);
    try {
      const submitData = new FormData();
      submitData.append('applicantName', formData.applicantName);
      submitData.append('applicantEmail', formData.applicantEmail);
      submitData.append('applicantPhone', formData.applicantPhone);
      submitData.append('jobId', formData.jobId);
      submitData.append('jobTitle', formData.jobTitle);
      submitData.append('resume', formData.resume);

      const res = await axios.post("/api/users/career", submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        toast.success(res.data.message || "Application submitted successfully!", { autoClose: 2000 });
        resetForm();
        // Separate timer to close modal
        setTimeout(() => {
          setIsSubmitting(false);
          onClose();
        }, 3000);
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error(error.response?.data?.message || "An error occurred while submitting");
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <ToastContainer position="top-center" theme="light" />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar border border-x-violet-700 border-y-red-700 bg-white dark:bg-gray-900 rounded-lg shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Apply for Position</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Submit your application below</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Applying For
                </label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  readOnly
                  className="w-full px-4 py-2 bg-slate-200 dark:bg-gray-800 outline-none rounded-lg text-gray-900 dark:text-white cursor-not-allowed"
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Hash className="w-4 h-4 mr-2" />
                  Job ID
                </label>
                <input
                  type="text"
                  value={formData.jobId}
                  readOnly
                  className="w-full px-4 py-2 bg-slate-200 dark:bg-gray-800 outline-none rounded-lg text-gray-900 dark:text-white cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User className="w-4 h-4 mr-2" />
                Full Name <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  name="applicantEmail"
                  value={formData.applicantEmail}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Number <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="tel"
                  name="applicantPhone"
                  value={formData.applicantPhone}
                  onChange={handleInputChange}
                  placeholder="9876543210"
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Resume Upload Section */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Upload className="w-4 h-4 mr-2" />
                Upload Resume <span className="text-red-500 ml-1">*</span>
              </label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${isDragging
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-700 bg-slate-200 dark:bg-gray-800'
                  }`}
              >
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="resume" className="cursor-pointer flex flex-col items-center">
                  <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" />
                  {fileName ? (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <FileText className="w-5 h-5" />
                      <span className="font-medium">{fileName}</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                        Drop your resume here or click to browse
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        PDF, DOC (Max 5MB)
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Important Note Section */}
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300">Important Contact Note</h4>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-1 leading-relaxed">
                    Please provide your <strong>primary email and phone number</strong>. All application updates will be sent to this address. If an incorrect or temporary email is used, you will miss critical notifications; ensuring valid contact info is the applicant&apos;s responsibility.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
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