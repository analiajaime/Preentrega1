const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    title: String,
    description: String,
    filename: String,
    path: String,
})

const ImageModel = mongoose.model("Image", imageSchema, "images");


module.exports = ImageModel;
