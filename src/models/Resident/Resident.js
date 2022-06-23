const Model = require('../Model');

class Resident extends Model {
    constructor(mongoose, QueryBuilder, parseRegex) {
        const schema = new mongoose.Schema({
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            email: { type: String, required: true },
            ref: { type: String, required: true },
            password: { type: String, required: true },
            isDeleted: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'Resident', QueryBuilder, schema);

        this.parseRegex = parseRegex;
    };

    getByEmail = (email, select = '') => this.model.findOne({
        condition: { email },
        select
    });

    getResidentDetails = (residentId, select = '') => this.model.findOne({
        condition: { _id: residentId },
        select
    });

    getAllResidents = (select = '') => this.model.find({
        condition: { isDeleted: false },
        select
    });

    searchResident = (query, select = '') => this.model.findWithOr({
        condition: [
            { firstname: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false },
            { lastname: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false },
            { email: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false }
        ],
        select
    })
};

module.exports = Resident;