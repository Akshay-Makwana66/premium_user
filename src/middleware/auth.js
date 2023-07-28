const jwt = require('jsonwebtoken');

const authentication = async (req,res,next)=>{
        try{
            let token = req.headers['x-api-key'];
            if(!token) return res.status(400).send({message:'Enter token in header'});
            jwt.verify(token,"premium-user",(error,decoded)=>{
                if(error){
                    const message =
                    error.message ==="jwt expired"
                    ? "Token is expired"
                    : "Token is invalid"   
                    return res.status(401).send({ status: false, message});
                }else{
                    req.userId = decoded.userId;
                    next();
                }
            })
        }catch(err){
        res.status(500).send({message: `Sorry for the inconvenience caused`,Error : err.message})
        }
}
module.exports = {authentication}