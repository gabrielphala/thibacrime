const Model = require('../Model');

class PoliceStation extends Model {
    constructor(mongoose, QueryBuilder, parseRegex) {
        const schema = new mongoose.Schema({
            name: { type: String, required: true },
            address: { type: String, required: true },
            ref: { type: String, required: true },
            location: {
                lat: { type: String, required: true },
                lng: { type: String, required: true }
            },
            isDeleted: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'PoliceStation', QueryBuilder, schema);

        this.parseRegex = parseRegex;
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

    searchPoliceStation = (query, select = '') => this.model.findWithOr({
        condition: [
            { name: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false },
            { address: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false }
        ],
        select
    })
};

module.exports = PoliceStation;