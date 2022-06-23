const adminRoutes = require('./adminRoutes');
const baseRoutes = require('./baseRoutes');
const residentRoutes = require('./residentRoutes');
const reportRoutes = require('./reportRoutes');
const policeStationRoutes = require('./policeStationRoutes');
const policemanRoutes = require('./policemanRoutes');

module.exports = (router) => {
    adminRoutes(router);
    baseRoutes(router);
    residentRoutes(router);
    reportRoutes(router);
    policeStationRoutes(router);
    policemanRoutes(router);
};