const Policeman = require('../models/Policeman');
const PoliceStation = require('../models/PoliceStation');

const { isSame, hash } = require('../helpers/Hasher');

const Jwt = require('../helpers/Jwt');
const v = require('../helpers/Validation');
const { randomString } = require('../helpers/String');


class PolicemanService {
    static async signIn ({email, password}) {
        try {
            v.validate({
                'Email address': { value: email, min: 5, max: 30 },
                'Password': { value: password, min: 8, max: 18 }
            });

            const policemanDetails = await Policeman.getByEmail(email);

            if (!policemanDetails)
            throw 'Email address or pass is incoreect!';
            
            if (!(await isSame(policemanDetails.password, password)))
            throw 'Email address or pass is incoreect!';
            
            delete policemanDetails.password;
            
            const jwtAccess = Jwt.getAccessToken(policemanDetails.toJSON());
            
            const jwtRefresh = Jwt.getRefreshToken(policemanDetails.toJSON());
            
            let redirect = '/p/reports';

            return {
                tokens: { jwtAccess, jwtRefresh },
                redirect
            };
        } catch (e) { throw e; }
    }

    static async addPoliceman ({ firstname, lastname, email, policeStationId, type }) {
        try {
            if (type != 'admin')
                throw 'Only police admin can add other policemen';

            v.validate({
                'First name': { value: firstname, min: 3, max: 20 },
                'Last name': { value: lastname, min: 3, max: 20 },
                'Email address': { value: email, min: 5, max: 30 }
            });

            if (await Policeman.exists({ email }))
                throw `The email: ${email} is already in use`;

            await Policeman.add({
                firstname,
                lastname,
                email,
                type: 'agent',
                policeStationID: policeStationId,
                password: await hash('Password123'),
                ref: randomString('AGENT')
            })
        } catch (e) { throw e; }
    }

    static async editPoliceman ({ firstname, lastname, email, policemanId, type }) {
        try {
            if (type != 'admin')
                throw 'Only police admin can edit other policemen';

            v.validate({
                'First name': { value: firstname, min: 3, max: 20 },
                'Last name': { value: lastname, min: 3, max: 20 },
                'Email address': { value: email, min: 5, max: 30 }
            });

            if (await Policeman.exists({ email }) && !(await Policeman.exists({ email, policemanId })))
                throw `The email: ${email} is already in use`;

            
            Policeman.editPoliceman(policemanId, {
                firstname,
                lastname,
                email
            })
        } catch (e) { throw e; }
    }

    static async adminRemovePolice (policemanId) {
        try {
            const policemanDetails = await Policeman.getPolicemanDetails(policemanId);

            if (policemanDetails.type == 'agent')
                return await Policeman.delete(policemanId)

            await PoliceStation.delete(policemanDetails.policeStationID)
            await Policeman.deleteAll(policemanDetails.policeStationID);

        } catch (e) { throw e; }
    }

    static async removePoliceAgent (policemanId) {
        try {
            const policemanDetails = await Policeman.getPolicemanDetails(policemanId);

            if (policemanDetails.type == 'agent')
                return await Policeman.delete(policemanId)

        } catch (e) { throw e; }
    }

    static async getPolicemanDetails (policemanId) {
        try {
            return await Policeman.getPolicemanDetails(policemanId);
        } catch (e) { throw e; }
    }

    static async getPoliceAdminByStation (policeStationId) {
        try {
            return await Policeman.getPoliceAdminByStation(policeStationId);
        } catch (e) { throw e; }
    }

    static async getPolicemenByStation (policeStationId) {
        try {
            return await Policeman.getPolicemenByStation(policeStationId);
        } catch (e) { throw e; }
    }

    static async getAllPolicemen () {
        try {
            return await Policeman.getAllPolicemen();
        } catch (e) { throw e; }
    }

    static async searchPolicemen (query, policeStationId) {
        try {
            return await Policeman.searchPolicemen(query, policeStationId);
        } catch (e) { throw e; }
    }

    static async searchAdminPolicemen (query) {
        try {
            let policemen = [];

            const policeStations = await PoliceStation.searchPoliceStation(query);

            for (let i = 0; i < policeStations.length; i++) {
                const _policemen = await Policeman.getPolicemenByStation(policeStations[i]._id);

                _policemen.forEach(policeman => {
                    policemen.push(policeman)
                });
            }

            (await Policeman.searchAdminPolicemen(query)).forEach(policeman => {
                policemen.push(policeman)
            });

            return policemen;
        } catch (e) { throw e; }
    }
};

module.exports = PolicemanService;