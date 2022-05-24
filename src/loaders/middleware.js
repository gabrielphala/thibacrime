const middleware = require('../middleware');

const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.use(cookieParser());
    app.use(middleware.loadAdminInfo);
    app.use(middleware.loadPoliceInfo);
    app.use(middleware.loadResidentInfo);
};