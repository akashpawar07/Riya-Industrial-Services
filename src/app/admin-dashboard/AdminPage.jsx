"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Users, Briefcase } from "lucide-react";
import Loader from '@/components/Loader';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [contactCount, setContactCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, contactRes, jobsRes] = await Promise.all([
          axios.get("/api/users/userAdmin"),
          axios.get("/api/users/contact"),
          axios.get("/api/users/job-posting"),
        ]);
        
        setUser(userRes.data[0]);
        setContactCount(contactRes.data.data.length);
        setJobCount(jobsRes.data.data.length);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 dark:bg-gray-900">
      <div className=""><Loader/></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900 p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 sm:p-6 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            Welcome, {user?.username}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            {user?.email}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <Link 
            href="/admin-dashboard/all-contacts" 
            className="cursor-pointer"
          >
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div>
                <h3 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Total Contacts
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                  {contactCount}
                </p>
              </div>
              <Users className="text-blue-500 h-8 w-8 sm:h-10 sm:w-10" />
            </div>
          </Link>
          
          <Link 
            href="/admin-dashboard/job-posting" 
            className="cursor-pointer"
          >
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div>
                <h3 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Posted Jobs
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                  {jobCount}
                </p>
              </div>
              <Briefcase className="text-green-500 h-8 w-8 sm:h-10 sm:w-10" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}