const Admin = require('../models/Admin');

const { isSame } = require('../helpers/Hasher');

const Jwt = require('../helpers/Jwt');
const v = require('../helpers/Validation');

class AdminServices {
    static async signIn({ email, password }) {
        try {
            v.validate({
                'Email address': { value: email, min: 5, max: 30 },
                'Password': { value: password, min: 8, max: 18 }
            });
            
            const adminDetails = await Admin.getByEmail(email);

            if (!adminDetails)
                throw 'Email address or password is incorrect!';

            if (!(await isSame(adminDetails.password, password)))
                throw 'Email address or password is incorrect!';

            const jwtAccess = Jwt.getAccessToken(adminDetails.toJSON());

            const jwtRefresh = Jwt.getRefreshToken(adminDetails.toJSON());

            let redirect = '/a/police-stations';

            return {
                tokens: { jwtAccess, jwtRefresh },
                redirect
            };
        } catch (e) { throw e; }
    };
};

module.exports = AdminServices;