// image.router.js
const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

const imageModel = require("../models/image.model.js");

//routes

router.get("/image", async (req, res) => {
    try {
        const image = await imageModel.find();
        
        const nuevoArrayImagenes = image.map((image) => {
            return {
                id: image._id,
                name: image.title,
                description: image.description,
                filename: image.filename,
                path: image.path,
                
            }})
            res.render("partials/image", {image: nuevoArrayImagenes});
    } catch (error) {
        console.error("Error al obtener todas las imagenes", error);
        res.status(500).json({ error: "Error interno del servidor linea 28" });
    }
} );

router.get("/upload", (req, res) => {
    res.render("upload");
}
);

router.post("/upload", async (req, res) => {
    try {
        const { title, description } = req.body;
        const { filename, path, originalname } = req.file;
        const newImage = new imageModel({ title, description, filename, path, originalname });
        await newImage.save();
        res.redirect("/image");
    } catch (error) {
        console.error("Error al subir la imagen", error);
        res.status(500).json({ error: "Error interno del servidor linea 46" });
    }
});

router.get("/image/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const image = await imageModel.findById(id);
        res.render("image", { image });
    } catch (error) {
        console.error("Error al obtener la imagen", error);
        res.status(500).json({ error: "Error interno del servidor linea 57" });
    }
});

router.get("/image/:id/delete", async (req, res) => {
    try {
        const { id } = req.params;
        const image
        = await
        imageModel.findById(id);
        await fs.unlink(image.path);
        await imageModel.findByIdAndDelete(id);
        res.redirect("/image");
    } catch (error) {
        console.error("Error al eliminar la imagen", error);
        res.status(500).json({ error: "Error interno del servidor linea 71" });
    }
}
);









module.exports = router;
