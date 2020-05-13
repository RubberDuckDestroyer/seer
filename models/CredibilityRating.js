const mongoose = require("mongoose");
const BaseRating = require("./BaseRating");

const CredibilityRatingSchema = new mongoose.Schema(BaseRating);

const CredibilityRating = mongoose.model("CredibilityRating", CredibilityRatingSchema);
module.exports = CredibilityRating;
