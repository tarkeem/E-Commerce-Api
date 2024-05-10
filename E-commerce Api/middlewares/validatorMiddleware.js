const expressValidator=require('express-validator')


//cooperate with the previous middleware to check and extract body parameters errors

const validatorMiddleware=(req,res,next)=>{
    errors=expressValidator.validationResult(req)
    if(!errors.isEmpty())
    {
        //dont forget return to terminate the pipline
       return res.status(400).json({"Error":errors})
    }
    next()
}

module.exports=validatorMiddleware