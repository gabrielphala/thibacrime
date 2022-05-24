class ResidentController {
    constructor (resWrap) {
        this._resWrap = resWrap;
    };

    renderSignIn (_req, res) {
        res.render('resident/sign-in', {
            page: {
                title: 'Sign in'
            }
        });
    };

    renderSignUp (_req, res) {
        res.render('resident/sign-up', {
            page: {
                title: 'Sign up'
            }
        });
    };

    renderReports (_req, res) {
        res.render('resident/reports', {
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

            res.cookie('_resident', tokens);

            response.redirect = redirect;
            response.successful = true;

            return response;
        }, res);
    });

    signUp = (signUp) => (async (req, res) => {
        await this._resWrap(async (response) => {
            const { tokens, redirect } = await signUp({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                passwordConfirmation: req.body.passwordConfirmation
            });

            res.cookie('_resident', tokens);
            
            response.redirect = redirect;
            response.successful = true;

            return response;
        }, res);
    });

    getAllResidents = (getAllResidents) => (async (req, res) => {
        await this._resWrap(async (response) => {
            response.residents = await getAllResidents();

            return response;
        }, res);
    });
};

module.exports = ResidentController;