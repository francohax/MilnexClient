import passport from 'passport';

module.exports = function (app, express) {
    var apiRouter = express.Router();
    app.use('/api', apiRouter);

    var usersCtrl = require('../controllers/users');

    apiRouter.all('*', function (req, res, next) {
        passport.authenticate('bearer', function (err, user, info) {
            if (err) {
                return res.status(401).json({error: err});
            }

            if (user) {
                req.user = user;
                return next();
            } else {
                return res.status(401).json({error: 'unauthorized'});
            }
        })(req, res, next);
    });

    apiRouter.route('/users/me').get(usersCtrl.me);
};
