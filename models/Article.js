const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    submission: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    credibilityOverride: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    question: {
        type: String,
        required: false
    },
    metric: {
        type: String,
        required: false
    },
    researchMethod: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    methodType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    methodologyType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    benefit: {
        type: String,
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    context: {
        type: Object,
        required: false
    },
    result: {
        type: String,
        required: true
    },
    confidenceRating: {
        type: Number,
        required: false
    },
    integrity: {
        type: String,
        required: false
    }
});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
