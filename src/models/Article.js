const mongoose = require("mongoose");

const Profile = require("./Profile").model("Profile");

const ArticleSchema = new mongoose.Schema({
    submission: {
        submitter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Profile.modelName
        },
        bibliography: mongoose.Schema.Types.Mixed,
        statusType: string,
        submitDate: {
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
    question: string,
    metric: string,
    researchMethodType: string,
    methodType: string,
    methodologyType: string,
    benefit: string,
    participants: [String],
    context: {
        where: string,
        when: string,
        what: string,
        whom: string,
        how: string
    },
    result: string,
    confidenceRating: Number,
    integrityType: string
});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
