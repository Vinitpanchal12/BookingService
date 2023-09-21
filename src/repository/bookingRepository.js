const {Booking} = require('../models/index');
const {StatusCodes}= require('http-status-codes');
const {ValidationError,AppError} = require('../utils/index')

class BookingRepository{
    async create(data){
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
           if(error.name == 'SequelizeValidationError'){
               throw new ValidationError(error);
           }
           throw new AppError(
               'Repository error',
               'cannot create booking',
               'there was some issue creating booking, please try again later',
               StatusCodes.INTERNAL_SERVER_ERROR
           );
        }
    }
}
module.exports= BookingRepository;