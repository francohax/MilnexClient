module.exports = function(passport, app){
    var authController = require('../controllers/auth')(passport);

    app.post('/authenticate', authController.authenticate);
    app.post('/register', authController.register);
};