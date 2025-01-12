"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

export default function LogoutUser(){

    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await axios.post("/api/logout")

            if (response.data.success === true) {
                router.push("/");
                console.log("Logout successful...", response);
                toast.success("Logout Successful",{theme : "colored"})
                return;
            }else{
                console.log("Failed to logout...")
            }
        } catch (error) {
            console.log("An error occurred : ",error.message)
        }
    }


    return (
        <button 
        onClick={handleLogout}
        >Logout</button>
    );
}