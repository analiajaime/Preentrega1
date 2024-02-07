const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    title: String,
    description: String,
    filename: String,
    path: String,
})

const ImageModel = mongoose.model("image", imageSchema, "images");


module.exports = ImageModel;
