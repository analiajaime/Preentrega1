const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const multer = require('multer'); 
const upload = multer({ dest: 'uploads/' });

const imageModel = require("../models/image.model.js");

// GET para subir una imagen
router.get("/upload", (req, res) => {
    res.render("upload");
});


router.post("/upload", upload.single('file'), async (req, res) => {
    try {
        const { title, description } = req.body;
        const { filename, path, originalname } = req.file; 
        const newImage = new imageModel({ title, description, filename, path, originalname });
        await newImage.save();
        res.redirect("/image");
    } catch (error) {
        console.error("Error al subir la imagen", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// GET para obtener todas las imágenes
router.get("/image", async (req, res) => {
    try {
        const images = await imageModel.find();
        
        const nuevoArrayImagenes = images.map((image) => ({
            id: image._id,
            name: image.title,
            description: image.description,
            filename: image.filename,
            path: image.path,
        }));
        
        res.render("partials/image", { images: nuevoArrayImagenes });
    } catch (error) {
        console.error("Error al obtener todas las imagenes", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// GET para obtener una imagen específica por ID
router.get("/image/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const image = await imageModel.findById(id);
        res.render("image", { image });
    } catch (error) {
        console.error("Error al obtener la imagen", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// GET para eliminar una imagen específica por ID
router.get("/image/:id/delete", async (req, res) => {
    try {
        const { id } = req.params;
        const image = await imageModel.findById(id);
        await fs.unlink(image.path);
        await imageModel.findByIdAndDelete(id);
        res.redirect("/image");
    } catch (error) {
        console.error("Error al eliminar la imagen", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;
