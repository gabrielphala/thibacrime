const Model = require('../Model');

class Report extends Model {
    constructor (mongoose, QueryBuilder, parseRegex) {
        const schema = new mongoose.Schema({
            typeOfCrime: { type: String, required: true },
            locationOfCrime: {
                lat: { type: String, required: true },
                lng: { type: String, required: true }
            },
            ref: { type: String, required: true },
            descriptionOfEvents: { type: String, required: true },
            statusForPolice: { type: String, default: 'Pending' },
            statusForResident: { type: String, default: 'Received' },
            residentID: { type: mongoose.Schema.ObjectId, required: true, ref: 'Resident' },
            policeStationID: { type: mongoose.Schema.ObjectId, required: true, ref: 'PoliceStation' },
            policemanID: { type: mongoose.Schema.ObjectId, ref: 'Policeman' },
            policemanRef: { type: String },
            files: [{
                originalName: { type: String },
                newName: { type: String },
            }],
            createdAt: { type: Date, default: Date.now }
        });

        super(mongoose, 'Report', QueryBuilder, schema);

        this.parseRegex = parseRegex;
    };

    isNew = async (_id) => await this.exists({ _id, statusForPolice: 'Pending', statusForResident: 'Received' })

    getResidentReports = (residentId, select = '') => this.model.find({
        condition: { residentID: residentId },
        populate: [
            ['policeStationID', 'name'],
            ['residentID', 'firstname lastname']
        ],
        select
    });

    getReportDetails = (reportId, select = '') => this.model.findOne({
        condition: { _id: reportId },
        populate: [
            ['policeStationID', 'name'],
            ['residentID', 'firstname lastname email']
        ],
        select
    });

    searchResidentReports = (query, residentId, select = '') => this.model.findWithOr({
        condition: [
            { typeOfCrime: { $regex: this.parseRegex(`/${query}/i`) }, residentID: residentId },
            { statusForResident: { $regex: this.parseRegex(`/${query}/i`) }, residentID: residentId }
        ],
        populate: [
            ['policeStationID', 'name'],
        ],
        select
    })

    searchAdminReports = (query, select = '') => this.model.findWithOr({
        condition: [
            { typeOfCrime: { $regex: this.parseRegex(`/${query}/i`) } },
            { statusForPolice: { $regex: this.parseRegex(`/${query}/i`) } }
        ],
        populate: [
            ['policeStationID', 'name'],
            ['residentID', 'firstname lastname']
        ],
        select
    })

    searchPoliceReports = (query, policeStationId, select = '') => this.model.findWithOr({
        condition: [
            { typeOfCrime: { $regex: this.parseRegex(`/${query}/i`) }, policeStationID: policeStationId },
            { statusForPolice: { $regex: this.parseRegex(`/${query}/i`) }, policeStationID: policeStationId }
        ],
        populate: [
            ['residentID', 'firstname lastname']
        ],
        select
    })

    getPoliceResidentReports = (policeStationId, residentId, select = '') => this.model.find({
        condition: { policeStationID: policeStationId, residentID: residentId },
        populate: [
            ['policeStationID', 'name'],
            ['residentID', 'firstname lastname']
        ],
        select
    });

    getPoliceReports = (policeStationId, select = '') => this.model.find({
        condition: { policeStationID: policeStationId },
        populate: [
            ['residentID', 'firstname lastname'],
            ['policeStationID', 'name']
        ],
        select
    });

    getAllReports = (select = '') => this.model.find({
        populate: [
            ['residentID', 'firstname lastname'],
            ['policeStationID', 'name']
        ],
        select
    });

    investigateReport = (_id, policemanId, policemanRef) => this.model.updateOne(
        { _id },
        { statusForPolice: 'Investigation underway', statusForResident: 'Under investigation', policemanID: policemanId, policemanRef }
    );

    declineReport = (_id) => this.model.updateOne(
        { _id },
        { statusForPolice: 'Not approved', statusForResident: 'Not approved' }
    );
};

module.exports = Report;