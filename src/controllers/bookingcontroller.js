const {BookingService} = require('../services/index');
const {StatusCodes} = require('http-status-codes');

const bookingService = new BookingService();

const create = async (req,res)=> {
    try {
        // let result = {
        //     flightId : req.body.flightId,
        //     userId : req.body.userId,
        //     noOfSeats: req.body.noOfSeats
        // };
        const response = await bookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            data: response,
            success: true,
            message:'successfully booked a flight',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            data: {},
            success: false,
            message:error.message,
            err: error.explanation
        }); 
    }
}
module.exports = {
    create
}