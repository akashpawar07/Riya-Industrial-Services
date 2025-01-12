"use client";
import React, { useState, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff, Home } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const handleResetPassword = useCallback(async (e) => {
        e.preventDefault();

        if (!passwords.newPassword || !passwords.confirmPassword) {
            toast.warning("All fields are mandatory", { autoClose: 3000 });
            return;
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("Passwords do not match", { theme: "colored" });
            return;
        }

        try {
            setLoading(true);
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const response = await axios.post("/api/users/resetpassword", {
                token,
                newPassword: passwords.newPassword
            }, {
                signal: controller.signal,
                timeout: 10000
            });

            clearTimeout(timeoutId);

            if (response.data.success) {
                toast.success("Password Reset Successful", {
                    onClose: () => {
                        router.push('/login');
                        router.refresh();
                    },
                    autoClose: 2000
                });
            } else {
                toast.error(response.data.message || "Password Reset Failed", { theme: "colored" });
            }
        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                toast.error("Request timed out. Please try again.", { theme: "colored" });
            } else {
                toast.error(error.response?.data?.error || "Failed to reset password", { theme: "colored" });
            }
            console.error("Password reset error:", error);
        } finally {
            setLoading(false);
        }
    }, [passwords, token, router]);

    const handleInputChange = useCallback((field) => (e) => {
        setPasswords(prev => ({ ...prev, [field]: e.target.value }));
    }, []);

    const togglePasswordVisibility = useCallback((field) => () => {
        if (field === 'password') {
            setShowPassword(prev => !prev);
        } else {
            setShowConfirmPassword(prev => !prev);
        }
    }, []);

    const submitButtonText = useMemo(() =>
        loading ? "Resetting..." : "Reset Password",
        [loading]
    );

    return (
        <>
            <ToastContainer position="top-right" theme="colored" />
            <div className="loginPage min-h-screen w-full bg-black/30 flex items-center justify-center p-4">
                {/* Home Button */}
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
                                {loading ? "Processing..." : "Reset Password"}
                            </h1>
                            <p className="text-white/80">Enter your new password</p>
                        </div>

                        <form onSubmit={handleResetPassword} className="space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="newPassword" className="block text-white font-medium">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition text-sm"
                                        type={showPassword ? "text" : "password"}
                                        name="newPassword"
                                        id="newPassword"
                                        value={passwords.newPassword}
                                        onChange={handleInputChange('newPassword')}
                                        placeholder="Enter new password"
                                    />
                                    {/* <button
                                        type="button"
                                        onClick={togglePasswordVisibility('password')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button> */}
                                </div>
            
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="block text-white font-medium">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition text-sm"
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        value={passwords.confirmPassword}
                                        onChange={handleInputChange('confirmPassword')}
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility('confirm')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
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