class AdminController {
    constructor (resWrap) {
        this._resWrap = resWrap;
    };

    renderSignIn (_req, res) {
        res.render('admin/sign-in', {
            page: {
                title: 'Sign in'
            }
        });
    };

    renderPoliceStations (_req, res) {
        res.render('admin/police-stations', {
            page: {
                title: 'Police stations'
            }
        });
    };

    renderResidents (_req, res) {
        res.render('admin/residents', {
            page: {
                title: 'Residents'
            }
        });
    };

    renderReports (_req, res) {
        res.render('admin/reports', {
            page: {
                title: 'Reports'
            }
        });
    };

    renderPolicemen (_req, res) {
        res.render('admin/policemen', {
            page: {
                title: 'Policemen'
            }
        });
    };

    signIn = (signIn) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const { tokens, redirect } = await signIn({
                email: req.body.email,
                password: req.body.password
            });

            res.cookie('_admin', tokens);

            response.redirect = redirect;
            response.successful = true;

            return response;
        }, res);
    });
};

module.exports = AdminController;