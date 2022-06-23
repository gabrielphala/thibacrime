const policemanController = require('../controllers/policemanController');
const policemanServices = require('../../services/Policeman');

const { authPolice } = require('../../middleware');

module.exports = (router) => {
    // router.get('/p/sign-in', policemanController.renderSignIn);
    router.get('/p/reports', authPolice, policemanController.renderReports);
    router.get('/p/policemen', authPolice, (req, res) => {
        res.render('police/policemen', {
            page: {
                title: 'Policemen'
            }
        });
    });

    router.get('/p/logout', (req, res) => {
        res.clearCookie('_police');

        res.redirect('/sign-in')
    });

    router.post('/police/sign-in', policemanController.signIn(policemanServices.signIn));
    router.post('/police/:policemanId/fetch', policemanController.getPolicemanDetails(policemanServices.getPolicemanDetails));
    router.post('/police/fetch/station', policemanController.getPolicemenByStation(policemanServices.getPolicemenByStation));
    router.post('/police/fetch/all', policemanController.getAllPolicemen(policemanServices.getAllPolicemen));
    router.post('/police/add', policemanController.addPoliceman(policemanServices.addPoliceman));
    router.post('/police/edit', policemanController.editPoliceman(policemanServices.editPoliceman));
    router.post('/police/search', policemanController.searchPolicemen(policemanServices.searchPolicemen));
    router.post('/police/search/admin', policemanController.searchAdminPolicemen(policemanServices.searchAdminPolicemen));
    router.post('/police/:policemanId/remove', policemanController.removePolice(policemanServices.removePoliceAgent));
    router.post('/police/:policemanId/remove/admin', policemanController.removePolice(policemanServices.adminRemovePolice));
    router.post('/police/admin/:policeStationId/fetch/station', policemanController.getPoliceAdminByStation(policemanServices.getPoliceAdminByStation));
};