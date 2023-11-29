const jwt = require("jsonwebtoken");
require("dotenv/config");

module.exports = async (req, res, next) => {
    const token = (req.headers.authorization)?(req.headers.authorization):("")
    
    if (token == "")
        return res.send({ error: "Token não foi encontrado"})
    

        await jwt.verify(token, process.env.TOKEN_KEY, (erro, data) =>{;
        
   if (erro)
   return res.send({error: "token invalido ou expirado"})
})
return next();

};
