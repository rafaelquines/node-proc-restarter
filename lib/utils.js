var ps = require('ps-node');
var isRpi = require('detect-rpi');
const { spawn } = require('child_process');
var fs = require('fs');

module.exports.isRpi = function() {
    return isRpi();
}

module.exports.verifySudo = function() {
    if (process.env.USER != 'root') {
        console.log('Proc-Restarter Error: You must run with sudo');
        process.exit(1);
    }
    return;
}

module.exports.processIsRunning = function(command, args, callback) {
    ps.lookup({
        command: command,
        arguments: args
    }, function(err, resultList) {
        let found = false;
        if (resultList && resultList.length > 0) {
            resultList.forEach(p => {
                if (p.arguments[0] === args)
                    found = true;
            });
        }
        callback(err, found);
    });
}

module.exports.daemonize = function() {
    if (isRpi()) {
        require('daemonize-process')();
    }
}

module.exports.exec = function(cmd) {
    const subprocess = spawn(cmd, {
        detached: true,
        stdio: 'ignore'
    });
    subprocess.unref();
}

module.exports.verifyArgs = function() {
    if (process.argv.length != 3 || !fs.existsSync(process.argv[2])) {
        console.log('Proc-Restarter Error: Invalid config.json parameter');
        process.exit(1);
    }
}