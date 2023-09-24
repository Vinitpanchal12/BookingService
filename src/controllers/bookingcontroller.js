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
        const payload = {
           data:{
            subject:'this is a notification from queue',
            content:'some queue will subsribe this',
            recepientEmail:'hello@gmail.com',
            notificationTime:'2023-04-23 18:25:43'
           },
           service:'CREATE_TICKET'
        };
         
        publishMessage(channel, REMAINDER_BINDING_KEY,JSON.stringify(payload));
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