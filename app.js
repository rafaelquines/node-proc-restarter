var Utils = require('./lib/utils');
Utils.verifySudo();
var config = require('./config.json');
var logger = require('./lib/logger');
var interval;
const multiplier = 1000;
let verifyProccess = function() {
    Utils.processIsRunning(config.command, config.arguments, function(err, isRunning) {
        if (err) {
            logger.error("EasyIO-Monitor Error: ", err);
        } else {
            logger.info("EasyIO Service is" + (isRunning ? "" : " NOT") + " running.");
        }
        setTimeout(verifyProccess, config.interval * multiplier);
    });
}

function init() {
    logger.info("EasyIO-Monitor started");
    logger.info('Running on ' + (Utils.isRpi() ? 'Raspberry PI' : 'PC'));
    setTimeout(verifyProccess, 0);
}
init();