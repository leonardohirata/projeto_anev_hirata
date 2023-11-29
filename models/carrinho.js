const mongoose = require('./database');

const { Schema } = mongoose;

const CarrinhosSchema = new Schema({
    cliente: [{
        cliente:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Cliente',
            required:true,
        }
    }],

    itens: [{
        produto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto',
        required:true,
    },
        quantidade: {type:Number, required:true},
}],  

    ativo: { 
        type: Boolean,
        default: true
    }
});

const Carrinho = mongoose.model('Carrinhos', CarrinhosSchema);

module.exports = Carrinho;