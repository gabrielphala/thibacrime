const adminRoutes = require('./adminRoutes');
const residentRoutes = require('./residentRoutes');
const reportRoutes = require('./reportRoutes');
const policeStationRoutes = require('./policeStationRoutes');
const policemanRoutes = require('./policemanRoutes');

module.exports = (router) => {
    adminRoutes(router);
    residentRoutes(router);
    reportRoutes(router);
    policeStationRoutes(router);
    policemanRoutes(router);
};