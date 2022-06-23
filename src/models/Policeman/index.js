const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');
const parseRegex = require('regex-parser');

const Policeman = require('./Policeman');

module.exports = new Policeman(mongoose, QueryBuilder, parseRegex);