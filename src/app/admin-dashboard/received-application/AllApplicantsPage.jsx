"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  User, Mail, Phone, FileText, Search,
  Briefcase, Loader, AlertCircle, Frown, X, Eye, Calendar, Trash2
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllApplicantsPage = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingResume, setViewingResume] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/api/users/career");
      const data = response.data?.data || response.data || [];
      if (Array.isArray(data)) {
        const reversedData = [...data].reverse();
        setApplicants(reversedData);
      } else {
        setApplicants([]);
      }
    } catch (err) {
      setError("Unable to load applicants.");
      setApplicants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  // --- DELETE HANDLER ---
  const handleSingleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this applicant?")) return;

    try {
      // Show loading toast
      const deleteToast = toast.loading("Deleting applicant...");
      
      const response = await axios.delete(`/api/users/career/${id}`);
      
      if (response.status === 200 || response.status === 204) {
        // Update local state (Optimistic UI)
        setApplicants(applicants.filter(app => app._id !== id));
        
        toast.update(deleteToast, { 
          render: "Applicant deleted successfully!", 
          type: "success", 
          isLoading: false, 
          autoClose: 3000 
        });
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete applicant. Please try again.");
    }
  };

  const handleViewResume = (resumeObj) => {
    try {
      if (!resumeObj || !resumeObj.data) {
        return toast.warning("Resume file not found.");
      }

      let base64Data = "";
      if (resumeObj.data.$binary?.base64) {
        base64Data = resumeObj.data.$binary.base64;
      } else if (typeof resumeObj.data === 'string') {
        base64Data = resumeObj.data;
      } else if (resumeObj.data.data && Array.isArray(resumeObj.data.data)) {
        const uint8Array = new Uint8Array(resumeObj.data.data);
        let binary = '';
        uint8Array.forEach(byte => binary += String.fromCharCode(byte));
        base64Data = window.btoa(binary);
      }

      if (!base64Data) throw new Error("Could not parse base64");

      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(blob);

      setViewingResume({
        uri: fileURL,
        name: resumeObj.filename || "Applicant_Resume"
      });

    } catch (err) {
      toast.error("Error displaying resume.");
    }
  };

  const filteredApplicants = applicants.filter(app =>
    app.applicantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 p-6">
      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <User className="text-blue-600" /> Received Applications
          </h1>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or job title..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20 text-gray-500">
            <Loader className="animate-spin mb-2" /> Loading applicants...
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-sm">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Candidate</th>
                    <th className="px-6 py-4 font-semibold">Applied For</th>
                    <th className="px-6 py-4 font-semibold">Contact</th>
                    <th className="px-6 py-4 font-semibold">Applied On</th>
                    <th className="px-6 py-4 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {filteredApplicants.map((app) => (
                    <tr key={app._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{app.applicantName}</td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{app.jobTitle}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400"><Mail className="w-3.5 h-3.5" /> {app.applicantEmail}</div>
                        <div className="flex items-center gap-2 text-gray-500 mt-1"><Phone className="w-3.5 h-3.5" /> {app.applicantPhone}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {formatDate(app.appliedAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleViewResume(app.resume)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-xs"
                            title='View Applicant Resume'
                          >
                            <Eye className="w-4 h-4" /> View
                          </button>
                          <button
                            onClick={() => handleSingleDelete(app._id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                            title="Delete Applicant"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Resume Modal */}
      {viewingResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 w-full max-w-5xl h-[90vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900 ">
              <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <FileText className="text-blue-500" /> {viewingResume.name}
              </h3>
              <button onClick={() => setViewingResume(null)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 bg-gray-100 dark:bg-gray-900">
              <iframe src={viewingResume.uri} className="w-full h-full border-none" title="Resume Preview" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllApplicantsPage;