const {BookingRepository} = require('../repository/index');
const axios = require('axios');
const {ServiceError} = require('../utils/index');
const {FLIGHT_SERVICE_PATH} = require('../config/serverConfig');


class BookingService{
    constructor(){
        this.bookingRepository = new BookingRepository();
    }
    async createBooking(data){
        try {
            const flightId = data.flightId;
            const getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${data.flightId}`;
            const response = await axios.get(getFlightRequestUrl);
            const flightData = response.data.data;
            let priceOfTheFlight = flightData.price;
            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError('Something went wrong in the booking process ', 'Insufficient seats in the flight');
            }
            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayload = {...data,totalCost};
            const booking = await this.bookingRepository.create(bookingPayload); 
            const updateFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            await axios.patch(updateFlightRequestUrl,{totalSeats:flightData.totalSeats -booking.noOfSeats});
            const finalBooking = await this.bookingRepository.update(booking.id ,{status:'BOOKED'});
            return finalBooking;

        } catch (error) {
            if(error.name == 'ValidationError' || error.name =='RepositoryError'){   
                throw error;
            }
            throw new ServiceError(error);
        }
    }
}
module.exports = BookingService;