const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require('path');
const ImageModel = require("../models/image.model.js"); 
const multer = require("multer");
const upload = multer({ dest: "src/public/image"});


//routes

router.get("/image", async (req, res) => {
  const image = await ImageModel.find();

  const nuevoArray = image.map((image) => {
    return {
      id: image._id,
      title: image.title,
      description: image.description,
      filename: image.filename,
      path: image.path,
    };
  });

  res.render("image", { image: nuevoArray });
}
)

  
  router.post("/upload", upload.single('image'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No se ha cargado ningún archivo.");
    }
    
    const image = new ImageModel();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = "/image/" + req.file.filename;

    await image.save();
    res.redirect("/image");
  }
  );

router.get("/image/:id/delete", async (req, res) => {
  const { id } = req.params;
  const image = await ImageModel.findByIdAndDelete(id);
  await fs.unlink(path.join(__dirname, "../image", image.filename));
  res.redirect("/image");
}
)

module.exports = router;



// // Configuración de Multer para almacenar archivos subidos
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../image')); 
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

// // GET para subir una imagen (formulario)
// router.get("/upload", (req, res) => {
//   res.render("upload"); 
// });

// // POST para procesar la carga de la imagen
// router.post("/upload", upload.single('file'), async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const { filename, path: imagePath, originalname } = req.file; 
//     const newImage = new ImageModel({ title, description, filename, path: imagePath, originalname });
//     await newImage.save();
//     res.redirect("/image");
//   } catch (error) {
//     console.error("Error al subir la imagen", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// });

// // GET para obtener todas las imágenes
// router.get("/image", async (req, res) => {
//   try {
//     const image = await ImageModel.find();
//     res.render("image", { image }); 
//   } catch (error) {
//     console.error("Error al obtener todas las imágenes", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// });

// // GET para obtener una imagen por su ID



// module.exports = router;
