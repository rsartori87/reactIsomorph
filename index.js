'use strict';

require('babel-register')({});

var server = require('./server');

const PORT = process.env.PORT || 3000;

server.default.listen(PORT, function () {
    console.log('Server in ascolto su ', PORT);
});