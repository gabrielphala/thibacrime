const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');

const Policeman = require('./Policeman');

module.exports = new Policeman(mongoose, QueryBuilder);