import connect from "@/Config/database";
import JobApplication from "@/models/jobApplicationModel";
import { NextResponse } from "next/server";
import mongoose from 'mongoose';


export async function DELETE(req, { params }) {
    await connect();
    try {
        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({
                success: false,
                message: "Invalid applicant Id"
            }, { status: 400 });
        }

        const deletedJob = await JobApplication.findByIdAndDelete(id);

        if (!deletedJob) {
            return NextResponse.json({
                success: false,
                message: "Applicantion not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Job application deleted successfully"
        }, { status: 200 });

    } catch (error) {
        console.error("Error deleting job application:", error);
        return NextResponse.json({
            success: false,
            message: "Error deleting job application"
        }, { status: 500 });
    }
}