import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Frown,
  Loader,
  Calendar,
  IndianRupee,
  Search,
  GraduationCap,
  BriefcaseBusiness,
  X,
  AlertCircle // Added for error icon
} from 'lucide-react';
import ApplyForJob from "@/components/ApplyForJob";

const JobsSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 1. New error state
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState({ title: '', id: '' });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/users/job-posting");
      
      if (!response.ok) throw new Error("Failed to fetch jobs");
      
      const data = await response.json();
      // Ensure we set an array even if data.data is missing
      setJobs(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      setError("Unable to connect to the server. Please check your internet or try again later.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'No date specified';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  // 2. Safe filtering with optional chaining
  const filteredJobs = (Array.isArray(jobs) ? jobs : []).filter(job => {
    if (job?.lastDateToApply) {
      const deadlineDate = new Date(job.lastDateToApply);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate < today) return false;
    }

    if (!searchTerm.trim()) return true;
    const searchLower = searchTerm.toLowerCase();

    return (
      job?.title?.toString().toLowerCase().includes(searchLower) ||
      job?.location?.toString().toLowerCase().includes(searchLower) ||
      job?.description?.toString().toLowerCase().includes(searchLower) ||
      job?.requiredSkills?.toString().toLowerCase().includes(searchLower) ||
      job?.jobType?.toString().toLowerCase().includes(searchLower)
    );
  });

  const clearSearch = () => setSearchTerm('');

  const handleApplyClick = (job) => {
    setSelectedJob({ title: job?.title || 'Unknown Position', id: job?._id || '' });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b bg-slate-200 dark:bg-gray-900">
      <div className="container mx-auto px-4 pt-8">
        {/* Search Bar */}
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-10 pr-10 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button onClick={clearSearch} className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Header Stats */}
        <div className="mb-8 px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Open Positions</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">Discover your next career opportunity</p>
          </div>
          <div className="bg-blue-50 dark:bg-gray-700 rounded-lg px-4 py-2 text-blue-600 dark:text-blue-300 font-medium">
            Total: <span className="font-bold">{filteredJobs.length}</span>
          </div>
        </div>

        {/* 3. Conditional Rendering: Loading -> Error -> Empty -> Content */}
        {loading ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <Loader className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-semibold dark:text-white">Loading Jobs</h3>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-red-100">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Something went wrong</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <button
              onClick={fetchJobs}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <Frown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold dark:text-white">No Jobs Posted Yet</h3>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <Frown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold dark:text-white">No Positions Found</h3>
            <button onClick={clearSearch} className="mt-4 text-blue-600 font-medium underline">Clear Search</button>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredJobs.map(job => (
              <div key={job?._id || Math.random()} className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 mb-4">
                      {job?.title || "Untitled Position"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 mb-4 text-gray-600 dark:text-gray-400">
                      <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {job?.location || "Remote"}</div>
                      <div className="flex items-center"><BriefcaseBusiness className="w-4 h-4 mr-2" /> {job?.jobType || "Full-time"}</div>
                      <div className="flex items-center"><GraduationCap className="w-4 h-4 mr-2" /> {job?.experience || "Not specified"}</div>
                      <div className="flex items-center"><IndianRupee className="w-4 h-4 mr-2" /> {job?.ctc || "As per industry standards"}</div>
                      <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> Apply By: {formatDate(job?.lastDateToApply)}</div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{job?.description || "No description available."}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold dark:text-white">Required Skills:</h4>
                      <p className="text-gray-600 dark:text-gray-400">{job?.requiredSkills || "Contact HR for skills"}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleApplyClick(job)}
                    className="h-fit bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ApplyForJob
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={selectedJob.title}
        jobId={selectedJob.id}
      />
    </div>
  );
};

export default JobsSection;