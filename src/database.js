const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const clientesModel = require("../models/clientes.model");

mongioose.connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


