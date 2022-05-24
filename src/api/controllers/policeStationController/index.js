const resWrap = require('../../../helpers/Response-wrapper');

const PoliceStationController = require('./policeStationController');

module.exports = new PoliceStationController(resWrap);