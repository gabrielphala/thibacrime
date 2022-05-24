const Resident = require('../models/Resident');

const { hash, isSame } = require('../helpers/Hasher');
const Jwt = require('../helpers/Jwt');
const v = require('../helpers/Validation');
const { urlSafe } = require('../helpers/String');

class ResidentServices {
    static async signIn ({email, password}) {
        try {
            v.validate({
                'Email address': { value: email, min: 5, max: 30 },
                'Password': { value: password, min: 8, max: 18 }
            });

            const residentDetails = await Resident.getByEmail(email);

            if (!residentDetails)
                throw 'Email address or password is incorrect!';
                
            if (!(await isSame(residentDetails.password, password)))
                throw 'Email address or password is incorrect!';

            const jwtAccess = Jwt.getAccessToken(residentDetails.toJSON());

            const jwtRefresh = Jwt.getRefreshToken(residentDetails.toJSON());

            let redirect = urlSafe(`/r/${residentDetails.firstname + residentDetails.lastname}/reports`);

            return {
                tokens: { jwtAccess, jwtRefresh },
                redirect
            };
        } catch (e) { console.log(e); throw e; }
    };

    static async signUp (residentDetails) {
        try {
            v.validate({
                'First name': { value: residentDetails.firstname, min: 3, max: 20 },
                'Last name': { value: residentDetails.lastname, min: 3, max: 20 },
                'Email address': { value: residentDetails.email, min: 5, max: 30 },
                'Password': { value: residentDetails.password, min: 5, max: 30 },
                'Password confirmation': { value: residentDetails.passwordConfirmation, is: ['Password', 'Passwords don\'t match'] }
            });

            if (await Resident.exists({ email: residentDetails.email }))
                throw 'Email address already in use!';

            delete residentDetails.passwordConfirmation;
            residentDetails.password = await hash(residentDetails.password);

            const newResident = await Resident.add(residentDetails);

            const jwtAccess = Jwt.getAccessToken(newResident.toJSON());

            const jwtRefresh = Jwt.getRefreshToken(newResident.toJSON());

            let redirect = urlSafe(`/r/${newResident.firstname + newResident.lastname}/reports`);

            return {
                tokens: { jwtAccess, jwtRefresh },
                redirect
            };
        } catch (e) { throw e; }
    };

    static async getAllResidents () {
        try {
            return Resident.getAllResidents();
        } catch (e) { throw e; }
    };
};

module.exports = ResidentServices;