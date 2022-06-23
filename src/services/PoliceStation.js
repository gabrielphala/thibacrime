const PoliceStation = require('../models/PoliceStation');
const Policeman = require('../models/Policeman');

const { hash } = require('../helpers/Hasher');

const v = require('../helpers/Validation');
const { randomString } = require('../helpers/String');

class PoliceStationServices {
    static async add (policeStationDetails, policemanDetails) {
        try {
            v.validate({
                'Police station name': { value: policeStationDetails.name, min: 5, max: 30 },
                'Police station address': { value: policeStationDetails.address, min: 5, max: 30 },
                'Administrator first name': { value: policemanDetails.firstname, min: 3, max: 20 },
                'Administrator last name': { value: policemanDetails.lastname, min: 3, max: 20 },
                'Administrator email address': { value: policemanDetails.email, min: 5, max: 30 }
            });

            if (!policeStationDetails.location)
                throw 'Please select police station location';

            // if name exists but doesn't already belong to this police station, throw error
            if (await PoliceStation.exists({ name: policeStationDetails.name }))
                throw `An account with this name: ${policeStationDetails.name} already exists!`;

            // if address exists but doesn't already belong to this police station, throw error
            if (await PoliceStation.exists({ address: policeStationDetails.address }))
                throw `An account with this address: ${policeStationDetails.address} already exists!`;

            if (await Policeman.exists({ email: policemanDetails.email }))
                throw `An account with this email: ${policemanDetails.email} already exists!`;

            policeStationDetails.ref = randomString('STATION');
            const newPoliceStation = await PoliceStation.add(policeStationDetails);

            policemanDetails.type = 'admin';
            policemanDetails.policeStationID = newPoliceStation._id;
            policemanDetails.ref = randomString('ADMIN');
            policemanDetails.password = await hash('Password123');

            await Policeman.add(policemanDetails);
        } catch (e) { throw e; }
    };

    static async editPoliceStation (policeStationDetails, policemanDetails) {
        try {
            v.validate({
                'Police station name': { value: policeStationDetails.name, min: 5, max: 30 },
                'Police station address': { value: policeStationDetails.address, min: 5, max: 30 },
                'Administrator first name': { value: policemanDetails.firstname, min: 3, max: 20 },
                'Administrator last name': { value: policemanDetails.lastname, min: 3, max: 20 },
                'Administrator email address': { value: policemanDetails.email, min: 5, max: 30 }
            });

            
            const policeStationId = policeStationDetails.policeStationId;
            delete policeStationDetails.policeStationId

            // if name exists but doesn't already belong to this police station, throw error
            if (await PoliceStation.exists({ name: policeStationDetails.name })
                && !(await PoliceStation.exists({ name : policeStationDetails.name, _id: policeStationId })))
                throw `An account with this name: ${policeStationDetails.name} already exists!`;

            // if address exists but doesn't already belong to this police station, throw error
            if (await PoliceStation.exists({ address: policeStationDetails.address })
                && !(await PoliceStation.exists({ address: policeStationDetails.address, _id: policeStationId })))
                throw `An account with this address: ${policeStationDetails.address} already exists!`;

            await PoliceStation.editPoliceStation(policeStationId, policeStationDetails);

            const policemandId = policemanDetails.policemandId;
            delete policemanDetails.policemandId;

            if (await Policeman.exists({ email: policemanDetails.email })
                && !(await Policeman.exists({ email: policemanDetails.email, _id: policemandId })))
                throw `An account with this email: ${policemanDetails.email} already exists!`;

            await Policeman.editPoliceman(policemandId, policemanDetails);
        } catch (e) { throw e; }
    };

    static async deletePoliceStation (policeStationId) {
        try {
            await PoliceStation.delete(policeStationId)
            await Policeman.deleteAll(policeStationId);
        } catch (e) { throw e; }
    };


    static async getAll () {
        try {
            return await PoliceStation.getAll();
        } catch (e) { throw e; }
    };

    static async getPoliceStationDetails (policeStationId) {
        try {
            return await PoliceStation.getPoliceStationDetails(policeStationId);
        } catch (e) { throw e; }
    };

    static async searchAdminPoliceStations (query) {
        try {
            return await PoliceStation.searchPoliceStation(query);
        } catch (e) { throw e; }
    };
};

module.exports = PoliceStationServices;