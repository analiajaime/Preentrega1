// Require de Express
const express = require("express");
const app = express();
const PORT = 8080;
const expressHbs = require("express-handlebars");
const socket = require("socket.io"); 

//Require de ProductManager
const ProductManager = require("./controllers/productManager")
const productManager = new ProductManager("./src/models/products.json")

//Routers
const productsRouter = require("./routes/products.router");
const cartRouter = require("./routes/carts.router");
const viewsRouter = require("./routes/views.router");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//Routes
app.use("/api", productsRouter);
app.use("/api", cartRouter);
app.use("/", viewsRouter)

//Handlebars
app.engine("handlebars", expressHbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//socket
const httpServer = app.listen(PORT);


const io = new socket.Server(httpServer);

io.on("connection", async (socket) => {
    console.log("Cliente conectado");
    socket.emit("products", await productManager.readFile());
    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id);
        io.sockets.emit("products", await productManager.getProducts());
    });

    socket.on("addProduct", async (product) => {
        await productManager.addProduct(product);
        io.sockets.emit("products", await productManager.readFile());
    });
})


