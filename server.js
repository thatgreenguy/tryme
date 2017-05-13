/* global console */
var path = require('path');
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Moonboots = require('moonboots-express');
var compress = require('compression');
var config = require('getconfig');
var semiStatic = require('semi-static');
var serveStatic = require('serve-static');
var stylizer = require('stylizer');
var templatizer = require('templatizer');
var app = express();


// a little helper for fixing paths for various environments
var fixPath = function (pathString) {
    return path.resolve(path.normalize(pathString));
};


// -----------------
// Configure express
// -----------------
app.use(compress());
app.use(serveStatic(fixPath('public')));

// we only want to expose tests in dev
if (config.isDev) {
    app.use(serveStatic(fixPath('test/assets')));
    app.use(serveStatic(fixPath('test/spacemonkey')));
}

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// in order to test this with spacemonkey we need frames
if (!config.isDev) {
    app.use(helmet.xframe());
}
app.use(helmet.xssFilter());
app.use(helmet.nosniff());

app.set('view engine', 'jade');

// --------------------
// PJG Added in CORS Headers
// --------------------
app.all('/*', function(req, res, next) {
  // CORS headers
  // "Access-Control-Allow-Origin", "http://foo.com" would restrict access to this domain rather than "*" any domain
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you
// are sure that authentication is not needed
app.all('/api/*', [require('./middleware/validateRequest')]);

// -----------------
// Set up our little demo API
// -----------------
var api = require('./fakeApi');
app.get('/api/people', api.list);
app.get('/api/people/:id', api.get);
app.delete('/api/people/:id', api.delete);
app.put('/api/people/:id', api.update);
app.post('/api/people', api.add);

app.get('/api/contacts', api.contactlist);
app.get('/api/contacts/:id', api.contactget);
app.delete('/api/contacts/:id', api.contactdelete);
app.put('/api/contacts/:id', api.contactupdate);
app.post('/api/contacts', api.contactadd);

// -----------------
// Enable the functional test site in development
// -----------------
if (config.isDev) {
    app.get('/test*', semiStatic({
        folderPath: fixPath('test'),
        root: '/test'
    }));
}


// -----------------
// Set our client config cookie
// -----------------
app.use(function (req, res, next) {
    res.cookie('config', JSON.stringify(config.client));
    next();
});


// ---------------------------------------------------
// Configure Moonboots to serve our client application
// ---------------------------------------------------
new Moonboots({
    moonboots: {
        jsFileName: 'just-trying-ampersand',
        cssFileName: 'just-trying-ampersand',
        main: fixPath('client/app.js'),
        developmentMode: config.isDev,
        libraries: [
        ],
        stylesheets: [
            fixPath('stylesheets/bootstrap.css'),
            fixPath('stylesheets/app.css')
        ],
        browserify: {
            debug: config.isDev
        },
        beforeBuildJS: function () {
            // This re-builds our template files from jade each time the app's main
            // js file is requested. Which means you can seamlessly change jade and
            // refresh in your browser to get new templates.
            if (config.isDev) {
                templatizer(fixPath('templates'), fixPath('client/templates.js'));
            }
        },
        beforeBuildCSS: function (done) {
            // This re-builds css from stylus each time the app's main
            // css file is requested. Which means you can seamlessly change stylus files
            // and see new styles on refresh.
            if (config.isDev) {
                stylizer({
                    infile: fixPath('stylesheets/app.styl'),
                    outfile: fixPath('stylesheets/app.css'),
                    development: true
                }, done);
            } else {
                done();
            }
        }
    },
    server: app
});


// listen for incoming http requests on the port as specified in our config
app.listen(config.http.port);
console.log('Just Trying Ampersand is running at: http://localhost:' + config.http.port + ' Yep. That\'s pretty awesome.');
