const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');

const Resident = require('./Resident');

module.exports = new Resident(mongoose, QueryBuilder);