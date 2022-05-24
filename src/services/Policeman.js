const Policeman = require('../models/Policeman');

const { isSame } = require('../helpers/Hasher');

const Jwt = require('../helpers/Jwt');
const v = require('../helpers/Validation');


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
};

module.exports = PolicemanService;