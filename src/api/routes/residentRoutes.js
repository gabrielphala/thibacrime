const residentController = require('../controllers/residentController');
const residentServices = require('../../services/Resident');

const { authResident } = require('../../middleware');

module.exports = (router) => {
    router.get('/sign-up', residentController.renderSignUp);
    router.get('/sign-in', residentController.renderSignIn);
    router.get('/r/:username/reports', authResident, residentController.renderReports);

    router.get('/r/logout', (req, res) => {
        res.clearCookie('_resident');

        res.redirect('/sign-in')
    });

    router.post('/resident/sign-up', residentController.signUp(residentServices.signUp));
    router.post('/resident/sign-in', residentController.signIn(residentServices.signIn));
    router.post('/resident/:residentId/delete', residentController.deleteResident(residentServices.deleteResident));
    router.post('/residents/fetch/all', residentController.getAllResidents(residentServices.getAllResidents));
};