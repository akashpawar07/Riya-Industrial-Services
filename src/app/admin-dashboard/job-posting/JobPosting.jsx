"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Briefcase,
    PlusCircle,
    Trash2,
    Calendar,
    IndianRupee,
    CheckCircle2,
    AlertCircle,
    MapPin,
    Clock,
    Award
} from 'lucide-react';

const JobPostingSystem = () => {
    const initialFormData = {
        title: '',
        description: '',
        requiredSkills: '',
        location: '',
        jobType: 'Full Time',
        experience: '',
        ctc: 'Not disclosed',
        lastDateToApply: '',
        showCtc: false
    };

    const jobTypes = ['Full Time', 'Part Time', 'Internship'];

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/users/job-posting');
                setJobs([...response.data.data]);
            } catch (error) {
                console.error('Failed to fetch jobs:', error);
                toast.error('Failed to load jobs');
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const validateForm = () => {
        if (!isSubmitting) return true;

        const requiredFields = {
            title: 'Job Title',
            description: 'Job Description',
            requiredSkills: 'Required Skills',
            location: 'Location',
            jobType: 'Job Type',
            experience: 'Experience',
            lastDateToApply: 'Last Date to Apply'
        };

        let isValid = true;

        for (const [field, label] of Object.entries(requiredFields)) {
            if (!formData[field].trim()) {
                toast.error(`${label} is required`);
                isValid = false;
            }
        }

        const currentDate = new Date().toISOString().split('T')[0];
        if (formData.lastDateToApply < currentDate) {
            toast.error('Last date to apply cannot be in the past');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('/api/users/job-posting', formData);
            setJobs(prevJobs => [...prevJobs, response.data.data]);
            toast.success('Job posted successfully!');
            setFormData(initialFormData);
            setIsSubmitting(false);
            // console.log()
        } catch (error) {
            console.error('Failed to post job:', error);
            toast.error(error.response?.data?.message || 'Failed to post job');
            setIsSubmitting(false);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job posting?')) {
            return;
        }

        try {
            setLoading(true);
            await axios.delete(`/api/users/job-posting/${id}`);
            setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
            toast.success('Job deleted successfully');
        } catch (error) {
            console.error('Failed to delete job:', error);
            toast.error(error.response?.data?.message || 'Failed to delete job');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCtcToggle = () => {
        setFormData(prev => ({
            ...prev,
            showCtc: !prev.showCtc,
            ctc: !prev.showCtc ? prev.ctc : 'Not disclosed'
        }));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="container mx-auto p-6 max-w-7xl bg-slate-200 dark:bg-gray-800">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Job Posting Form */}
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Briefcase className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Post New Job</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Job Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium dark:text-gray-100 mb-1">
                                Job Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full px-4 py-2 border dark:border-none dark:text-white dark:bg-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="e.g. Senior Software Engineer"
                            />
                        </div>

                        {/* Job Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium dark:text-gray-100 text-gray-700 mb-1">
                                Job Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                disabled={loading}
                                rows="4"
                                className="w-full px-4 py-2 border dark:border-none dark:text-white dark:bg-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="Enter detailed job description..."
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium dark:text-gray-100 text-gray-700 mb-1">
                                Location
                            </label>
                            <input
                                id="location"
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full px-4 py-2 border dark:border-none dark:text-white dark:bg-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="e.g. New York, NY"
                            />
                        </div>

                        {/* Job Type */}
                        <div>
                            <label htmlFor="jobType" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">
                                Job Type
                            </label>
                            <select
                                id="jobType"
                                name="jobType"
                                value={formData.jobType}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full px-4 py-2 border dark:border-none dark:text-white dark:bg-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            >
                                {jobTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        {/* Experience */}
                        <div>
                            <label htmlFor="experience" className="block text-sm font-medium dark:text-gray-100 text-gray-700 mb-1">
                                Experience Required
                            </label>
                            <input
                                id="experience"
                                type="text"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full px-4 py-2 border dark:border-none dark:text-white dark:bg-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="e.g. 2-3 years"
                            />
                        </div>

                        {/* Required Skills */}
                        <div>
                            <label htmlFor="requiredSkills" className="block text-sm font-medium dark:text-gray-100 text-gray-700 mb-1">
                                Required Skills
                            </label>
                            <input
                                id="requiredSkills"
                                type="text"
                                name="requiredSkills"
                                value={formData.requiredSkills}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full px-4 py-2 border dark:border-none dark:text-white dark:bg-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="e.g. React, Node.js, MongoDB"
                            />
                        </div>

                        {/* CTC */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label htmlFor="ctc" className="text-sm font-medium dark:text-gray-200 text-gray-700">CTC</label>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handleCtcToggle}
                                        disabled={loading}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.showCtc ? 'bg-blue-600' : 'dark:bg-gray-200 bg-gray-700'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full dark:bg-black bg-white  transition-transform ${formData.showCtc ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                    <span className="text-sm dark:text-gray-100 text-gray-700">Show CTC</span>
                                </div>
                            </div>
                            <input
                                id="ctc"
                                type="text"
                                name="ctc"
                                value={formData.ctc}
                                onChange={handleChange}
                                disabled={!formData.showCtc || loading}
                                className="w-full px-4 py-2 border dark:border-none dark:text-white dark:bg-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="e.g. $80,000 - $100,000"
                            />
                        </div>

                        {/* Last Date to Apply */}
                        <div>
                            <label htmlFor="lastDateToApply" className="block text-sm font-medium dark:text-gray-100 text-gray-700 mb-1">
                                Last Date to Apply
                            </label>
                            <input
                                id="lastDateToApply"
                                type="date"
                                name="lastDateToApply"
                                value={formData.lastDateToApply}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full px-4 py-2 border dark:border-none dark:text-white dark:bg-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <PlusCircle className="w-5 h-5" />
                            {loading ? 'Posting...' : 'Post Job'}
                        </button>
                    </form>
                </div>

                {/* Job Listings */}
                <div className="w-full md:p-4 rounded-lg dark:bg-gray-700">
                    <div className="flex sm:items-center gap-2 mb-6">
                        <Briefcase className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Posted Jobs: <span>{jobs.length}</span></h2>
                    </div>

                    <div className="space-y-4 max-h-[calc(100vh-10px)] overflow-y-auto">
                        {loading && jobs.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="text-gray-500 mt-4">Loading jobs...</p>
                            </div>
                        ) : jobs.length === 0 ? (
                            <div className="text-center py-8">
                                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">No jobs posted yet</p>
                            </div>
                        ) : (
                            jobs.map((job) => (
                                <div key={job._id} className="bg-white dark:bg-gray-900 border dark:border-none rounded-lg p-4 md:p-6 hover:shadow-lg transition">
                                    <div className="space-y-4 w-full">
                                        {/* Job Title and Delete Button Row */}
                                        <div className="flex items-start justify-between gap-4">
                                            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                                            <button
                                                onClick={() => handleDelete(job._id)}
                                                disabled={loading}
                                                className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition shrink-0"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>


                                        {/* Job Description */}
                                        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">{job.description}</p>

                                         {/* Job Basic Info */}
                                         <div className="flex flex-wrap flex-col gap-3 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4 shrink-0" />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4 shrink-0" />
                                                {job.jobType}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Award className="w-4 h-4 shrink-0" />
                                                {job.experience}
                                            </span>
                                        </div>

                                        {/* Additional Details */}
                                        <div className="space-y-2">

                                            <div className="flex items-center gap-2">
                                                <IndianRupee className="w-5 h-5 text-blue-600 shrink-0" />
                                                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                                                    <span className="font-medium">CTC:</span> {job.ctc}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-5 h-5 text-red-600 shrink-0" />
                                                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                                                    <span className="font-medium">Apply by:</span> {formatDate(job.lastDateToApply)}
                                                </p>
                                            </div>

                                            <div className="flex items-start gap-2">
                                                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                                                    <span className="font-medium">Skills:</span> {job.requiredSkills}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default JobPostingSystem;