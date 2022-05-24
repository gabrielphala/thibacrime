const Model = require('../Model');

class Policeman extends Model {
    constructor(mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            email: { type: String, required: true },
            password: { type: String, required: true },
            type: { type: String, required: true },
            policeStation: { type: mongoose.Schema.ObjectId, required: true, ref: 'PoliceStation' },
            isDeleted: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'Policeman', QueryBuilder, schema);
    };

    getPolicemanDetails = (_id, select = '') => this.model.findOne({
        condition: { _id },
        select
    })

    getPoliceAdminByStation = (policeStation, select = '') => this.model.findOne({
        condition: { policeStation },
        populate: [['policeStation', '']],
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

    deleteAll = (policeStation) => this.model.updateMany(
        { policeStation },
        { isDeleted: true }
    );
};

module.exports = Policeman;