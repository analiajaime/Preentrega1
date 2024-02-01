const express = require("express");
const router = express.Router();

const CartManager = require("../controllers/cartManager");
const cartManager = new CartManager("./src/models/carts.json")

router.post("/carts", async (req, res) =>{
    try {
        await cartManager.loadCarts();
        const newCart = await cartManager.createNewCart();
        res.json(newCart);
    } catch (error) {
        console.error("Error al crear un nuevo carrito", error);
        res.status(500).json({error: "Error interno del servidor"});
    }
})

router.get("/carts/:cid", async (req, res)=>{
    const {cid} = req.params;

    try {
        const cart = await cartManager.searchCart(cid);
        res.json(cart.products);
    } catch (error) {
        console.error("Error al buscar carrito", error);
        res.status(500).json({error: "Error interno del servidor."});
    }
})

router.post("/carts/:cid/product/:pid", async (req, res) => {
    const {cid} = req.params;
    const {pid} = req.params;
    const quantity = req.body.quantity || 1;
    try {
        const cartUpdate = await cartManager.addProductToCart(cid, pid, quantity);
        res.json(cartUpdate.products);
    } catch (error) {
        console.error("Error al agregar el producto. Linea 38", error);
        res.status(500).json({error: "Error interno del servidor. Linea 39"});
    }
})

// Agregar la ruta GET /api/carts
router.get("/carts", async (req, res) => {
    try {
        const allCarts = await cartManager.getAllCarts();
        res.json(allCarts);
    } catch (error) {
        console.error("Error al obtener todos los carritos. Linea 50", error);
        res.status(500).json({ error: "Error interno del servidor. Linea 51" });
    }
});


module.exports = router;