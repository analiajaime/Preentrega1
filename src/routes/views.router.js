const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/productManager");
const productManager = new ProductManager("./src/models/products.json");


router.get("/", async (req, res) =>{
    try {
        const products = await productManager.readFile();
        
        res.render("index", {products});
    } catch (error) {
        console.error("Error al leer el archivo: ", error);
    }
})

router.get("/realtimeproducts", (req, res) => {
    try {
        res.render("realTimeProducts");
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor. Linea 23"
        })
    }
})

router.get("/product/:pid", async (req, res) =>{
    const {pid} = req.params;
    try {
        const product = await productManager.getProductById(pid);
        res.render("product", {product});
    } catch (error) {
        console.error("Error al leer el archivo: ", error);
    }
})

router.get("/product/edit/:pid", async (req, res) =>{
    const {pid} = req.params;
    try {
        const product = await productManager.getProductById(pid);
        res.render("editProduct", {product});
    } catch (error) {
        console.error("Error al leer el archivo: ", error);
    }
})

router.get("/product/delete/:pid", async (req, res) =>{
    const {pid} = req.params;
    try {
        const product = await productManager.getProductById(pid);
        res.render("deleteProduct", {product});
    } catch (error) {
        console.error("Error al leer el archivo: ", error);
    }
})

router.get("/product/add", (req, res) =>{
    try {
        res.render("addProduct");
    } catch (error) {
        console.error("Error al leer el archivo: ", error);
    }
})

router.get("/cart", (req, res) =>{
    try {
        res.render("cart");
    } catch (error) {
        console.error("Error al leer el archivo: ", error);
    }
})

router.get ("/contacto", (req, res) =>{
    try {
        res.render("contacto");
    } catch (error) {
        console.error("Error al leer el archivo: ", error);
    }
}
)

router.get ("/chat", (req, res) =>{
    try {
        res.render("chat");
    } catch (error) {
        console.error("Error al leer el archivo: ", error);
    }
}
)

router.get ("/image", (req, res) =>{
    try {
        res.render("image");
    } catch (error) {
        console.error("Error al leer el archivo: ", error);
    }
}
)


module.exports = router;