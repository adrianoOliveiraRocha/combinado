var express = require('express');
var fileUpload = require('express-fileupload');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var MySQLStore = require('express-mysql-session')(expressSession);

var host, user, password, database;
/*
if (process.env.USER == 'adriano') {
	host = 'localhost';
	user = 'adriano';
	password = '453231';
	database = 'combinado';
} else {
	host = 'localhost';
	user = 'adriano';
	password = '453231';
	database = 'combinado';
}
*/
host = 'localhost';
user = 'adriano';
password = '453231';
database = 'combinado';

var options = {
	host: host,
	port: 3306,
	user: user,
	password: password,
	database: database,
	createDatabaseTable: true,
	endConnectionOnClose: true,
	clearExpired: true,
	schema: {
		tableName: 'sessions',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
	}
};
var sessionStore = new MySQLStore(options);
var app = express();
app.use(fileUpload());
app.set('view engine', 'ejs'); // Define the template engine
app.set('views', './app/views'); // Define where is the views
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('./app/public'));
app.use('/upload', express.static('./app/public/upload'));
app.use(expressSession({
	cookieName: 'expressSession',
	secret: 'weareprogrammers-frombrazil-thatisweareit',
	store: sessionStore,
	resave: false,
	rolling: true,
	saveUninitialized: true,
	cookie: {},
	unset: 'keep',
}));

if (app.get('env') === 'production') {
	app.set('trust proxy', 1) // trust first proxy
	expressSession.cookie.secure = true;
};

const path = require('path');
consign()
	.include(path.resolve('/app/routs'))
	.then(path.resolve('/config/connect.js')) //you must put the extension
	.then(path.resolve('/config/ClientNotification.js'))
	.then(path.resolve('/app/models'))
	.then(path.resolve('/app/control'))
	.then(path.resolve('/app/helpers'))
	.then(path.resolve('/config/domain.js'))
	.into(app);

module.exports = app;