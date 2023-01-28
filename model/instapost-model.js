const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const instaPostSchema = new mongoose.Schema({
    image: {
        type: String,
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
    },
    user: {
        type: ObjectId,
        ref: "registerdata"
    }

}, { timestamps: true })

module.exports = mongoose.model("Instapost", instaPostSchema)