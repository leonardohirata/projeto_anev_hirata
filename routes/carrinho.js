const express = require("express")
const route = express.Router()


require('dotenv/config')

const Carrinho = require('../models/carrinho')


//Inclusao
route.post("/", async (req, res) => {
    var carrinho = req.body 
    console.log(carrinho)
    var db = await Carrinho.create( carrinho )

    console.log(db)
})

//Selecionar
route.get("/", async (req, res) => {

    var compra = await Carrinho.find()
    return res.send( compra )
})

//Alterar
route.put("/", async (req, res) => {
    var { _id, cliente, itens, ativo } = req.body

    if ( _id == undefined)
        return res.send({ error: "Id do pedido não pode ser nulo" })

    try {
        var compra = await Carrinho.findById( _id )
        

        var compra = {
            cliente,
            itens,     
            ativo
        }

        await Carrinho.findByIdAndUpdate(
                                        _id, 
                                        compra
                                    )

        return res.send( { mensagem: "Carrinho alterado com sucesso." } )

    }
    catch ( err ) {
        console.log( err )
        return res.send({ error: "Id não encontrado" })
    }
});


route.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const carrinho = await Carrinho.findById(id);

        if (!carrinho) {
            return res.status(404).send({ error: "Produto não encontrado" });
        }

        await Carrinho.findByIdAndRemove(id);
        return res.send({ message: "Produto removido com sucesso" });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: "Erro ao deletar produto" });
    }
});

module.exports = app => app.use("/carrinho", route)
