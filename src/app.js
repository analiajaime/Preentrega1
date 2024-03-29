const express = require("express");
const app = express();




//import expressHbs from "express-handlebars";
const expressHbs = require("express-handlebars");
const hbs = expressHbs.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

//import socketIO from "socket.io";
const socketIO = require("socket.io");
//puerto  
const PORT = 8080;

const mongoose = require("mongoose"); 
require("./database.js");

const multer = require("multer");

const messageModel = require("./dao/models/message.model.js");


// Routers
const productsRouter = require("./routes/products.router");
const cartRouter = require("./routes/carts.router");
const viewsRouter = require("./routes/views.router");
const clientsRouter = require("./routes/clients.router");
const imageRouter = require("./routes/image.router");
require("../src/database.js");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

// Handlebars
app.engine("handlebars", expressHbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Routes
app.use("/api", productsRouter);
app.use("/api", cartRouter);
app.use("/", viewsRouter);
app.use("/clients", clientsRouter);
app.use("/image", imageRouter);

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "./src/public/image");
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
})

const upload = multer({storage});

app.post("/upload", upload.single("image"), (req, res) => {
  res.redirect("/image");
}
);



// HTTP Server
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
});

// Socket.io Configuration
const io = new socketIO.Server(httpServer); 

io.on("connection", (socket) => {
  console.log("Cliente conectado, linea 67 app.js");

  socket.on("disconnect", () => {
    console.log("Cliente desconectado, linea 70 app.js");
  });

  socket.on("message", async (data) => {
    console.log("Mensaje recibido", data);
    io.sockets.emit("message", data);
  });
});

// MongoDB Connection
mongoose.connect("mongodb+srv://analiajaime:AmadeuS01@cluster0.tinq6s3.mongodb.net/e-commerce?retryWrites=true&w=majority", {
 
})
  .then(() => {
    console.log("Conectado a la base de datos AnaliaJaime-app.js linea 105");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos. Linea 62", error);
  });

  module.exports.upload = upload;