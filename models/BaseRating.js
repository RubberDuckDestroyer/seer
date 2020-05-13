const mongoose = require("mongoose");

const BaseRating = {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
};
module.exports = BaseRating;
