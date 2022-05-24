const Model = require('../Model');

class Report extends Model {
    constructor (mongoose, QueryBuilder) {
        const schema = new mongoose.Schema({
            typeOfCrime: { type: String, required: true },
            locationOfCrime: {
                lat: { type: String, required: true },
                lng: { type: String, required: true }
            },
            descriptionOfEvents: { type: String, required: true },
            statusForPolice: { type: String, default: 'Pending' },
            statusForResident: { type: String, default: 'Received' },
            resident: { type: mongoose.Schema.ObjectId, required: true, ref: 'Resident' },
            assignedPoliceStation: { type: mongoose.Schema.ObjectId, required: true, ref: 'PoliceStation' },
            assignedOfficer: { type: mongoose.Schema.ObjectId, ref: 'Policeman' },
            files: [{
                originalName: { type: String },
                newName: { type: String },
            }],
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'Report', QueryBuilder, schema);
    };

    isNew = async (_id) => await this.exists({ _id, statusForPolice: 'Pending', statusForResident: 'Received' })

    getResidentReports = (resident, select = '') => this.model.find({
        condition: { resident },
        populate: [
            ['assignedPoliceStation', 'name'],
        ],
        select
    });

    getPoliceReports = (assignedPoliceStation, select = '') => this.model.find({
        condition: { assignedPoliceStation },
        populate: [
            ['resident', 'firstname lastname']
        ],
        select
    });

    getAllReports = (select = '') => this.model.find({
        populate: [
            ['resident', 'firstname lastname'],
            ['assignedPoliceStation', 'name']
        ],
        select
    });

    investigateReport = (_id, officer) => this.model.updateOne(
        { _id },
        { statusForPolice: 'Investigation underway', statusForResident: 'Under investigation', assignedOfficer: officer }
    );

    declineReport = (_id) => this.model.updateOne(
        { _id },
        { statusForPolice: 'Not approved', statusForResident: 'Not approved' }
    );
};

module.exports = Report;