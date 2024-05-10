class ApiError extends Error{
    constructor(message,statusCode){
        super(message)
        this.message=message
        this.statusCode=statusCode
    }
}

module.exports=ApiError