const jwt = require('../helpers/Jwt');

class Middleware {
    constructor () {
        if (Middleware.instance == null)
            Middleware.instance = this;

        return Middleware.instance;
    };

    authAdmin = (req, res, next) => {
        if (!req.adminInfo) 
            return res.redirect('/sign-in');

        next();
    }

    authResident = (req, res, next) => {
        if (!req.residentInfo)
            return res.redirect('/sign-in');

        next();
    }

    authPolice = (req, res, next) => {
        if (!req.policeInfo)
            return res.redirect('/sign-in');

        next();
    }

    loadResidentInfo = (req, res, next) => {
        if (!req.cookies || req.cookies && !req.cookies['_resident'])
            return next();

        jwt.verify(req.cookies['_resident'].jwtAccess, (residentInfo) => {
            req.residentInfo = residentInfo;
            res.locals.residentInfo = residentInfo;
        });

        next();
    }

    loadPoliceInfo = (req, res, next) => {
        if (!req.cookies || req.cookies && !req.cookies['_police'])
            return next();

        jwt.verify(req.cookies['_police'].jwtAccess, (policeInfo) => {
            req.policeInfo = policeInfo;
            res.locals.policeInfo = policeInfo;
        });

        next();
    }

    loadAdminInfo = (req, res, next) => {
        if (!req.cookies || req.cookies && !req.cookies['_admin'])
            return next();

        jwt.verify(req.cookies['_admin'].jwtAccess, (adminInfo) => {
            req.adminInfo = adminInfo;
            res.locals.adminInfo = adminInfo;
        });

        next();
    }
};

module.exports = new Middleware()