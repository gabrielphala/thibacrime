const Model = require('../Model');

class Resident extends Model {
    constructor (mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            email: { type: String, required: true },
            password: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'Resident', QueryBuilder, schema);
    };

    getByEmail = (email, select = '') => this.model.findOne({
        condition: { email },
        select
    });

    getAllResidents = (select = '') => this.model.find({
        select
    });
};

module.exports = Resident;