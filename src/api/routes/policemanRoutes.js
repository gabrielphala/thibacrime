const policemanController = require('../controllers/policemanController');
const policemanServices = require('../../services/Policeman');

const { authPolice } = require('../../middleware');

module.exports = (router) => {
    router.get('/p/sign-in', policemanController.renderSignIn);
    router.get('/p/reports', authPolice, policemanController.renderReports);

    router.get('/p/logout', (req, res) => {
        res.clearCookie('_police');

        res.redirect('/p/sign-in')
    });

    router.post('/police/sign-in', policemanController.signIn(policemanServices.signIn));
    router.post('/police/:policemanId/fetch', policemanController.getPolicemanDetails(policemanServices.getPolicemanDetails));
    router.post('/police/admin/:policeStationId/fetch/station', policemanController.getPoliceAdminByStation(policemanServices.getPoliceAdminByStation));
};