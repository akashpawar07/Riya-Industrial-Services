"use client";
import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff, Home } from "lucide-react";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    // handling the loginc logic here
    const handleLogin = useCallback(async (e) => {
        e.preventDefault();

        if (!user.email || !user.password) {
            toast.warning("All fields are mandatory");
            return;
        }

        setLoading(true);

        // We pass the promise directly to toast.promise
        // We use .then() to handle the "success: false" case without crashing the app
        const loginPromise = axios.post("/api/users/login", user, { timeout: 10000 })
            .then((res) => {
                // If server sends 200 OK but success is false
                if (!res.data.success) {
                    return Promise.reject(res.data.message || "Invalid Password");
                }
                return res.data;
            });

        toast.promise(
            loginPromise,
            {
                pending: "Verifying credentials...",
                success: {
                    render({ data }) {
                        setTimeout(() => {
                            router.push('/admin-dashboard');
                            router.refresh();
                        }, 1500);
                        return "Login Successful! Redirecting...";
                    }
                },
                error: {
                    render({ data }) {
                        // 'data' will be the string from Promise.reject or the Axios error message
                        const msg = typeof data === 'string' ? data : data?.response?.data?.message;
                        return msg || "Login Failed";
                    }
                }
            }
        ).finally(() => {
            setLoading(false);
        });

    }, [user, router]);

    const handleInputChange = useCallback((field) => (e) => {
        setUser(prev => ({ ...prev, [field]: e.target.value }));
    }, []);

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    const submitButtonText = useMemo(() =>
        loading ? "Signing in..." : "Sign In",
        [loading]
    );

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} />
            <div className="loginPage min-h-screen w-full bg-black/30 flex items-center justify-center p-4">
                {/* Home Button - Fixed Position */}
                <Link
                    href="/"
                    className="fixed top-4 left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 group"
                >
                    <Home className="h-6 w-6 text-white group-hover:text-blue-300" />
                </Link>

                <div className="w-full max-w-md relative">
                    <div className="backdrop-blur-lg bg-black/20 p-8 rounded-2xl shadow-2xl border border-white/30">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-white mb-2">
                                {loading ? "Processing..." : "Welcome Back"}
                            </h1>
                            <p className="text-white/80">Use your email to sign in</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-white font-medium">
                                    Username
                                </label>
                                <input
                                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition text-sm"
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={user.email}
                                    onChange={handleInputChange('email')}
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-white font-medium">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition text-sm"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        value={user.password}
                                        onChange={handleInputChange('password')}
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {/* Forgot Password Link */}
                                <div className="flex justify-end mt-1">
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm text-blue-300 hover:text-blue-400 transition-colors duration-200 hover:underline"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg backdrop-blur-sm transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/50"
                                >
                                    {submitButtonText}
                                </button>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}