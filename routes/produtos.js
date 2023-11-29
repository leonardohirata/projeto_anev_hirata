const express = require("express")
const route = express.Router()

const Produtos = require("../models/produtos")

//Inclusao
route.post("/", async (req, res) => {
    var recebido = req.body 
    console.log(recebido)
    var db = await Produtos.create( recebido )

    console.log(db)
})

//Selecionar
route.get("/", async (req, res) => {

    var data = await Produtos.find()
    return res.send( data )
})

//Alterar
route.put("/", async (req, res) => {
    var { _id, produto, peso, categoria, quantidade, preco, ativo } = req.body

    if ( _id == undefined)
        return res.send({ error: "Id não pode ser nulo" })

    try {
        var data = await Produtos.findById( _id )
        

        var dados = {
            produto,
            peso,
            categoria,
            quantidade,
            preco,
            ativo
        }

        await Produtos.findByIdAndUpdate(
                                        _id, 
                                        dados
                                    )

        return res.send( { mensagem: "Produto alterado com sucesso." } )

    }
    catch ( err ) {
        console.log( err )
        return res.send({ error: "Id não encontrado" })
    }
})

route.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const produto = await Produtos.findById(id);

        if (!produto) {
            return res.status(404).send({ error: "Produto não encontrado" });
        }

        await Produtos.findByIdAndRemove(id);
        return res.send({ message: "Produto removido com sucesso" });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: "Erro ao deletar produto" });
    }
});




module.exports = app => app.use("/produtos", route)
