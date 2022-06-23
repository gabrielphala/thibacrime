const Model = require('../Model');

class Policeman extends Model {
    constructor(mongoose, QueryBuilder, parseRegex) {
        const schema = new mongoose.Schema({
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            ref: { type: String, required: true },
            email: { type: String, required: true },
            password: { type: String, required: true },
            type: { type: String, required: true },
            policeStationID: { type: mongoose.Schema.ObjectId, required: true, ref: 'PoliceStation' },
            isDeleted: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'Policeman', QueryBuilder, schema);

        this.parseRegex = parseRegex;
    };

    getPolicemanDetails = (_id, select = '') => this.model.findOne({
        condition: { _id },
        select
    })

    getPoliceAdminByStation = (policeStationId, select = '') => this.model.findOne({
        condition: { policeStationID: policeStationId, type: 'admin' },
        populate: [['policeStationID', '']],
        select
    })

    getAllPolicemen = (select = '') => this.model.find({
        condition: { isDeleted: false },
        populate: [['policeStationID', 'name']],
        select
    })

    getPolicemenByStation = (policeStationId, select = '') => this.model.find({
        condition: { policeStationID: policeStationId, isDeleted: false },
        populate: [['policeStationID', 'name']],
        select
    })

    getByEmail = (email, select = '') => this.model.findOne({
        condition: { email },
        select
    });

    editPoliceman = (_id, data) => this.model.updateOne(
        { _id },
        data
    );

    deleteAll = (policeStationId) => this.model.updateMany(
        { policeStationID: policeStationId },
        { isDeleted: true }
    );

    searchPolicemen = (query, policeStationId, select = '') => this.model.findWithOr({
        condition: [
            { firstname: { $regex: this.parseRegex(`/${query}/i`) }, policeStationID: policeStationId, isDeleted: false },
            { lastname: { $regex: this.parseRegex(`/${query}/i`) }, policeStationID: policeStationId, isDeleted: false },
            { type: { $regex: this.parseRegex(`/${query}/i`) }, policeStationID: policeStationId, isDeleted: false },
            { email: { $regex: this.parseRegex(`/${query}/i`) }, policeStationID: policeStationId, isDeleted: false }
        ],
        select
    })

    searchAdminPolicemen = (query, select = '') => this.model.findWithOr({
        condition: [
            { firstname: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false },
            { lastname: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false },
            { type: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false },
            { email: { $regex: this.parseRegex(`/${query}/i`) }, isDeleted: false }
        ],
        populate: [['policeStationID', 'name']],
        select
    })
};

module.exports = Policeman;