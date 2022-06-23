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

    addPoliceman = (addPoliceman) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await addPoliceman({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                policeStationId: req.policeInfo.policeStationID,
                type: req.policeInfo.type
            });

            response.successful = true;

            return response;
        }, res);
    });

    editPoliceman = (editPoliceman) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await editPoliceman({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                policemanId: req.body.policemanId,
                type: req.policeInfo.type
            });

            response.successful = true;

            return response;
        }, res);
    });

    searchPolicemen = (searchPolicemen) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const policemen = await searchPolicemen(req.query.q, req.policeInfo.policeStationID);

            response.policemen = policemen;

            return response;
        }, res);
    });

    searchAdminPolicemen = (searchAdminPolicemen) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const policemen = await searchAdminPolicemen(req.query.q);

            response.policemen = policemen;

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

    getPolicemenByStation = (getPolicemenByStation) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const policemen = await getPolicemenByStation(req.policeInfo.policeStationID);

            response.policemen = policemen;

            return response;
        }, res);
    });

    getAllPolicemen = (getAllPolicemen) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const policemen = await getAllPolicemen();

            response.policemen = policemen;

            return response;
        }, res);
    });

    removePolice = (removePolice) => (async (req, res) => {
        await this._resWrap(async (response) => {
            await removePolice(req.params.policemanId);

            response.successful = true;

            return response;
        }, res);
    });
};

module.exports = PolicemanController;