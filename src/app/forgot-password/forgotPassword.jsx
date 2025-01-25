"use client";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Mail, ArrowLeft, Send, Loader2 } from "lucide-react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        
        // Validate email
        if (!email) {
            toast.warning("Please enter your email address", { theme: "colored" });
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address", { theme: "colored" });
            return;
        }

        try {
            setLoading(true);

            // Set up request timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const response = await axios.post("/api/users/forgotpassword", 
                { email },
                {
                    signal: controller.signal,
                    timeout: 10000,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            clearTimeout(timeoutId);

            if (response.data.success) {
                setEmailSent(true);
                toast.success("Recovery instructions sent to your email", { 
                    theme: "colored",
                    autoClose: 3000 
                });
            } else {
                throw new Error(response.data.error || "Failed to send recovery email");
            }

        } catch (error) {
            let errorMessage = "Failed to send recovery email. Please try again.";
            
            if (error.code === 'ECONNABORTED') {
                errorMessage = "Request timed out. Please try again.";
            } else if (error.response) {
                // Handle specific API error responses
                switch (error.response.status) {
                    case 400:
                        errorMessage = error.response.data.error || "Invalid email address";
                        break;
                    case 404:
                        errorMessage = "Email address not found";
                        break;
                    case 429:
                        errorMessage = "Too many requests. Please try again later";
                        break;
                    case 500:
                        errorMessage = "Server error. Please try again later";
                        break;
                }
            }

            toast.error(errorMessage, { 
                theme: "colored",
                autoClose: 5000
            });
            console.error("Password reset error:", error);
        } finally {
            setLoading(false);
        }
    }, [email]);

    // Handle resend functionality
    const handleResend = useCallback(() => {
        setEmailSent(false);
        setEmail("");
    }, []);

    return (
        <>
            <ToastContainer 
                position="top-right" 
                theme="colored"
                limit={3}
            />
            <div className="forgot-password min-h-screen w-full bg-black/30 flex items-center justify-center p-4">
                {/* Back to Login Button */}
                <Link
                    href="/login"
                    className="fixed top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-300 text-white group"
                >
                    <ArrowLeft className="h-4 w-4 group-hover:transform group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Login</span>
                </Link>

                <div className="w-full max-w-md">
                    <div className="backdrop-blur-lg bg-black/20 p-8 rounded-2xl shadow-2xl border border-white/30">
                        {!emailSent ? (
                            <>
                                <div className="text-center mb-8">
                                    <div className="mb-6">
                                        <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Mail className="h-8 w-8 text-white" />
                                        </div>
                                    </div>
                                    <h1 className="text-3xl font-bold text-white mb-2">
                                        Forgot Password?
                                    </h1>
                                    <p className="text-white/80 text-sm">
                                        No worries! Enter your email and we'll send you instructions to reset your password.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-white font-medium text-sm">
                                            Email Address
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition text-sm"
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            disabled={loading}
                                            autoComplete="email"
                                            
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-2 px-4 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg backdrop-blur-sm transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-5 w-5" />
                                                <span>Send Recovery Email</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-6">
                                <div className="mb-6">
                                    <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Mail className="h-8 w-8 text-green-400" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    Check Your Email
                                </h2>
                                <p className="text-white/80 text-sm mb-6">
                                    We've sent password recovery instructions to{' '} <br />
                                    <span className="font-semibold break-all">{email}</span>
                                </p>
                                <div className="space-y-4">
                                    <button
                                        onClick={handleResend}
                                        className="w-full py-2 px-4 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg backdrop-blur-sm transition duration-200"
                                    >
                                        Didn't receive? Try again
                                    </button>
                                    <Link
                                        href="/login"
                                        className="block text-sm text-blue-300 hover:text-blue-400 transition-colors duration-200 hover:underline"
                                    >
                                        Back to Login
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}