import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
    date: Date,
    link: String,
    notes: String
}, { _id: false });

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    interview: interviewSchema // <-- Added interview field
}, { timestamps: true });

export const Application = mongoose.model("Application", applicationSchema);