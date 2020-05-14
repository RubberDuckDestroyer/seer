const mongoose = require("mongoose");
const BaseRating = require("./BaseRating");

const CredibilityRatingSchema = new mongoose.Schema({
    ...BaseRating,
    reason: String
});

const CredibilityRating = mongoose.model("credibilityrating", CredibilityRatingSchema);
module.exports = CredibilityRating;
