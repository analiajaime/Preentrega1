const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const clientsModel = require("./models/clients.model");
const multer = require("multer");
const upload = multer({ dest: "src/public/image" });
const fs = require("fs").promises;
const path = require('path');
const ImageModel = require("./models/image.model.js");


// Conexión a la base de datos MongoDB
mongoose.connect("mongodb+srv://analiajaime:AmadeuS01@cluster0.tinq6s3.mongodb.net/e-commerce?retryWrites=true&w=majority", {
 
})
  .then(() => {
    console.log("Conectado a la base de datos AnaliaJaime");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos. Linea 62", error);
  });

