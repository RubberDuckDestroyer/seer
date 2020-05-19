const mongoose = require("mongoose");
const BaseRating = require("./BaseRating");

const QualityRatingSchema = new mongoose.Schema(BaseRating);

const QualityRating = mongoose.model("QualityRating", QualityRatingSchema);
module.exports = QualityRating;
