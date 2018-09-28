const log = require('./log.js');

exports.ok = function(res, message, obj) {
    log.info(message, obj);
    res.send({result: 'OK', message: message, obj: obj});
};

exports.ng = function(res, message, error) {
    log.warn(message, error);
    res.send({result: 'NG', message: message});
};
