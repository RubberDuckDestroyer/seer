const mongoose = require("mongoose");

const Article = require("./Article").model("Article");
const Profile = require("./Profile").model("Profile");

const BaseRating = {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Profile.modelName,
        required: true
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Article.modelName,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
};
module.exports = BaseRating;
