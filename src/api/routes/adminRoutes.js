const adminController = require('../controllers/adminController');
const adminServices = require('../../services/Admin');

const { authAdmin } = require('../../middleware');

module.exports = (router) => {
    router.get('/a/police-stations', authAdmin, adminController.renderPoliceStations);
    router.get('/a/residents',authAdmin,  adminController.renderResidents);
    router.get('/a/reports', authAdmin, adminController.renderReports);
    router.get('/a/policemen', authAdmin, adminController.renderPolicemen);

    // router.get('/a/sign-in', adminController.renderSignIn);

    router.get('/a/logout', (req, res) => {
        res.clearCookie('_admin');

        res.redirect('/sign-in');
    });

    router.post('/admin/sign-in', adminController.signIn(adminServices.signIn));
};