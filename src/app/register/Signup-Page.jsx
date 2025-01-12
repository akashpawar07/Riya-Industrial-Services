"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: ""
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!user.username || !user.email || !user.password) {
        toast.warning("All fields are mandatory", { theme: "colored" });
        return;
      }

      const response = await axios.post("/api/users/register", user);
      if (response.data.success === true) {
        router.push("/login");
        toast.success("Signup Successful", { theme: "colored" });
        console.log("Signup Successful", response)
        return;
      }
      if (response.data.success === false) {
        router.push("/register");
        toast.error("User already exists", { theme: "colored" });
        console.log("User already exists", response)
        return;
      } else {
        toast.error("Failed to Signup", { theme: "colored" });
        console.log("Failed to Signup....")
        return;
      }

    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />

      <div className="h-[90vh] md:py-6 w-screen md:w-[100%] md:h-[auto] flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center text-blue-600 font-bold m-5 md:mb-8">
          {loading ? "processing..." : "Signup"}
        </h1>

        <form 
          action="#" 
          className="text-white gap-4 py-4 md:bg-[#191732] w-full md:w-[33%] md:h-[85vh] flex flex-col items-center justify-center rounded-lg"
        >
          {/* User Type Radio Buttons */}
          {/* <div className='w-[80%] flex justify-center gap-4 mb-4'>
            <div>
              <input 
                type="radio" 
                id="user" 
                name="userType" 
                value="user" 
                checked={user.userType === "user"}
                onChange={() => setUser({...user, userType: "user"})}
              />
              <label htmlFor="user" className="ml-2">User</label>
            </div>
            <div>
              <input 
                type="radio" 
                id="admin" 
                name="userType" 
                value="admin" 
                checked={user.userType === "admin"}
                onChange={() => setUser({...user, userType: "admin"})}
              />
              <label htmlFor="admin" className="ml-2">Admin</label>
            </div>
          </div> */}

          <div className="w-[99%] h-[100px] gap-2 flex flex-col justify-center items-center ">
            <div className=" w-[80%]">
              <label htmlFor="username" className="">Enter your name</label>
            </div>
            <div className=" w-[80%]">
              <input
                className="py-2 px-2 w-[99%] text-slate-950 font-bold rounded-md"
                type="text"
                name="username"
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="name"
              />
            </div>
          </div>

          <div className="w-[99%] h-[100px] gap-2 flex flex-col justify-center items-center">
            <div className="w-[80%]">
              <label htmlFor="email" className="">Enter your email</label>
            </div>
            <div className="w-[80%]">
              <input
                className="py-2 px-2 w-[99%] text-slate-950 font-bold rounded-md"
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
              />
            </div>
          </div>

          <div className="w-[99%] h-[100px] gap-2 flex flex-col justify-center items-center">
            <div className="w-[80%]">
              <label htmlFor="password" className=" font-thin">Create password</label>
            </div>
            <div className="w-[80%] text-slate-900">
              <input
                className="py-2 px-2 w-[99%] text-slate-950 font-bold rounded-md"
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
              />
            </div>
          </div>

          <button
            onClick={handleSignup}
            className="bg-gray-700 px-4 py-2 w-[78%] rounded-md font-extrabold mt-5"
            type="submit"
          >
            Signup
          </button>

          <div className="text-[18px]">
            <span>if you have already account </span>
            <Link href="/login" className="text-blue-600 font-extrabold">Login</Link>
          </div>
        </form>
      </div>
    </>
  )
}