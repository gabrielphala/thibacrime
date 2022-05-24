const Report = require('../models/Report');
const PoliceStations = require('../models/PoliceStation');

const Distance = require('../helpers/Distance');
const v = require('../helpers/Validation');

class ReportServices {
    static async submitReport(req) {
        try {
            let { typeOfCrime, descriptionOfEvents, locationOfCrime } = req.body;

            v.validate({
                'Type of crime witnessed': { value: typeOfCrime, min: 5, max: 20 },
                'Recount what happend': { value: descriptionOfEvents, min: 5, max: 300 }
            });

            locationOfCrime = JSON.parse(locationOfCrime)

            if (!locationOfCrime)
                throw 'Please select location of crime';
            
            const policeStations = await PoliceStations.getAll();

            let closestPolicestation, closestPolicestationId;

            policeStations.forEach(policeStation => {
                let distanceToCrimeScene =
                    Distance.getDistance(locationOfCrime, policeStation.location);
                    
                if (!(closestPolicestation) || (closestPolicestation && closestPolicestation >= distanceToCrimeScene)) {
                    closestPolicestation = distanceToCrimeScene;
                    closestPolicestationId = policeStation._id;
                }
            });

            const reportDetails = {
                locationOfCrime,
                typeOfCrime,
                descriptionOfEvents,
                assignedPoliceStation: closestPolicestationId,
                resident: req.residentInfo._id
            }

            const filesToUpload = [];

            if (req.files['reportFiles[]'] && req.files['reportFiles[]'].file)
                req.files['reportFiles[]'].forEach(({ originalname, filename }) => {
                    filesToUpload.push({
                        originalName: originalname,
                        newName: filename
                    })
                });

            reportDetails.files = filesToUpload;

            Report.add(reportDetails);
        } catch (e) { throw e; }
    };

    static async getResidentReports (residentId) {
        try {
            const reports = await Report.getResidentReports(residentId);

            return reports;
        } catch (e) { throw e; }
    };

    static async getPoliceReports (policeStationId) {
        try {
            const reports = await Report.getPoliceReports(policeStationId);

            return reports;
        } catch (e) { throw e; }
    };

    static async getAllReports () {
        try {
            const reports = await Report.getAllReports();

            return reports;
        } catch (e) { throw e; }
    };

    static async investigateReport (reportId, policemanId) {
        try {
            if (!(await Report.isNew(reportId)))
                throw 'This report has been declined, investigated or is sill being investigated!';

            await Report.investigateReport(reportId, policemanId);
        } catch (e) { throw e; }
    };

    static async declineReport (reportId) {
        try {
            if (!(await Report.isNew(reportId)))
                throw 'This report has been declined, investigated or is sill being investigated!';
                
            await Report.declineReport(reportId);
        } catch (e) { throw e; }
    };
};

module.exports = ReportServices;