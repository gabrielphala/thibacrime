const policeStationController = require('../controllers/policeStationController');
const policeStationServices = require('../../services/PoliceStation');

module.exports = (router) => {
    router.post('/police-station/add', policeStationController.add(policeStationServices.add));
    router.post('/police-station/:policeStationId/fetch', policeStationController.getPoliceStationDetails(policeStationServices.getPoliceStationDetails));
    router.post('/police-station/:policeStationId/update', policeStationController.editPoliceStation(policeStationServices.editPoliceStation));
    router.post('/police-station/:policeStationId/delete', policeStationController.deletePoliceStation(policeStationServices.deletePoliceStation));
    router.post('/police-stations/fetch', policeStationController.getAll(policeStationServices.getAll));
};