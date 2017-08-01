import jwt from 'jsonwebtoken';
import settings from '../../config/settings';
import User from '../models/user';
// var https = require('https');

module.exports = function (passport) {
    var authenticate = function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err)
                return next(err);

            if (!user) {
                return res.status(401).json({error: 'Incorrect username or password'});
            } else {
                if (!user.emailVerified) {
                    return res.status(401).json({error: 'Email has not been verified'});
                } else {
                    user.lastLogin = new Date();
                    user.save(function (err, user) {
                        if (err) {
                            console.log(err);
                            return res.status(401).json({error: err});
                        } else {
                            return res.json({token: jwt.sign({id: user._id}, settings.appSecret, {expiresIn: '7d'})});
                        }
                    });
                }
            }
        })(req, res, next);
    };

    var register = function (req, res) {
        if (!req.body.email || !req.body.password  || !req.body.username) {
            return res.status(400).json({error: 'Please make sure all required fields are entered!'});
        }

        User.findOne({ 'email': req.body.email.toLowerCase() }, function (err, user) {
            if (err)
                return res.status(400).json({ error: err});

            if (user) {
                return res.status(400).json({ error: 'That email is already taken' });
            } else {
                var newUser = new User();

                newUser.email = req.body.email;
                newUser.username = req.body.username;
                newUser.password = newUser.generateHash(req.body.password);
                newUser.registrationDate = new Date();

                newUser.avatar = 'https://placeholdit.imgix.net/~text?txtsize=32&txt=User&w=100&h=100';

                newUser.emailVerificationCode = (Math.random() * 1e32).toString(36);

                newUser.save(function (err) {
                    if (err) {
                        if (err.name == "ValidationError") {
                            return res.status(400).json({error: 'A user with that username already exists'});
                        } else {
                            return res.status(400).json({ error: 'An error occurred.' });
                        }
                    } else {
                        return res.status(200).json({ message: 'You successfully registered! Please follow the instructions in the validation email sent to the address you provided to activate your account.' });
                    }

                    // var host = req.get('host');
                    //
                    // var link = "https://" + 'account.gametester.co' + "/account/verify?c=" + newUser.emailVerificationCode + "&u=" + newUser._id;
                    //
                    // var message = new Message('kUWbTsNdRPoZWS9Xa-uPBw', 'GameTesterVerification');
                    // message.to(newUser.email);
                    // message.mergeVars(newUser.email, { gamerNick: newUser.gamerNick });
                    // message.mergeVars(newUser.email, { link: link });
                    //
                    // message.subject('Confirm your GameTester email address');
                    // message.from('GameTester <noreply@gametester.co>');
                    // message.send(function (err, response) {
                    //     if (err) {
                    //         return res.status(500).json({ message: { header: "Error", body: 'Verification Email could not be sent.' } });
                    //     } else {
                    //         return res.status(200).json({ message: { header: "Success", body: 'You successfully registered and an email has been sent to your email address with further instructions.' } });
                    //     }
                    // });
                });
            }
        });
    };

    return {
        authenticate: authenticate,
        register: register
    }
};