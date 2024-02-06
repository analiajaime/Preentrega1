const express = require("express");
const router = express.Router();

const clientsModel = require("../models/clients.model");

router.get("/", async (req, res) => {
    try {
        const clients = await clientsModel.find();
        res.json(clients);
    } catch (error) {
        console.error("Error al obtener todos los clientes", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


router.post("/", async (req, res) => {
    try {
        const client = new clientsModel(req.body);
        await client.save();
        res.status(201).json({ resultado: "Cliente creado con éxito", cliente });
    } catch (error) {
        console.error("Error al crear un cliente", error);
        res.status(500).json({ error: "Error interno del servidor", errorMessage: error.message });
    }
});


module.exports = router;

