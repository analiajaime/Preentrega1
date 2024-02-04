const express = require("express");
const router = express.Router();

const clientesModel = require("../models/clientes.model");

router.get("/", async (req, res) => {
    try {
        const clientes = await clientesModel.find();
        res.json(clientes);
    } catch (error) {
        console.error("Error al obtener todos los clientes", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


router.post("/", async (req, res) => {
    try {
        const cliente = new clientesModel(req.body);
        await cliente.save();
        res.status(201).json({ resultado: "Cliente creado con éxito", cliente });
    } catch (error) {
        console.error("Error al crear un cliente", error);
        res.status(500).json({ error: "Error interno del servidor", errorMessage: error.message });
    }
});


module.exports = router;

