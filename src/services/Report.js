const Report = require('../models/Report');
const Resident = require('../models/Resident');
const PoliceStations = require('../models/PoliceStation');
const Mailer = require('../helpers/Mailer');

const Distance = require('../helpers/Distance');
const v = require('../helpers/Validation');
const { randomString } = require('../helpers/String');

class ReportServices {
    static async submitReport (req) {
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

            if (!closestPolicestationId)
                throw 'There are no police station accounts to receive your report at the moment!';

            const reportDetails = {
                locationOfCrime,
                typeOfCrime,
                descriptionOfEvents,
                policeStationID: closestPolicestationId,
                ref: randomString('CASE'),
                residentID: req.residentInfo._id
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

            const newReport = await Report.add(reportDetails);
            const policeStationDetails = await PoliceStations.getPoliceStationDetails(closestPolicestationId, 'name');
            const residentDetails = await Resident.getResidentDetails(newReport.residentID, 'email');

            try {
                await Mailer.send({
                    to: residentDetails.email,
                    from: 'Thibacrime Team <gabriel@testept.com>',
                    subject: `Report: ${newReport.ref} sent to police`,
                    message: `
                    The ${typeOfCrime} case (${newReport.ref}) has been sent to ${policeStationDetails.name} (police station) for further investigation
                `
                })
            } catch (e) { }
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

    static async investigateReport (reportId, policemanId, policemanRef) {
        try {
            if (!(await Report.isNew(reportId)))
                throw 'This report has been declined, investigated or is sill being investigated!';

            const reportDetails = await Report.getReportDetails(reportId);

            try {
                await Mailer.send({
                    to: reportDetails.residentID.email,
                    from: 'Thibacrime Team <gabriel@testept.com>',
                    subject: `Report: ${reportDetails.ref} is being investigated`,
                    message: `
                    The ${reportDetails.policeStationID.name}\n\n

                    Has decided to look further into the case ${reportDetails.ref} for any more information please visit the police station in question
                `
                })
            } catch (error) { }

            await Report.investigateReport(reportId, policemanId, policemanRef);
        } catch (e) { throw e; }
    };

    static async declineReport (reportId) {
        try {
            if (!(await Report.isNew(reportId)))
                throw 'This report has been declined, investigated or is sill being investigated!';

            const reportDetails = await Report.getReportDetails(reportId);

            try {
                await Mailer.send({
                    to: reportDetails.residentID.email,
                    from: 'Thibacrime Team <gabriel@testept.com>',
                    subject: `Report: ${reportDetails.ref} has been declined`,
                    message: `
                    The ${reportDetails.policeStationID.name}\n\n

                    Has unfortunately declined to look into your report, for further information visit the police station in question
                `
                })
            } catch (e) { }
                
            await Report.declineReport(reportId);
        } catch (e) { throw e; }
    };

    static async searchAdminReports (query) {
        let reports = [];

        try {
            const residents = await Resident.searchResident(query);

            for (let i = 0; i < residents.length; i++) {
                let _reports = await Report.getResidentReports(residents[i]._id);

                _reports.forEach(_report => {
                    reports.push(_report);
                })
            }

            const policeStations = await PoliceStations.searchPoliceStation(query);

            for (let i = 0; i < policeStations.length; i++) {
                let _reports = await Report.getPoliceReports(policeStations[i]._id);

                _reports.forEach(_report => {
                    reports.push(_report);
                })
            }

            (await Report.searchAdminReports(query)).forEach(_report => {
                reports.push(_report);
            })

            return reports;
        } catch (e) { throw e; }
    }

    static async searchResidentReports (query, residentId) {
        let reports = [];

        try {
            const policeStations = await PoliceStations.searchPoliceStation(query);

            for (let i = 0; i < policeStations.length; i++) {
                let _reports = await Report.getPoliceResidentReports(policeStations[i]._id, residentId);

                _reports.forEach(_report => {
                    reports.push(_report);
                })
            }

            (await Report.searchResidentReports(query, residentId)).forEach(_report => {
                reports.push(_report);
            })

            return reports;
        } catch (e) { throw e; }
    }

    static async searchPoliceReports(query, policeStationId) {
        let reports = [];

        
        try {
            const residents = await Resident.searchResident(query);

            for (let i = 0; i < residents.length; i++) {
                let _reports = await Report.getPoliceResidentReports(policeStationId, residents[i]._id);

                _reports.forEach(_report => {
                    reports.push(_report);
                })
            }

            (await Report.searchPoliceReports(query, policeStationId)).forEach(_report => {
                reports.push(_report);
            })

            return reports;
        } catch (e) { throw e; }
    }
};

module.exports = ReportServices;