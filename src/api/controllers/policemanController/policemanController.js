class PolicemanController {
    constructor (resWrap) {
        this._resWrap = resWrap;
    };

    renderSignIn (_req, res) {
        res.render('police/sign-in', {
            page: {
                title: 'Sign in'
            }
        });
    };

    renderReports (_req, res) {
        res.render('police/reports', {
            page: {
                title: 'Reports'
            }
        });
    };

    signIn = (signIn) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const { tokens, redirect } = await signIn({
                email: req.body.email,
                password: req.body.password
            });

            res.cookie('_police', tokens);

            response.redirect = redirect;
            response.successful = true;

            return response;
        }, res);
    });

    getPolicemanDetails = (getPolicemanDetails) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const policemanDetails = await getPolicemanDetails(
                req.params.policemanId
            );

            response.policeman = policemanDetails;

            return response;
        }, res);
    });

    getPoliceAdminByStation = (getPoliceAdminByStation) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const policemanDetails = await getPoliceAdminByStation(
                req.params.policeStationId
            );

            response.policeman = policemanDetails;

            return response;
        }, res);
    });
};

module.exports = PolicemanController;