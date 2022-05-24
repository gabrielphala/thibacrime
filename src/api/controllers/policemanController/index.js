const resWrap = require('../../../helpers/Response-wrapper');

const PolicemanController = require('./policemanController');

module.exports = new PolicemanController(resWrap);