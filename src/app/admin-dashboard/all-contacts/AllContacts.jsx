"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, User, UsersRound, CircleUserRound, X, ChevronRight, MessageSquare, Calendar, Inbox, ArrowLeft, Search, Trash2 } from "lucide-react";
import {ToastContainer, toast } from 'react-toastify';
import Loader from '@/components/Loader';

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState("");
    const [contacts, setContacts] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, contactRes] = await Promise.all([
                    axios.get("/api/users/userAdmin"),
                    axios.get("/api/users/contact")
                ]);
                setUser(userRes.data[0]);
                setContacts([...contactRes.data.data].reverse());
            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSingleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                const response = await axios.delete(`/api/users/contact/${id}`);

                if (response.data.success) {
                    // Only update state if delete was successful
                    setContacts(contacts.filter(contact => contact._id !== id));
                    setSelectedMessage(null);
                    // Show success message
                    toast.success('Message deleted successfully', { autoClose: 2000 });
                } else {
                    // Handle unsuccessful deletion (e.g., if message wasn't found)
                    toast.warn(response.data.error || 'Failed to delete message');
                }
            } catch (err) {
                console.error('Error deleting message:', err);
                // Show more specific error message
                alert(err.response?.data?.error || 'Failed to delete message');
            }
        }
    };

    const filteredContacts = contacts.filter(contact =>
        contact.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="min-h-screen bg-slate-200 dark:bg-gray-800">
            <div className="md:p-6 p-3 max-w-7xl mx-auto space-y-6">
                {/* User Info Section */}
                {/* <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome, {user.username}</h1>
                            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg border border-blue-100 dark:border-blue-800">
                            <MessageSquare className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                            <span className="text-blue-600 dark:text-blue-300 font-medium">
                                Total Messages: {contacts.length}
                            </span>
                        </div>
                    </div>
                </div> */}

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5/ text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by sender or subject..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none"
                    />
                </div>

                {/* Messages List */}
                <div className="bg-white w-full dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    {/* Updated Header Section */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-t-xl border-b dark:border-gray-700">
                        <div className="grid grid-cols-3 sm:grid-cols-12 px-3 sm:px-6 py-4 gap-2 sm:gap-0">
                            <div className="col-span-1 sm:col-span-3 flex items-center gap-1 sm:gap-2">
                                <UsersRound className="h-4 sm:h-5 w-4 sm:w-5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                                <span className="font-semibold text-gray-700 dark:text-gray-200 text-sm sm:text-base whitespace-nowrap">Sender</span>
                            </div>
                            <div className="col-span-1 sm:col-span-6 flex items-center gap-1 sm:gap-2">
                                <Inbox className="h-4 sm:h-5 w-4 sm:w-5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                                <span className="font-semibold text-gray-700 dark:text-gray-200 text-sm sm:text-base whitespace-nowrap">Subject</span>
                            </div>
                            <div className="col-span-1 sm:col-span-3 flex items-center gap-1 sm:gap-2">
                                <Calendar className="h-4 sm:h-5 w-4 sm:w-5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                                <span className="font-semibold text-gray-700 dark:text-gray-200 text-sm sm:text-base whitespace-nowrap">Date</span>
                            </div>
                        </div>
                    </div>

                    {/* Updated Message List Section */}
                    <div className="h-[600px] md:h-[550px] overflow-y-auto">
                        {filteredContacts.length > 0 ? (
                            filteredContacts.map((contact, index) => (
                                <div
                                    key={contact._id}
                                    onClick={() => setSelectedMessage(contact)}
                                    className="grid grid-cols-3 sm:grid-cols-12 px-3 sm:px-6 py-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-150 gap-2 sm:gap-0"
                                >
                                    <div className="col-span-1 sm:col-span-3 flex items-center gap-1 sm:gap-2">
                                        <CircleUserRound className="h-4 sm:h-5 w-4 sm:w-5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                                        <span className="truncate dark:text-gray-200 text-sm sm:text-base">{contact.name}</span>
                                    </div>
                                    <div className="col-span-1 sm:col-span-6 truncate dark:text-gray-200 text-sm sm:text-base">{contact.subject}</div>
                                    <div className="col-span-1 sm:col-span-3 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                                        {new Date(contact.updatedAt).toLocaleDateString()}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500 dark:text-gray-400 text-lg">No messages available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Message Modal */}
            {selectedMessage && (
                <div className="fixed z-[100] inset-0 bg-black/70 dark:bg-black/70">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl shadow-2xl transform transition-all border border-gray-200 dark:border-gray-700 max-h-[90vh] flex flex-col">
                            <div className="border-b dark:border-gray-700 flex-shrink-0">
                                <div className="px-6 py-4 flex justify-between items-center">
                                    <button
                                        onClick={() => setSelectedMessage(null)}
                                        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                                    >
                                        <ArrowLeft className="h-5 w-5" />
                                        <span className="font-medium">Back to Messages</span>
                                    </button>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleSingleDelete(selectedMessage._id)}
                                            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-colors group"
                                            title="Delete message"
                                        >
                                            <Trash2 className="h-5 w-5 text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-300" />
                                        </button>
                                        <button
                                            onClick={() => setSelectedMessage(null)}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                            title="Close"
                                        >
                                            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                <div className="p-6 space-y-6">
                                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-3 border border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-2">
                                                <User className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                                    {selectedMessage.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {selectedMessage.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                            <Calendar className="h-4 w-4" />
                                            <span>
                                                {new Date(selectedMessage.updatedAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-xl px-4 font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                            {selectedMessage.subject}
                                        </h2>
                                    </div>

                                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                                        <div className="prose dark:prose-invert max-w-none">
                                            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                                                {selectedMessage.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}