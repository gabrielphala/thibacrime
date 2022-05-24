const resWrap = require('../../../helpers/Response-wrapper');

const ResidentController = require('./residentController');

module.exports = new ResidentController(resWrap);