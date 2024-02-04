const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: String,
    description: String,
    filename: String,
    path: String,
    
});

const imageModel = mongoose.model('image', imageSchema);

module.exports = imageModel;
// Path: src/routes/image.router.js
