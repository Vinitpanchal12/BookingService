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
            let getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${data.flightId}`;
            const response = await axios.get(getFlightRequestUrl);
            return response.data.data;
        } catch (error) {
            throw new ServiceError(error);
        }
    }
}
module.exports = BookingService;