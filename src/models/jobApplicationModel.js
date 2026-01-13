import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', // Reference to Job model
        required: [true, 'Job ID is required- from DB']
    },
    jobTitle: {
        type: String,
        required: [true, 'Job title is required- from DB'],
        trim: true
    },

    // Applicant Information
    applicantName: {
        type: String,
        required: [true, 'Applicant name is required- from DB'],
        trim: true
    },
    applicantEmail: {
        type: String,
        required: [true, 'Email is required- from DB'],
        trim: true,
        lowercase: true,
    },

    applicantPhone: {
        type: String,
        required: [true, 'Phone number is required- from DB'],
        trim: true
    },

    // Resume Information
    resume: {
        data: Buffer,
        filename: String,
        fileSize: Number,
        contentType: String,
    },

    // Application Status
    status: {
        type: String,
        enum: ['pending', 'reviewing', 'shortlisted', 'rejected', 'hired'],
        default: 'pending'
    },

    // Additional Metadata
    appliedAt: {
        type: Date,
        default: Date.now
    },

    // Interview Details (optional)
    interview: {
        scheduled: {
            type: Boolean,
            default: false
        },
        date: Date,
        time: String,
        location: String,
        mode: {
            type: String,
            enum: ['in-person', 'virtual', 'phone'],
        },
        meetingLink: String
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

const JobApplication = mongoose.models.JobApplication || mongoose.model('JobApplication', jobApplicationSchema);

export default JobApplication;