const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');
const parseRegex = require('regex-parser');

const Resident = require('./Resident');

module.exports = new Resident(mongoose, QueryBuilder, parseRegex);