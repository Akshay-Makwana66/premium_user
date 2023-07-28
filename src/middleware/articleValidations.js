
const articleValidations = async (req,res,next)=>{
    try{
        let data = req.body;
        let {title, content} = data;
        if(Object.keys(data).length==0) return res.status(400).send({status: false, msg: " Request body can not be empty"})
        
        // title Validations-----------
        if(!title) return res.status(400).send({ status: false, msg: "Please Enter title" });
        if (typeof title !== "string") return res.status(400).send({ status: false, msg: " Please enter title as a String" });
        let validtitle = /^\d*[a-zA-Z][a-zA-Z\d\s]*$/; // /^[a-zA-Z0-9\s\S]+$/
        data.title = title.trim();
        if (!validtitle.test(title)) return res.status(400).send({ status: false, msg: "The title may contain only letters , number and symbol" });
        
        // content Validations-----------
        if(!content) return res.status(400).send({ status: false, msg: "Please Enter content" });
        if (typeof content !== "string") return res.status(400).send({ status: false, msg: " Please enter content as a String" });
        let validcontent = /^\d*[a-zA-Z][a-zA-Z\d\s]*$/; // /^[a-zA-Z0-9\s\S]+$/
        data.content = content.trim();
        if (!validcontent.test(content)) return res.status(400).send({ status: false, msg: "The content may contain only letters , number and symbol" });
        

        next();
    }catch(err){
        res.status(500).send({status: false,message: `Sorry for the inconvenience caused`,Error : err.message})
    }
}


module.exports = {articleValidations}