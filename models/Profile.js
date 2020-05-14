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
    middleName: String,
    email: {
        type: String,
        required: true
    },
    affiliationType: {
        type: String,
        required: true
    },
    affiliationName: {
        type: String,
        required: true
    },
    role: String,
    gender: String,
    birthDate: Date
});

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
