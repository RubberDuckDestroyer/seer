const mongoose = require("mongoose");

const Profile = require("./Profile").model("Profile");

const ArticleSchema = new mongoose.Schema({
    submission: {
        submitter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Profile.modelName
        },
        bibliography: mongoose.Schema.Types.Mixed,
        statusType: String,
        date: {
            type: Date,
            default: Date.now
        },
        updatedDate: {
            type: Date,
            default: Date.now
        },
        moderator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Profile.modelName
        },
        analyst: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Profile.modelName
        }
    },
    credibilityRatings: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Profile.modelName,
                required: true
            },
            rating: {
                type: Number,
                required: true
            }
        }
    ],
    credibilityOverride: Number,
    qualityRatings: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Profile.modelName,
                required: true
            },
            rating: {
                type: Number,
                required: true
            }
        }
    ],
    question: String,
    metric: String,
    researchMethodType: String,
    methodType: String,
    methodologyType: String,
    benefit: String,
    participants: [String],
    context: {
        where: String,
        when: String,
        what: String,
        whom: String,
        how: String
    },
    result: String,
    confidenceRating: Number,
    integrity: String
});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
