const utils = require('./utils/facade.js');

exports.timestamp = function(req, res) {
    if (utils.log.enabled) {
        //utils.log.info("req", req);
        utils.log.info("req.query=", req.query);
        utils.log.info("req.body=", req.body);
        //utils.log.info("res", res);
    }
    res.send(`${Date.now()}`);
}
