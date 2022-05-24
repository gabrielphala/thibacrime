const policemanController = require('../controllers/policemanController');
const policemanServices = require('../../services/Policeman');

module.exports = (router) => {
    router.get('/p/sign-in', policemanController.renderSignIn);
    router.get('/p/reports', policemanController.renderReports);

    router.post('/police/sign-in', policemanController.signIn(policemanServices.signIn));
    router.post('/police/:policemanId/fetch', policemanController.getPolicemanDetails(policemanServices.getPolicemanDetails));
    router.post('/police/admin/:policeStationId/fetch/station', policemanController.getPoliceAdminByStation(policemanServices.getPoliceAdminByStation));
};