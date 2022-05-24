const residentController = require('../controllers/residentController');
const residentServices = require('../../services/Resident');

module.exports = (router) => {
    router.get('/sign-up', residentController.renderSignUp);
    router.get('/sign-in', residentController.renderSignIn);
    router.get('/r/:username/reports', residentController.renderReports);

    router.post('/resident/sign-up', residentController.signUp(residentServices.signUp));
    router.post('/resident/sign-in', residentController.signIn(residentServices.signIn));
    router.post('/residents/fetch/all', residentController.getAllResidents(residentServices.getAllResidents));
};