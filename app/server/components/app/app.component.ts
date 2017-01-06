const debug = require('debug')('my-application');
const pathModule = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:27017/nodetest1');

class AppComponent {
    beforeRegister() {
        this.is = 'server-app';
    }

    ready() {
        this.port = process.env.PORT || 3000;

        this.listenCallback = () => {
            console.log('Express server listening on port ' + this.port);
            debug('Express server listening on port ' + this.port);
        };

        this.viewConfig = (app) => {
            app.set('views', pathModule.resolve(__dirname, 'views'));
            app.set('view engine', 'pug');
        };

        this.loggerMW = logger('dev');
        this.bodyParserJsonMW = bodyParser.json();
        this.bodyParserUrlMW = bodyParser.urlencoded({ extended: false });
        this.cookieParserMW = cookieParser();

        this.staticConfig = (app, express) => {
            app.use(express.static(pathModule.resolve(__dirname, '../client')));
        };

        this.dbMW = (req, res, next) => {
            req.db = db;
            next();
        };
    }
}

Polymer(AppComponent);
