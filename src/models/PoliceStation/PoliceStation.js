const Model = require('../Model');

class PoliceStation extends Model {
    constructor(mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            name: { type: String, required: true },
            address: { type: String, required: true },
            location: {
                lat: { type: String, required: true },
                lng: { type: String, required: true }
            },
            isDeleted: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'PoliceStation', QueryBuilder, schema);
    };

    getAll = (select = '') => this.model.find({
        condition: { isDeleted: false },
        select
    });

    getPoliceStationDetails = (_id, select = '') => this.model.findOne({
        condition: { _id },
        select
    })

    editPoliceStation = (_id, data) => this.model.updateOne(
        { _id },
        data
    );
};

module.exports = PoliceStation;