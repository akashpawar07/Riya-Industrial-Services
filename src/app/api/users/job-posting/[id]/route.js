// app/api/jobs/[id]/route.js
import { NextResponse } from 'next/server';
import connect from "@/Config/database";
import jobModel from "@/models/jobModel";
import mongoose from 'mongoose';


export async function DELETE(req, { params }) {
    try {
        await connect();

        const { id } = params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({
                success: false,
                message: "Invalid job ID"
            }, { status: 400 });
        }

        const deletedJob = await jobModel.findByIdAndDelete(id);

        if (!deletedJob) {
            return NextResponse.json({
                success: false,
                message: "Job not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Job deleted successfully"
        }, { status: 200 });

    } catch (error) {
        console.error("Error deleting job:", error);
        return NextResponse.json({
            success: false,
            message: "Error deleting job"
        }, { status: 500 });
    }
}