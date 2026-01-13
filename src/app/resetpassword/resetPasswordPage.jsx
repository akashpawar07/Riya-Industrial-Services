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

    //handling reset-password logic here
    const handleResetPassword = useCallback((e) => {
    e.preventDefault();

    // 1. Validations (Remain the same)
    if (!passwords.newPassword || !passwords.confirmPassword) {
        toast.warning("All fields are mandatory");
        return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
        toast.error("Passwords do not match");
        return;
    }

    setLoading(true);

    // 2. Create the promise logic
    const resetPromise = axios.post("/api/users/resetpassword", {
        token,
        newPassword: passwords.newPassword
    }, { timeout: 10000 })
    .then((res) => {
        if (!res.data.success) {
            return Promise.reject(res.data.message || "Reset failed");
        }
        return res.data;
    });

    // 3. Pass to toast.promise with a "Muffler" catch
    toast.promise(
        resetPromise,
        {
            pending: "Updating your password...",
            success: {
                render() {
                    setTimeout(() => {
                        router.push('/login');
                        router.refresh();
                    }, 2000);
                    return "Password Reset Successful! ";
                }
            },
            error: {
                render({ data }) {
                    // Extract message safely from Axios error or our Rejected string
                    const msg = typeof data === 'string' ? data : data?.response?.data?.message;
                    return msg || "Failed to reset password";
                }
            }
        }
    ).catch(() => {
        // This prevents the "Unhandled Runtime Error" overlay if the API returns 400/500
        console.log("Reset rejection handled by toast UI.");
    }).finally(() => {
        setLoading(false);
    });

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
            <ToastContainer position="top-center" autoClose={3000} limit={3} />

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