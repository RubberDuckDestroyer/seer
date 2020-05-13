const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    affiliationType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    affiliationName: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    gender: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    birthDate: {
        type: Date,
        required: false
    }
});

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
