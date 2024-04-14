"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = require("net");
if (process.argv.length !== 3) {
    console.log('Please, provide a filename.');
}
else {
    var fileName_1 = process.argv[2];
    net_1.default.createServer(function (connection) {
        console.log('A client has connected.');
        connection.write(JSON.stringify({ 'type': 'watch', 'file': fileName_1 }) +
            '\n');
        connection.on('close', function () {
            console.log('A client has disconnected.');
        });
    }).listen(60300, function () {
        console.log('Waiting for clients to connect.');
    });
}
