import connect from "@/Config/database";
import JobApplication from "@/models/jobApplicationModel";
import { NextResponse } from "next/server";
import { sendJobApplicationSuccessEmail } from "@/Config/emailFormat";

// post route for applying the job
export async function POST(request) {
    // 1. Database connection
    await connect();

    try {
        // 2. IMPORTANT: Use formData() instead of json() to handle files
        const data = await request.formData();
        // console.log("getting data: ",data)

        const applicantName = data.get("applicantName");
        const applicantEmail = data.get("applicantEmail");
        const applicantPhone = data.get("applicantPhone");
        const jobTitle = data.get("jobTitle");
        const jobId = data.get("jobId");
        const file = data.get("resume");

        // Check if an application already exists for this job with this email OR phone
        const isAlreadyApplied = await JobApplication.findOne({
            jobId: jobId,
            $or: [
                { applicantEmail: applicantEmail },
                { applicantPhone: applicantPhone }
            ]
        });

        if (isAlreadyApplied) {
            return Response.json(
                { message: "You have already applied for this job with this email or phone number." },
                { status: 400 }
            );
        }


        // 1. Checking here File Size (2MB = 2 * 1024 * 1024 bytes)
        const MAX_FILE_SIZE = 2 * 1024 * 1024;
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({
                message: "Resume file size must be 2MB or less.",
                success: false,
            }, { status: 400 });
        }

        // 2.file allowed types
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        // 3. Validation check
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({
                message: "Resume must be a PDF or Word document (.pdf, .doc, .docx).",
                success: false,
            }, { status: 400 });
        }

        if (!applicantName || !applicantEmail || !applicantPhone || !jobId || !jobTitle) {
            console.log("All fields are compulsary");
            return NextResponse.json({
                message: "All fields are compulsary",
                success: false,
            }, { status: 400 });
        }

        if (!file) {
            return NextResponse.json({
                message: "Resume is required",
                success: false
            }, { status: 400 });
        }

        // 3. Convert File object to Buffer for MongoDB
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // 4. Create the application document
        const newApplication = await JobApplication.create({
            jobId,
            jobTitle,
            applicantName,
            applicantEmail,
            applicantPhone,
            resume: {
                data: buffer,
                filename: file.name,
                fileSize: file.size,
                contentType: file.type,
            }
        });

        //send email
        await sendJobApplicationSuccessEmail(
            newApplication.applicantEmail,
            newApplication.applicantName,
            newApplication._id,
            newApplication.jobTitle
        );

        // console.log(newApplication)

        return NextResponse.json({
            message: "Application submitted successfully",
            success: true,
            applicationId: newApplication._id
        }, { status: 201 });


    } catch (error) {
        console.error("Error in Job Application Route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


// get all applied job list
export async function GET(request) {
    // Database connection
    await connect();

    try {
        // find all appliedjobs
        const jobs = await JobApplication.find();

        return NextResponse.json({
            message: "All application fetch successfully",
            success: true,
            data: jobs
        }, { status: 200 })

    } catch (error) {
        console.error("Failed to load jobs:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to load jobs"
        }, { status: 500 });
    }
}