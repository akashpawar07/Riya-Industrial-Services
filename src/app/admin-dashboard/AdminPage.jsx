"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Users, Briefcase, FileUser, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [contactCount, setContactCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [receivedApplicationCount, setReceivedApplicationCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, contactRes, jobsRes, receivedApplicantRes] = await Promise.all([
          axios.get("/api/users/userAdmin"),
          axios.get("/api/users/contact"),
          axios.get("/api/users/job-posting"),
          axios.get("/api/users/career")
        ]);

        setUser(userRes.data[0]);
        setContactCount(contactRes.data?.data?.length || 0);
        setJobCount(jobsRes.data?.data?.length || 0);
        setReceivedApplicationCount(receivedApplicantRes.data?.data?.length || 0);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900 p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 sm:p-6 mb-6">
          {loading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          ) : (
            <>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                Welcome, {user?.username}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                {user?.email}
              </p>
            </>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {loading ? (
            // Inline Loading State (Skeletons)
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex justify-between items-center animate-pulse">
                <div className="space-y-3 w-1/2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
            ))
          ) : (
            <>
              <StatCard 
                href="/admin-dashboard/all-contacts" 
                title="Total Contacts" 
                count={contactCount} 
                icon={<Users className="text-blue-500 h-8 w-8 sm:h-10 sm:w-10" />} 
              />
              <StatCard 
                href="/admin-dashboard/job-posting" 
                title="Posted Jobs" 
                count={jobCount} 
                icon={<Briefcase className="text-green-500 h-8 w-8 sm:h-10 sm:w-10" />} 
              />
              <StatCard 
                href="/admin-dashboard/received-application" 
                title="Received Application" 
                count={receivedApplicationCount} 
                icon={<FileUser className="text-pink-500 h-8 w-8 sm:h-10 sm:w-10" />} 
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable StatCard to keep the code clean
function StatCard({ href, title, count, icon }) {
  return (
    <Link href={href} className="cursor-pointer">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <div>
          <h3 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{count}</p>
        </div>
        {icon}
      </div>
    </Link>
  );
}