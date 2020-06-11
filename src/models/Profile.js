const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    username: {
        type: string,
        required: true
    },
    password: {
        type: string,
        required: true
    },
    firstName: {
        type: string,
        required: true
    },
    lastName: {
        type: string,
        required: true
    },
    middleName: string,
    email: {
        type: string,
        required: true
    },
    affiliationType: {
        type: string,
        required: true
    },
    affiliationName: {
        type: string,
        required: true
    },
    role: string,
    gender: string,
    birthDate: Date
});

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
