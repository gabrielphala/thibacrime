const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');
const parseRegex = require('regex-parser');

const Report = require('./Report');

module.exports = new Report(mongoose, QueryBuilder, parseRegex);