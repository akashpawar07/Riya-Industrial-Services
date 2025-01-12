import JobModel from "@/models/jobModel";
import { NextResponse } from 'next/server';
import connect from "@/Config/database";

// Database connection
connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();

        const {
            title, description, requiredSkills, location, jobType, experience, ctc, lastDateToApply, showCtc
        } = reqBody;

        if(!title || !description || ! requiredSkills || !location || !jobType || !experience || !lastDateToApply){
            return NextResponse({
                message : "All required fields are mandatory",
                success : false,
            })
        }


        // Create new job
        const newJob = new JobModel({
            title, description, requiredSkills, location,
            jobType, experience, ctc, lastDateToApply, showCtc
        });

        // Save job and capture any validation errors
        try {
            const savedJob = await newJob.save();

            return NextResponse.json({
                success: true,
                message: "Job posted successfully",
                data: savedJob
            }, { status: 201 });

        } catch (saveError) {
            // Handle MongoDB validation errors
            if (saveError.name === 'ValidationError') {
                const errorMessages = Object.keys(saveError.errors).map(field => 
                    `${field}: ${saveError.errors[field].message}`
                );
                
                return NextResponse.json({
                    success: false,
                    message: "Validation failed",
                    errors: errorMessages
                }, { status: 400 });
            }
            throw saveError; // Re-throw other errors
        }

    } catch (error) {
        console.error("Request failed:", error);
        return NextResponse.json({
            success: false,
            message: error.message || "Internal Server Error"
        }, { status: 500 });
    }
}

export async function GET() {
    try {
        const allJobs = await JobModel.find().sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            message: allJobs.length ? "Jobs fetched successfully" : "No jobs found",
            data: allJobs
        }, { status: 200 });

    } catch (error) {
        console.error("Failed to load jobs:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to load jobs"
        }, { status: 500 });
    }
}