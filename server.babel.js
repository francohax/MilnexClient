import express from 'express';
import mongoose from 'mongoose';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import routes from './src/routes';
import {
    setupReducers,
    renderHTMLString,
} from '@sketchpixy/rubix/lib/node/redux-router';
import RubixAssetMiddleware from '@sketchpixy/rubix/lib/node/RubixAssetMiddleware';
import reducers from './src/redux/reducers';
import settings from './config/settings';

const port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
mongoose.connect(settings.db);

setupReducers(reducers);

let app = express();
require('./config/express')(app, express);

function renderHTML(req, res) {
    renderHTMLString(routes, req, (error, redirectLocation, data) => {
        console.log("Derp");
        if (error) {
            if (error.message === 'Not found') {
                res.status(404).send(error.message);
            } else {
                res.status(500).send(error.message);
            }
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else {
            console.log(data.data);
            res.render('index', {
                content: data.content,
                data: JSON.stringify(data.data).replace(/\//g, '\\/')
            });
        }
    });
}

app.get('*', RubixAssetMiddleware('ltr'), (req, res, next) => {
    renderHTML(req, res);
});

app.listen(port, () => {
    console.log(`Node.js app is running at http://localhost:${port}/`);
});
