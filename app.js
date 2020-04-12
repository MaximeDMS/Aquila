const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

const port = process.env.PORT || 5000;

const app = express();

app.use(serveStatic(path.join(__dirname, 'assets')));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.listen(port);