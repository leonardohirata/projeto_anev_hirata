const express = require("express")
const route = express.Router()


const Cliente = require('../models/clientes')

//Inclusao
route.post("/", async (req, res) => {
    var novo = req.body 
    console.log(novo)
    var db = await Cliente.create( novo )

    console.log(db)
})

//Selecionar
route.get("/", async (req, res) => {

    var dados = await Cliente.find()
    return res.send( dados )
})

//Alterar
route.put("/", async (req, res) => {
    var { _id, nome_cliente, email, celular, ativo } = req.body

    if ( _id == undefined)
        return res.send({ error: "Id não pode ser nulo" })

    try {
        var dados = await Cliente.findById( _id )
        

        var dados = {
            _id,
            nome_cliente,
            email,
            celular,
            ativo
        }

        await Cliente.findByIdAndUpdate(
                                        _id, 
                                        dados
                                    )

        return res.send( { mensagem: "Cliente alterado com sucesso." } )

    }
    catch ( err ) {
        console.log( err )
        return res.send({ error: "Id não encontrado" })
    }
})

route.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const cliente = await Cliente.findById(id);

        if (!cliente) {
            return res.status(404).send({ error: "Cliente não encontrado" });
        }

        await Cliente.findByIdAndRemove(id);
        return res.send({ message: "Cliente removido com sucesso" });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: "Erro ao deletar cliente" });
    }
});

module.exports = app => app.use("/cliente", route)