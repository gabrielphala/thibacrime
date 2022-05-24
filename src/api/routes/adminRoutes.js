const adminController = require('../controllers/adminController');
const adminServices = require('../../services/Admin');

module.exports = (router) => {
    router.get('/a/police-stations', adminController.renderPoliceStations);
    router.get('/a/residents', adminController.renderResidents);
    router.get('/a/reports', adminController.renderReports);
    router.get('/a/sign-in', adminController.renderSignIn);

    router.post('/admin/sign-in', adminController.signIn(adminServices.signIn));
};