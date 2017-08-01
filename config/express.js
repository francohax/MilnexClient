import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import path from 'path';
import passport from 'passport';
import cors from 'cors';

module.exports = function(app, express){

    app.use(cors());
    app.use(compression());
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
    app.use(bodyParser.json({limit: '50mb'}));

    //require('../api/routes/documents')(app, express);

    app.use(express.static(path.join(process.cwd(), 'public')));
    app.set('views', path.join(process.cwd(), 'views'));
    app.set('view engine', 'pug');

    require('./passport')(passport);
    app.use(passport.initialize());

    require('../api/routes/auth')(passport, app);
    require('../api/routes/apiRoute')(app, express);
    require('../api/routes/uploadRoute')(app, express);

    return app;
};
// var parser = require('body-parser');
// var express = require('express');
// var path = require('path');
// var passport = require('passport');
// var cors = require('cors');
//
// module.exports = function(app){
//
//     app.use(cors());
//
//     app.use(morgan('dev'));
//     app.use(parser.json());
//     app.use(parser.urlencoded({ extended : true}));
//
//     require('../models/user');
//
//     require('./passport')(passport);
//     app.use(passport.initialize());
//
//     app.use(express.static(path.join(__dirname, '../../client')));
//
//     require('../routes/auth')(passport, app);
//     require('../routes/email')(express, app);
//     require('../routes/api')(express, app);
//     require('../routes/upload')(app, express);
//     require('../routes/devApi')(express, app);
//
//     app.get('*', function (req, res) {
//         res.sendFile(path.join(__dirname, '../../client/index.html'));
//     });
//
//     return app;
// };