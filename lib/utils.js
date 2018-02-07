var ps = require('ps-node');
var isRpi = require('detect-rpi');

module.exports.isRpi = function() {
    return isRpi();
}

module.exports.verifySudo = function() {
    if (process.env.USER != 'root') {
        console.log('EasyIO-Monitor Error: You must run with sudo');
        process.exit(1);
    }
    return;
}

module.exports.processIsRunning = function(command, args, callback) {
    ps.lookup({
        command: command,
        arguments: args
    }, function(err, resultList) {
        callback(err, resultList && resultList.length >= 1);
    });
}