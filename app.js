var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');

var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'o23ln23klHoidfh0',
    resave: true,
    saveUninitialized: true
}));

app.use(serveStatic("build"));

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.get('/cart', function (req, res) {
    createCart(req);
    res.send(req.session.cart.items);
});

app.post('/cart', function(req, res) {
    createCart(req);
    console.log("add to cart");
    req.session.cart.items.push(req.body);
    res.send({result: "success", items: req.session.cart.items});
});

function createCart(req) {
    if (!req.session.cart)
        req.session.cart = {
            items: []
        };
}

app.options('*', function(req, res) {
    res.status(200).send();
});

app.use(function(req, res, next){
    res.status(404).send('404: Not found');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
