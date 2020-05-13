const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
    submitter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bibliography: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    moderator: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    analyst: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }
});

const Submission = mongoose.model("Submission", SubmissionSchema);
module.exports = Submission;
