const debug = require('./utils/debug.js');

exports.timestamp = function(req, res) {
    if (debug.enabled) {
        //debug.info("req", req);
        debug.info("req.query=", req.query);
        debug.info("req.body=", req.body);
        //debug.info("res", res);
    }
    res.send(`${Date.now()}`);
}
