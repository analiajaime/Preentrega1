const mongoose = require('mongoose');
const clientesCollection = 'clientes';
const clientesSchema = new mongoose.Schema({
    nombre: {type: String, required: true, max: 100},
    apellido: {type: String, required: true, max: 100},
    usuario: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100}
});

const clientesModel = mongoose.model(clientesCollection, clientesSchema);

module.exports = clientesModel;
// Path: src/routes/clientes.router.js