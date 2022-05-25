const Model = require('../Model');

class Resident extends Model {
    constructor (mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            email: { type: String, required: true },
            password: { type: String, required: true },
            isDeleted: { type: Boolean, default: false },
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'Resident', QueryBuilder, schema);
    };

    getByEmail = (email, select = '') => this.model.findOne({
        condition: { email },
        select
    });

    getAllResidents = (select = '') => this.model.find({
        condition: { isDeleted: false },
        select
    });
};

module.exports = Resident;