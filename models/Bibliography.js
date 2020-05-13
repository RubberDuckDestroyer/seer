const mongoose = require("mongoose");

const BibliographySchema = new mongoose.Schema({
    author: [{
        type: String
    }],
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    volume: {
        type: Number,
        required: false
    },
    issue: {
        type: Number,
        required: false
    },
    pages: [{
        type: String
    }],
    resource: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const Bibliography = mongoose.model("Bibliography", BibliographySchema);
module.exports = Bibliography;
