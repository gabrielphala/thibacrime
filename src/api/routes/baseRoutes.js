module.exports = (router) => {
    router.get('/sign-in', (req, res) => {
        res.render('sign-in', {
            page: {
                title: 'Sign in'
            }
        });
    });

    router.get('/', (req, res) => {
        res.render('home', {
            page: {
                title: 'Home'
            }
        });
    });
};