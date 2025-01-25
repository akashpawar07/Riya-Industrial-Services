import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Frown,
  Loader,
  Calendar,
  IndianRupee,
  Search,
  GraduationCap,
  BriefcaseBusiness
} from 'lucide-react';

const JobsSection = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/users/job-posting");
        const data = await response.json();
        setJobs(data.data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'No date specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Fixed search functionality
  const filteredJobs = jobs.filter(job => {
    if (!searchTerm.trim()) return true; // Show all jobs if search is empty

    const searchLower = searchTerm.toLowerCase();

    // Safely check each field with optional chaining and convert to string
    const titleMatch = job?.title?.toString().toLowerCase().includes(searchLower) || false;
    const locationMatch = job?.location?.toString().toLowerCase().includes(searchLower) || false;
    const descriptionMatch = job?.description?.toString().toLowerCase().includes(searchLower) || false;
    const skillsMatch = job?.requiredSkills?.toString().toLowerCase().includes(searchLower) || false;
    const typeMatch = job?.jobType?.toString().toLowerCase().includes(searchLower) || false;

    return titleMatch || locationMatch || descriptionMatch || skillsMatch || typeMatch;
  });

  // Debug logging (remove in production)
  useEffect(() => {
    if (searchTerm) {
      console.log('Search term:', searchTerm);
      console.log('Filtered jobs count:', filteredJobs.length);
    }
  }, [searchTerm, filteredJobs]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    
      <div className="container mx-auto px-4 pt-8">
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search jobs by title, location, description, skills, or job type..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       placeholder-gray-500 dark:placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-8 px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Open Positions
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Discover your next career opportunity
            </p>
          </div>
          <div className="flex items-center bg-blue-50 dark:bg-gray-700 rounded-lg px-4 py-2">
            <span className="font-medium text-blue-600 dark:text-blue-300">
              Total Positions: <span className="font-bold">{jobs.length}</span>
            </span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <Loader className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Loading Jobs</h3>
            <p className="text-gray-600 dark:text-gray-400">Please wait while we fetch available positions...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <Frown className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Jobs Posted Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We don't have any open positions at the moment. Please check back later.
            </p>
            
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <Frown className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Positions Found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We couldn't find any positions matching your search criteria.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              View All Positions
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredJobs.map(job => (
              <div key={job._id} className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-6"> 
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {job.title}
                      </h3>
                      
                    </div>  

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 mb-4">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <BriefcaseBusiness className="w-4 h-4 mr-2" />
                        {job.jobType}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        {job.experience}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <IndianRupee className="w-4 h-4 mr-2" />
                        {job.ctc}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Apply By : {formatDate(job.lastDateToApply)}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-600 dark:text-gray-400">{job.description}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Required Skills:</h4>
                      <div className="flex flex-wrap gap-2">

                        <p>{job.requiredSkills}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex lg:flex-col gap-4 lg:gap-2">
                    <button className="flex-1 lg:flex-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                      Apply Now
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsSection;