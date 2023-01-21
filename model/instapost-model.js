const mongoose = require("mongoose");


const instaPostSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true

    },
    location: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true

    },
    Date: {
        type: String,
        default: new Date().toDateString().slice(4)
    }

}, { timestamps: true })

module.exports = mongoose.model("Instapost", instaPostSchema)