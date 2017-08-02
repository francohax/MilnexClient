var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jsonwebtoken');
var User = require('../api/models/user');
var settings = require('./settings');

module.exports = function(passport){
    passport.use(new LocalStrategy(
        function(username, password, done){
            User.findOne({ 'email' : username.toLowerCase() }, function(err, user){
                if(err)
                    return done(null, false, {error: err});

                if(!user)
                    return done(null, false, {error: 'Incorrect username or password'});

                if(!user.isValidPassword(password))
                    return done(null, false, {error : 'Incorrect username or password'});

                return done(null, user, {message: 'Logged in'});
            });
        }));

    passport.use(new BearerStrategy(
        function(token, done){
            jwt.verify(token, settings.appSecret, function(err, decoded){
                if(err)
                    return done(err, false);

                User.findById(decoded.id, function(err, user){
                    if(err)
                        return done(err, false);

                    return done(null, user);
                });
            });
        }));
};