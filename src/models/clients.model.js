const mongoose = require('mongoose');
const clientesCollection = 'clients';
const clientesSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    usuario: String,
    password: String,
    email: String,
});

const clientsModel = mongoose.model(clientesCollection, clientesSchema);

module.exports = clientsModel;

