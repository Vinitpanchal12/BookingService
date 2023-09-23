const {BookingService} = require('../services/index');
const {StatusCodes} = require('http-status-codes');

const {createChannel, publishMessage} = require('../utils/messageQueue');
const {REMAINDER_BINDING_KEY}  = require('../config/serverConfig');

const bookingService = new BookingService();

class BookingController{
    constructor(){

    }
    async sendMessageToQueue(req,res){
        const channel = await createChannel();
        const data = {message:'success'};
        publishMessage(channel, REMAINDER_BINDING_KEY,JSON.stringify(data));
        return res.status(200).json({
            message:'successfully published a event'
        });
    }

    async create(req,res) {
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
}

module.exports = BookingController;