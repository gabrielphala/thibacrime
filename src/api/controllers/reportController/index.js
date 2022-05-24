const resWrap = require('../../../helpers/Response-wrapper');

const ReportController = require('./reportController');

module.exports = new ReportController(resWrap);