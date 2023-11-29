const mongoose = require("mongoose")

try {
    const uri = "mongodb+srv://leonardohirata:Aula123@cluster0.xi0xbqj.mongodb.net/acougue"
    mongoose.connect(uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )    
}
catch (err) {
    console.log(err)
}

mongoose.Promise = global.Promise

module.exports = mongoose