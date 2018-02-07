var Utils = require('./lib/utils');
Utils.verifySudo();
var config = require('./config.json');
var logger = require('./lib/logger');
var interval;
var delay = 0;
const multiplier = 1000;
let verifyProccess = function() {
    Utils.processIsRunning(config.command, config.arguments, function(err, isRunning) {
        if (err) {
            logger.error("EasyIO-Monitor Error: ", err);
        } else {
            logger.info("EasyIO Service is" + (isRunning ? "" : " NOT") + " running.");
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
    logger.info("EasyIO-Monitor started");
    logger.info('Running on ' + (Utils.isRpi() ? 'Raspberry PI' : 'PC'));
    setTimeout(verifyProccess, 0);
}
init();