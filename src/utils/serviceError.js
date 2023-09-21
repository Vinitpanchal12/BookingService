const {StatusCodes}= require('http-status-codes');
class ServiceError extends Error{
    constructor( 
        message= 'Something wrong',
        explanation= 'Something wrong',
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
        ){
        
        this.name = 'serviceError';
        this.message= message;
        this.explanation= explanation;
        this.statusCode= statusCode;
    }
}
module.exports = ServiceError;