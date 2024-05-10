
const sendErrorForDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.statusCode,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorForProd = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });


errorMiddleware=(err,req,res,next)=>{
  err.statusCode=err.statusCode|| 500
    if(process.env.env=='dev')
    {
 sendErrorForDev(err,res)
    }
    else
    {
        sendErrorForProd(err,res)
    }
   
}





module.exports=errorMiddleware