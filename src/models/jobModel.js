import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  requiredSkills: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  jobType: {
    type: String,
    required: true,
    enum: ['Full Time', 'Part Time', 'Internship'],
  },
  experience: {
    type: String,
    required: true,
    trim: true
  },
  ctc: {
    type: String,
    default: 'Not disclosed'
  },
  lastDateToApply: {
    type: Date,
    required: true
  },
  showCtc: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const JobModel = mongoose.models.Job || mongoose.model('Job', jobSchema);
export default JobModel;