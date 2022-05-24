const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');

const PoliceStation = require('./PoliceStation');

module.exports = new PoliceStation(mongoose, QueryBuilder);