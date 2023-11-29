const mongoose = require('./database');

const { Schema } = mongoose;


const ClientesSchema = new Schema({
    nome_cliente: {
        type: String,
        required: true
    },
    celular: {
        type: Number,
        required:true
    },
    email: {
        type: String,
        required: true
    },

    ativo: { 
        type: Boolean,
        default: true
    }
});

const Cliente = mongoose.model('Clientes', ClientesSchema);

module.exports = Cliente;