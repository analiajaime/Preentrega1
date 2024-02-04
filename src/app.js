const express = require("express");
const app = express();
const PORT = 8080;
const expressHbs = require("express-handlebars");
const socket = require("socket.io"); 
const mongoose = require("mongoose");
const multer = require("multer");

// Require de ProductManager
const ProductManager = require("./controllers/productManager");
const productManager = new ProductManager("./src/models/products.json");

// Routers
const productsRouter = require("./routes/products.router");
const cartRouter = require("./routes/carts.router");
const viewsRouter = require("./routes/views.router");
const clientesRouter = require("./routes/clientes.router");
const imageRouter = require("./routes/image.router");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

// Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/image");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const multerMiddleware = multer({ storage: storage }).single("imageFile");

app.use(multerMiddleware);
app.use("/", imageRouter);

// Routes
app.use("/api", productsRouter);
app.use("/api", cartRouter);
app.use("/", viewsRouter);
app.use("/clientes", clientesRouter);

// Handlebars
app.engine("handlebars", expressHbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Socket.io
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
});

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb+srv://analiajaime:AmadeuS01@cluster0.tinq6s3.mongodb.net/e-commerce?retryWrites=true&w=majority", {
 
})
  .then(() => {
    console.log("Conectado a la base de datos AnaliaJaime");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos. Linea 62", error);
  });

// Manejo de errores del servidor
httpServer.on("error", (error) => {
  console.error("Error del servidor", error);
});
