var Utils = require('./lib/utils');
Utils.verifySudo();
Utils.verifyArgs();

var config = require(process.argv[2]);
var logger = require('./lib/logger');
var interval;
var delay = 0;
const multiplier = 1000;
let verifyProccess = function() {
    Utils.processIsRunning(config.command, config.arguments, function(err, isRunning) {
        if (err) {
            logger.error("Proc-Restarter Error: ", err);
        } else {
            logger.info("Node process " + config.arguments + " is" + (isRunning ? "" : " NOT") + " running.");
            if (!isRunning) {
                logger.info("Calling " + config.restartCmd + '...');
                Utils.exec(config.restartCmd);
                delay = 3000;
            }
        }
        setTimeout(verifyProccess, (config.interval * multiplier) + delay);
        delay = 0;
    });
}

function init() {
    Utils.daemonize();
    logger.info("Proc-Restarter started");
    logger.info('Running on ' + (Utils.isRpi() ? 'Raspberry PI' : 'PC'));
    setTimeout(verifyProccess, 0);
}
init();