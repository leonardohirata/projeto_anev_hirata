const mongoose = require('./database');

const { Schema } = mongoose;


const ProdutosSchema = new Schema({
    produto: {
        type: String,
        required: true
    },
    peso: {
        type: Number,
        required: true
    },
    categoria:{
        type:String,
        required:true
    },
    quantidade: {
        type:Number,
        required:true
    },
    preco: {
        type:Number,
        required:true
    },
    ativo: { 
        type: Boolean,
        default: true
    }
});

const Produto = mongoose.model('Produtos', ProdutosSchema);

module.exports = Produto;